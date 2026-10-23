/**
 * WORK SECTION - PINNED HORIZONTAL SCROLL
 * Vertical scroll scrubs horizontal carousel of case studies
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWork(lenis) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const section = document.querySelector('.work');
  const track = document.querySelector('.work__track');
  const cards = document.querySelectorAll('.work__card');
  const header = document.querySelector('.work__header');
  
  if (!section || !track || !cards.length) return;
  
  // Reduced motion: show all cards in grid
  if (prefersReducedMotion) {
    track.style.display = 'grid';
    track.style.gridTemplateColumns = 'repeat(auto-fit, minmax(320px, 1fr))';
    track.style.gap = 'var(--space-6)';
    cards.forEach(card => card.style.opacity = '1');
    return;
  }
  
  // ========================================
  // HEADER REVEAL - SCRUBBED FOR REVERSE
  // ========================================
  gsap.fromTo(header.querySelectorAll('.tag, h2, p'), 
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.work__header',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    }
  );
  
  // ========================================
  // PINNED HORIZONTAL SCROLL
  // ========================================
  const trackWidth = track.scrollWidth;
  const viewportWidth = window.innerWidth;
  const scrollDistance = trackWidth - viewportWidth + 80; // Add some padding
  
  // Set up the horizontal scroll
  const horizontalScroll = gsap.to(track, {
    x: () => -scrollDistance,
    ease: 'none',
    scrollTrigger: {
      trigger: '.work__pin-wrapper',
      pin: true,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
  
  // ========================================
  // CARD REVEAL ANIMATIONS (staggered on scroll) - SCRUBBED FOR REVERSE
  // ========================================
  cards.forEach((card, i) => {
    const image = card.querySelector('.work__card-image img');
    const overlay = card.querySelector('.work__card-overlay');
    const content = card.querySelector('.work__card-content');
    const metaItems = card.querySelectorAll('.work__card-meta-item');
    
    // Initial state
    gsap.set([card, content], { opacity: 0, y: 60 });
    if (image) gsap.set(image, { scale: 1.1 });
    
    // Animate card in when it enters viewport - SCRUBBED FOR REVERSE
    ScrollTrigger.create({
      trigger: card,
      containerAnimation: horizontalScroll,
      start: 'left 85%',
      end: 'left 15%',
      scrub: 1,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
        });
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 2,
            ease: 'expo.out',
          });
        }
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'expo.out',
        });
      },
      onLeaveBack: () => {
        gsap.to(card, { opacity: 0, y: -60, duration: 0.6, ease: 'power2.in' });
        gsap.to(content, { opacity: 0, y: -30, duration: 0.4, ease: 'power2.in' });
      },
    });
    
    // Parallax on card image during horizontal scroll
    if (image) {
      gsap.to(image, {
        xPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontalScroll,
          start: 'left right',
          end: 'right left',
          scrub: 0.5,
        },
      });
    }
  });
  
  // ========================================
  // CARD SCALE ON HOVER (CSS handles this)
  // ========================================
  // The hover effects are handled in CSS, but we can add
  // a subtle GSAP-powered magnetic effect for desktop
  
  if (window.innerWidth >= 1024) {
    cards.forEach(card => {
      const image = card.querySelector('.work__card-image img');
      if (!image) return;
      
      let mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(image, {
            x: x * 0.08,
            y: y * 0.08,
            scale: 1.03,
            duration: 0.6,
            ease: 'power2.out',
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    });
  }
  
  // ========================================
  // REFRESH ON RESIZE
  // ========================================
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
}