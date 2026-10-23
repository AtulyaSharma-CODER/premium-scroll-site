/**
 * PRELOADER WITH TIMED COUNTER + 4s FAILSAFE
 * - Simple timed animation (0→100 in ~2s)
 * - 4-second hard timeout forces reveal
 * - No external dependencies
 * - Wrapped in try/catch
 * - Restores body overflow, dispatches complete event
 */

import { gsap } from 'gsap';

export async function initPreloader(lenis) {
  const preloader = document.getElementById('preloader');
  const counterEl = preloader?.querySelector('[data-counter]');
  const progressEl = preloader?.querySelector('.preloader__progress');
  const textEl = preloader?.querySelector('.preloader__text');
  
  // If elements missing, skip preloader entirely
  if (!preloader || !counterEl || !progressEl) {
    console.warn('[Preloader] Elements not found, skipping');
    document.body.style.overflow = '';
    if (lenis && typeof lenis.start === 'function') lenis.start();
    document.dispatchEvent(new CustomEvent('preloader:complete'));
    return;
  }
  
  try {
    // Disable scroll during loading
    if (lenis && typeof lenis.stop === 'function') lenis.stop();
    document.body.style.overflow = 'hidden';
    
    // Simple timed counter: 0 → 100 over ~2 seconds
    const DURATION = 2000; // ms
    const FAILSAFE_MS = 4000; // hard timeout
    const startTime = performance.now();
    
    // Animate counter with GSAP
    const counterObj = { value: 0 };
    const counterTween = gsap.to(counterObj, {
      value: 100,
      duration: DURATION / 1000,
      ease: 'power2.out',
      onUpdate: () => {
        counterEl.textContent = `${Math.round(counterObj.value)}%`;
      },
    });
    
    // Animate progress bar
    gsap.to(progressEl, {
      scaleX: 1,
      duration: DURATION / 1000,
      ease: 'power2.out',
      transformOrigin: 'left center',
    });
    
    // Update text periodically
    const texts = ['Initializing...', 'Loading fonts...', 'Preparing animations...', 'Welcome'];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      if (textEl && textIndex < texts.length) {
        gsap.to(textEl, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            textEl.textContent = texts[textIndex];
            gsap.to(textEl, { opacity: 1, duration: 0.2 });
          },
        });
        textIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, DURATION / texts.length);
    
    // Wait for counter animation OR failsafe timeout
    await Promise.race([
      counterTween, // GSAP tween is thenable
      new Promise((_, reject) => setTimeout(() => reject(new Error('Failsafe timeout')), FAILSAFE_MS)),
    ]).catch(() => {
      // Failsafe triggered - force to 100%
      counterEl.textContent = '100%';
      gsap.set(progressEl, { scaleX: 1 });
      clearInterval(textInterval);
      if (textEl) textEl.textContent = 'Welcome';
    });
    
    clearInterval(textInterval);
    
    // Small pause, then hide
    await new Promise(r => setTimeout(r, 300));
    
    // Animate out
    await gsap.to(preloader, {
      opacity: 0,
      duration: 0.6,
      ease: 'expo.inOut',
    }).then(() => {
      preloader.classList.add('hidden');
      preloader.style.pointerEvents = 'none';
    });
    
  } catch (err) {
    console.error('[Preloader] Error:', err);
    // Force reveal on any error
    counterEl.textContent = '100%';
    gsap.set(progressEl, { scaleX: 1 });
    preloader.classList.add('hidden');
    preloader.style.pointerEvents = 'none';
  } finally {
    // ALWAYS restore scroll and trigger hero
    document.body.style.overflow = '';
    if (lenis && typeof lenis.start === 'function') lenis.start();
    document.dispatchEvent(new CustomEvent('preloader:complete'));
  }
}