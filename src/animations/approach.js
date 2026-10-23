import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initApproach(lenis) {
  const section = document.querySelector('.approach');
  const header = document.querySelector('.approach__header');
  const timeline = document.querySelector('.approach__timeline');
  const steps = document.querySelectorAll('.approach__step');
  const pinWrapper = document.querySelector('.approach__pin-wrapper');

  if (!section || !steps.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    steps.forEach(step => {
      step.style.opacity = '1';
      step.style.transform = 'none';
      step.classList.add('active');
    });
    return;
  }

  // ========================================
  // TIMELINE LINE ELEMENT
  // ========================================
  const lineEl = document.createElement('div');
  lineEl.className = 'approach__timeline-line';
  lineEl.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-border);
    transform-origin: top;
    transform: scaleY(0);
    z-index: 0;
  `;

  const timelineContainer = document.querySelector('.approach__timeline');
  if (timelineContainer) {
    timelineContainer.insertBefore(lineEl, timelineContainer.firstChild);
  }

  // ========================================
  // SINGLE PIN FOR ENTIRE SECTION
  // ========================================
  const mainTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.approach__pin-wrapper',
      start: 'top top',
      end: `+=${200 + steps.length * 400 + 200}`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  mainTl.to(lineEl, {
    scaleY: 1,
    ease: 'none',
  }, 0);

  // ========================================
  // STEP ANIMATIONS - ALL IN SINGLE TIMELINE
  // ========================================
  steps.forEach((step, i) => {
    const marker = step.querySelector('.approach__step-marker');
    const content = step.querySelector('.approach__step-content');
    const number = step.querySelector('.approach__step-number');

    if (!marker || !content) return;

    gsap.set([marker, content], { opacity: 0, x: -40 });
    const numberEl = step.querySelector('.approach__step-number');
    if (numberEl) gsap.set(numberEl, { color: 'var(--color-fg-subtle)' });

    const label = `step${i}`;
    const progress = i / steps.length;

    mainTl.addLabel(label, progress);

    mainTl.to(marker, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'expo.out',
    }, label);

    mainTl.to(content, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'expo.out',
    }, `${label}+=0.1`);

    const numberEl2 = step.querySelector('.approach__step-number');
    if (numberEl2) {
      mainTl.to(numberEl2, {
        color: 'var(--color-accent)',
        duration: 0.3,
        ease: 'power2.out',
      }, `${label}+=0.1`);
    }

    const nextLabel = `step${i + 1}`;
    mainTl.to([marker, content], {
      opacity: 0.3,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
    }, nextLabel);

    const numberEl3 = step.querySelector('.approach__step-number');
    if (numberEl3) {
      mainTl.to(numberEl3, {
        color: 'var(--color-fg-subtle)',
        duration: 0.3,
      }, nextLabel);
    }

    mainTl.call(() => step.classList.add('active'), null, label);
    mainTl.call(() => step.classList.remove('active'), null, nextLabel);
  });

  // ========================================
  // HEADER REVEAL - SCRUBBED
  // ========================================
  const headerEl = document.querySelector('.approach__header');
  if (headerEl) {
    gsap.fromTo(headerEl.querySelectorAll('.tag, h2, p'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.approach__header',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );
  }

  // ========================================
  // INITIAL STATE - FIRST STEP VISIBLE
  // ========================================
  if (steps[0]) {
    const firstMarker = steps[0].querySelector('.approach__step-marker');
    const firstContent = steps[0].querySelector('.approach__step-content');
    if (firstMarker) gsap.set(firstMarker, { opacity: 1, x: 0 });
    if (firstContent) gsap.set(firstContent, { opacity: 1, x: 0 });
    steps[0].classList.add('active');
  }

  // Cleanup on unmount
  return () => {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger && st.trigger.closest?.('#approach')) {
        st.kill();
      }
    });
  };
}