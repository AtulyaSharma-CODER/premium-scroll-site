/**
 * CONTACT SECTION
 * Form field stagger, magnetic CTA, contact methods hover
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initContact(lenis) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const section = document.querySelector('.contact');
  const info = document.querySelector('.contact__info');
  const form = document.querySelector('.contact__form');
  const methods = document.querySelectorAll('.contact__method');
  const engagement = document.querySelector('.contact__engagement');
  const formFields = document.querySelectorAll('.form-group');
  const submitBtn = document.querySelector('.contact__submit');
  
  if (!section) return;
  
  // Reduced motion fallback
  if (prefersReducedMotion) {
    [info, form].forEach(el => { if (el) el.style.opacity = '1'; });
    methods.forEach(m => m.style.opacity = '1');
    formFields.forEach(f => f.style.opacity = '1');
    return;
  }
  
  // ========================================
  // INFO PANEL REVEAL (left side) - SCRUBBED FOR REVERSE
  // ========================================
  const infoElements = [
    info?.querySelector('.tag'),
    info?.querySelector('h2'),
    info?.querySelector('.contact__description'),
    ...Array.from(info?.querySelectorAll('.contact__method') || []),
    info?.querySelector('.contact__engagement'),
  ].filter(Boolean);
  
  gsap.fromTo(infoElements,
    { opacity: 0, x: -60 },
    {
      opacity: 1,
      x: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.contact__info',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    }
  );
  
  // ========================================
  // FORM PANEL REVEAL (right side) - SCRUBBED FOR REVERSE
  // ========================================
  const formElements = [
    form?.querySelector('h3'),
    form?.querySelector('.contact__form-subtitle'),
    ...Array.from(form?.querySelectorAll('.form-group') || []),
    form?.querySelector('.contact__submit'),
    form?.querySelector('.contact__disclaimer'),
  ].filter(Boolean);
  
  gsap.fromTo(formElements,
    { opacity: 0, x: 60 },
    {
      opacity: 1,
      x: 0,
      duration: 1.2,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.contact__form-wrapper',
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    }
  );
  
  // ========================================
  // CONTACT METHOD HOVER EFFECTS
  // ========================================
  methods.forEach(method => {
    const icon = method.querySelector('.contact__method-icon');
    const value = method.querySelector('.contact__method-value');
    
    method.addEventListener('mouseenter', () => {
      gsap.to(method, {
        x: 8,
        borderColor: 'var(--color-accent)',
        duration: 0.4,
        ease: 'expo.out',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1.1,
          rotation: 5,
          duration: 0.4,
          ease: 'expo.out',
        });
      }
      if (value) {
        gsap.to(value, {
          color: 'var(--color-accent)',
          duration: 0.3,
        });
      }
    });
    
    method.addEventListener('mouseleave', () => {
      gsap.to(method, {
        x: 0,
        borderColor: 'var(--color-border)',
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      }
      const val = method.querySelector('.contact__method-value');
      if (val) {
        gsap.to(val, {
          color: 'var(--color-fg)',
          duration: 0.3,
        });
      }
    });
  });
  
  // ========================================
  // ENGAGEMENT CARD HOVER
  // ========================================
  if (engagement) {
    engagement.addEventListener('mouseenter', () => {
      gsap.to(engagement, {
        scale: 1.02,
        borderColor: 'var(--color-accent)',
        duration: 0.3,
        ease: 'expo.out',
      });
    });
    
    engagement.addEventListener('mouseleave', () => {
      gsap.to(engagement, {
        scale: 1,
        borderColor: 'var(--color-border)',
        duration: 0.4,
        ease: 'expo.out',
      });
    });
  }
  
  // ========================================
  // FORM FIELD FOCUS ANIMATIONS
  // ========================================
  const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
  
  inputs.forEach(input => {
    const group = input.closest('.form-group');
    const label = group?.querySelector('.form-label');
    
    input.addEventListener('focus', () => {
      gsap.to(group, {
        scale: 1.005,
        duration: 0.3,
        ease: 'expo.out',
      });
      if (label) {
        gsap.to(label, {
          color: 'var(--color-accent)',
          duration: 0.2,
        });
      }
    });
    
    input.addEventListener('blur', () => {
      gsap.to(group, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      });
      if (label) {
        gsap.to(label, {
          color: 'var(--color-fg-muted)',
          duration: 0.3,
        });
      }
    });
  });
  
  // ========================================
  // MAGNETIC SUBMIT BUTTON
  // ========================================
  if (submitBtn && window.innerWidth >= 768) {
    const btnText = submitBtn.querySelector('span') || submitBtn;
    
    submitBtn.addEventListener('mousemove', (e) => {
      const rect = submitBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(btnText, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'expo.out',
      });
      
      gsap.to(submitBtn, {
        scale: 1.02,
        duration: 0.3,
        ease: 'expo.out',
      });
    });
    
    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(btnText, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to(submitBtn, {
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    });
    
    submitBtn.addEventListener('click', (e) => {
      // Prevent default for demo
      e.preventDefault();
      
      // Click animation
      gsap.timeline()
        .to(submitBtn, { scale: 0.95, duration: 0.1 })
        .to(submitBtn, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      
      // Show success state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Message Sent ✓</span>';
      submitBtn.style.background = 'var(--color-accent)';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);
    });
  }
  
  // ========================================
  // FORM SUBMIT HANDLING
  // ========================================
  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      
      // Show success
      const submitBtn = contactForm.querySelector('.contact__submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        setTimeout(() => {
          submitBtn.innerHTML = '<span>Message Sent ✓</span>';
          submitBtn.style.background = 'var(--color-accent)';
          
          setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            contactForm.reset();
          }, 4000);
        }, 1500);
      }
    });
  }
  
  // ========================================
  // BACKGROUND GLOW PARALLAX
  // ========================================
  const bgGlow = section.querySelector('::before') || section.querySelector('.contact-glow');
  if (bgGlow) {
    gsap.to(bgGlow, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }
}