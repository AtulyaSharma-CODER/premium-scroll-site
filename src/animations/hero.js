/**
 * HERO ANIMATIONS
 * Split-text line reveal, parallax layers, scroll progress, stat counters
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHero() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Elements
  const badge = document.querySelector('.hero__badge');
  const titleLines = document.querySelectorAll('.hero__title-line');
  const titleSpans = document.querySelectorAll('.hero__title-line span');
  const description = document.querySelector('.hero__description');
  const ctaGroup = document.querySelector('.hero__cta-group');
  const stats = document.querySelector('.hero__stats');
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  const bgLayers = document.querySelectorAll('.hero__bg-layer');
  const noise = document.querySelector('.hero__noise');
  
  if (!titleLines.length) return;
  
  // Reduced motion fallback
  if (prefersReducedMotion) {
    [badge, ...titleLines, description, ctaGroup, stats, scrollIndicator].forEach(el => {
      if (el) el.style.opacity = '1';
    });
    titleSpans.forEach(span => span.style.transform = 'translateY(0)');
    return;
  }
  
  // ========================================
  // PARALLAX BACKGROUND LAYERS
  // ========================================
  bgLayers.forEach((layer, i) => {
    const speed = 0.15 + i * 0.1; // 0.15, 0.25, 0.35
    gsap.to(layer, {
      yPercent: 30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });
  
  // Noise layer subtle parallax
  if (noise) {
    gsap.to(noise, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
  
  // ========================================
  // HERO ENTRANCE TIMELINE
  // ========================================
  const entranceTl = gsap.timeline({
    defaults: { ease: 'expo.out', duration: 1.2 },
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      toggleActions: 'play reverse play reverse',
      scrub: false,
    },
    onComplete: () => {
      // Enable scroll progress after hero loads
      document.body.classList.add('hero-loaded');
    },
  });
  
  // Wait for preloader complete event
  document.addEventListener('preloader:complete', () => {
    // Add .js-animated classes to enable GSAP entrance animations
    // The CSS has visible fallbacks; .js-animated sets initial hidden state for GSAP
    titleLines.forEach(line => line.classList.add('js-animated'));
    if (description) description.classList.add('js-animated');
    if (ctaGroup) ctaGroup.classList.add('js-animated');
    if (stats) stats.classList.add('js-animated');
    
    entranceTl
      .to(badge, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, 0)
      .to(titleLines, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'expo.out',
      }, 0.2)
      .to(titleSpans, {
        y: 0,
        duration: 1.6,
        stagger: 0.04,
        ease: 'expo.out',
      }, 0.2)
      .to(description, { opacity: 1, y: 0, duration: 1.2 }, 0.6)
      .to(ctaGroup, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, 0.8)
      .to(stats, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' }, 1)
      .to(scrollIndicator, { opacity: 1, duration: 0.8 }, 1.2);
  });
  
  // ========================================
  // STAT COUNTERS ON SCROLL
  // ========================================
  const statValues = document.querySelectorAll('.hero__stat-value');
  
  statValues.forEach((stat, i) => {
    const target = stat.textContent.replace(/[^0-9.]/g, '');
    const isDecimal = target.includes('.');
    const suffix = stat.textContent.replace(/[0-9.]/g, '');
    
    if (!isNaN(target)) {
      const numTarget = parseFloat(target);
      stat.textContent = '0' + suffix;
      
      ScrollTrigger.create({
        trigger: stats,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentVal = progress * numTarget;
          if (isDecimal) {
            stat.textContent = currentVal.toFixed(1) + suffix;
          } else {
            stat.textContent = Math.round(currentVal) + suffix;
          }
        },
      });
    }
  });
  
  // ========================================
  // SCROLL INDICATOR BOUNCE
  // ========================================
  if (scrollIndicator) {
    gsap.to(scrollIndicator.querySelector('svg'), {
      y: 12,
      duration: 1.2,
      ease: 'power2.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
  
  // ========================================
  // SCROLL PROGRESS BAR (top of page)
  // ========================================
  const progressBar = document.querySelector('.scroll-progress__bar');
  
  if (progressBar) {
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(progressBar, {
          scaleX: self.progress,
          transformOrigin: 'left center',
        });
      },
    });
  }
}