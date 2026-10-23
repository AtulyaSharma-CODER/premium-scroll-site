/**
 * GLOBAL ANIMATIONS
 * Nav hide/show on scroll, scroll progress, footer reveal, smooth refresh
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGlobal(lenis) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // ========================================
  // NAV HIDE/SHOW ON SCROLL
  // ========================================
  const nav = document.querySelector('.nav');
  let lastScrollY = 0;
  let ticking = false;
  
  function onScroll() {
    const currentScrollY = window.scrollY || lenis?.scroll || 0;
    
    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // Scrolling down - hide nav
      nav.classList.add('hidden');
    } else {
      // Scrolling up - show nav
      nav.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }
  
  if (lenis) {
    lenis.on('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  } else {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
  
  // ========================================
  // SCROLL PROGRESS BAR
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
  
  // ========================================
  // FOOTER REVEAL FROM BEHIND
  // ========================================
  const footer = document.querySelector('.footer');
  const footerBg = footer?.querySelector('.footer__bg');
  const footerInner = footer?.querySelector('.footer__inner');
  const footerBottom = footer?.querySelector('.footer__bottom');
  
  if (footer && footerInner) {
    // Create reveal timeline
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 0.8,
      },
    });
    
    // Background reveal
    if (footerBg) {
      footerTl.to(footerBg, {
        opacity: 1,
        ease: 'none',
      }, 0);
    }
    
    // Content reveal
    footerTl.fromTo(footerInner.querySelectorAll('[class*="footer__"]'), 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
      }, 0.2);
    
    // Bottom bar
    if (footerBottom) {
      footerTl.fromTo(footerBottom,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
        }, 0.6);
    }
  }
  
  // ========================================
  // SECTION REVEALS (fallback for non-pinned sections)
  // ========================================
  const revealSections = document.querySelectorAll('.section:not(.work):not(.approach):not(.contact):not(.about):not(.hero)');
  
  revealSections.forEach(section => {
    if (section.classList.contains('reveal')) return; // Already handled
    
    const elements = section.querySelectorAll('h2, h3, p, .tag, .card, .btn');
    if (!elements.length) return;
    
    gsap.fromTo(Array.from(elements).filter(el => !el.closest('[data-gsap-ignore]')),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });
  
  // ========================================
  // ANCHOR LINK SMOOTH SCROLL
  // ========================================
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target && lenis) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  });
  
  // ========================================
  // REFRESH SCROLLTRIGGER ON FONT/IMAGE LOAD
  // ========================================
  // Wait for fonts
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
  
  // Wait for images
  const images = document.querySelectorAll('img');
  let loadedCount = 0;
  
  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
      if (loadedCount === images.length) ScrollTrigger.refresh();
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === images.length) ScrollTrigger.refresh();
      });
      img.addEventListener('error', () => {
        loadedCount++;
        if (loadedCount === images.length) ScrollTrigger.refresh();
      });
    }
  });
  
  // ========================================
  // RESIZE HANDLER
  // ========================================
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });
  
  // ========================================
  // FOCUS TRAP FOR MOBILE MENU (if added later)
  // ========================================
  // Placeholder for future mobile menu implementation
  
  console.log('%c Global animations initialized ', 'background: #6b6b7a; color: #f5f5f5; font-size: 10px; padding: 2px 6px; border-radius: 3px;');
}