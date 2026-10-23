/**
 * LENIS SMOOTH SCROLL SETUP
 * High-performance smooth scrolling with ScrollTrigger integration
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initLenis() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return {
      raf: (fn) => requestAnimationFrame(fn),
      scrollTo: (target, options) => {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: 'auto' });
        } else if (typeof target === 'string') {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'auto' });
        }
      },
      on: () => {},
      off: () => {},
      destroy: () => {},
      start: () => {},
      stop: () => {},
      isStopped: () => false,
    };
  }
  
  // Initialize Lenis with proper wrapper
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    wrapper: document.documentElement,
    content: document.body,
  });
  
  // Add Lenis classes to html/body for CSS
  document.documentElement.classList.add('lenis');
  document.body.classList.add('lenis');
  
  // Connect Lenis to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  
  // Use GSAP ticker for smooth frame updates
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  // Disable GSAP's lag smoothing for smoother scrolling
  gsap.ticker.lagSmoothing(0);
  
  // Expose scrollTo method globally for anchor links
  window.lenisScrollTo = (target, options = {}) => {
    lenis.scrollTo(target, {
      duration: options.duration || 1.2,
      easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      offset: options.offset || 0,
      ...options,
    });
  };
  
  // Handle anchor links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    }
  });
  
  // Debug: log when scroll happens
  lenis.on('scroll', ({ scroll, velocity, direction }) => {
    // console.log('[Lenis] scroll:', scroll, 'velocity:', velocity, 'direction:', direction);
  });
  
  return lenis;
}