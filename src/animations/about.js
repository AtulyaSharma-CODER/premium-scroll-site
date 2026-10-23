/**
 * ABOUT SECTION
 * Image reveal with clip-path, floating card parallax, value cards stagger
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAbout(lenis) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const section = document.querySelector('.about');
  const imageFrame = document.querySelector('.about__image-frame');
  const image = document.querySelector('.about__image-frame img');
  const accent = document.querySelector('.about__image-accent');
  const floatingCard = document.querySelector('.about__floating-card');
  const content = document.querySelector('.about__content');
  const values = document.querySelectorAll('.value-card');
  const details = document.querySelector('.about__details');
  
  if (!section) return;
  
  // Reduced motion fallback
  if (prefersReducedMotion) {
    [imageFrame, image, accent, floatingCard, content].forEach(el => {
      if (el) el.style.opacity = '1';
    });
    values.forEach(v => v.style.opacity = '1');
    return;
  }
  
  // ========================================
  // IMAGE REVEAL WITH CLIP-PATH
  // ========================================
  if (imageFrame && image) {
    // Set up clip-path animation
    gsap.set(imageFrame, { clipPath: 'inset(100% 0 0 0)' });
    gsap.set(image, { scale: 1.2 });
    
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about__image-wrapper',
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1,
      },
    });
    
    imageTl
      .to(imageFrame, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1,
        ease: 'expo.out',
      }, 0)
      .to(image, {
        scale: 1,
        duration: 1.5,
        ease: 'expo.out',
      }, 0)
      .to(accent, {
        opacity: 0.15,
        duration: 0.8,
        ease: 'expo.out',
      }, 0.3);
  }
  
  // ========================================
  // FLOATING CARD PARALLAX
  // ========================================
  if (floatingCard) {
    gsap.to(floatingCard, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about__image-wrapper',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
    
    // Float animation continues regardless of scroll
    gsap.to(floatingCard, {
      y: -15,
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }
  
  // ========================================
  // CONTENT REVEAL (staggered) - SCRUBBED FOR REVERSE
  // ========================================
  const contentElements = [
    content?.querySelector('.tag'),
    content?.querySelector('h2'),
    ...Array.from(content?.querySelectorAll('p') || []),
  ].filter(Boolean);
  
  gsap.fromTo(contentElements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.about__content',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    }
  );
  
  // ========================================
  // VALUE CARDS STAGGER - SCRUBBED FOR REVERSE
  // ========================================
  if (values.length) {
    gsap.fromTo(values,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about__values',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );
    
    // Hover effects with GSAP
    values.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -8,
          borderColor: 'var(--color-accent)',
          duration: 0.4,
          ease: 'expo.out',
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          borderColor: 'var(--color-border)',
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }
  
  // ========================================
  // DETAILS REVEAL
  // ========================================
  if (details) {
    gsap.fromTo(details,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: details,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );
    
    // Animate details open/close
    const summary = details.querySelector('summary');
    if (summary) {
      const icon = summary.querySelector('::before') || summary;
      
      details.addEventListener('toggle', () => {
        const isOpen = details.open;
        gsap.to(summary, {
          color: isOpen ? 'var(--color-accent)' : 'var(--color-fg-muted)',
          duration: 0.3,
        });
      });
    }
  }
}