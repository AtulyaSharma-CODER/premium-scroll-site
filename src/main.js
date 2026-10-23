/**
 * PREMIUM SCROLL-MOTION EXPERIENCE
 * Aisha Chen — Brand & Strategy Consultant
 * 
 * Stack: Vite + GSAP + ScrollTrigger + Lenis
 * Features: Smooth scroll, pinned sections, horizontal scroll, 
 * parallax, split-text, magnetic cursor, preloader
 */

// ========================================
// IMPORTS
// ========================================
import './style.css';
import 'lenis/dist/lenis.css';

// Core libraries
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Modules
import { initLenis } from './utils/lenis.js';
import { initCursor } from './utils/cursor.js';
import { initPreloader } from './utils/preloader.js';
import { initHero } from './animations/hero.js';
import { initWork } from './animations/work.js';
import { initApproach } from './animations/approach.js';
import { initAbout } from './animations/about.js';
import { initContact } from './animations/contact.js';
import { initGlobal } from './animations/global.js';
import { renderHTML } from './components/render.js';

// ========================================
// GLOBAL STATE
// ========================================
const state = {
  lenis: null,
  isMobile: window.innerWidth < 768,
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  initComplete: false,
};

// ========================================
// HELPER: Safe async init with error handling
// ========================================
async function safeInit(name, fn, ...args) {
  try {
    console.log(`[Init] Starting ${name}...`);
    const result = await fn(...args);
    console.log(`[Init] ${name} complete`);
    return result;
  } catch (err) {
    console.error(`[Init] ${name} failed:`, err);
    return null;
  }
}

// ========================================
// GLOBAL FAILSAFE: Force-enable scroll after 4 seconds no matter what
// ========================================
function activateScrollFailsafe() {
  setTimeout(() => {
    if (!state.initComplete) {
      console.warn('[Failsafe] Forcing scroll enable after 4s');
      document.body.style.overflow = '';
      document.body.style.height = 'auto';
      document.body.style.position = 'static';
      if (state.lenis && typeof state.lenis.start === 'function') {
        state.lenis.start();
      }
      // Force-remove preloader if stuck
      const preloader = document.getElementById('preloader');
      if (preloader && !preloader.classList.contains('hidden')) {
        preloader.classList.add('hidden');
        preloader.style.pointerEvents = 'none';
        document.dispatchEvent(new CustomEvent('preloader:complete'));
      }
      ScrollTrigger.refresh();
    }
  }, 4000);
}

// ========================================
// INITIALIZATION
// ========================================
async function init() {
  // Activate failsafe immediately
  activateScrollFailsafe();
  
  // 1. Render HTML structure FIRST (synchronous)
  try {
    console.log('[Init] Rendering HTML...');
    renderHTML();
    console.log('[Init] HTML rendered');
  } catch (err) {
    console.error('[Init] renderHTML failed:', err);
    // Continue anyway - static HTML may already be present
  }
  
  // 2. Initialize Lenis smooth scroll (critical for scroll animations)
  state.lenis = await safeInit('Lenis', initLenis);
  
  // 3. Initialize custom cursor (desktop only, non-critical)
  if (!state.isMobile && !state.prefersReducedMotion) {
    await safeInit('Cursor', initCursor);
  }
  
  // 4. Initialize preloader (MUST complete before hero)
  await safeInit('Preloader', initPreloader, state.lenis);
  
  // 5. Initialize section animations (non-critical, can fail independently)
  await safeInit('Hero', initHero);
  await safeInit('Work', initWork, state.lenis);
  await safeInit('Approach', initApproach, state.lenis);
  await safeInit('About', initAbout, state.lenis);
  await safeInit('Contact', initContact, state.lenis);
  
  // 6. Initialize global animations (nav, scroll progress, footer)
  await safeInit('Global', initGlobal, state.lenis);
  
  // 7. Refresh ScrollTrigger after everything loads
  try {
    ScrollTrigger.refresh();
    console.log('[Init] ScrollTrigger refreshed');
  } catch (err) {
    console.error('[Init] ScrollTrigger.refresh failed:', err);
  }
  
  // 8. Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      state.isMobile = window.innerWidth < 768;
      try {
        ScrollTrigger.refresh();
      } catch (err) {
        console.error('[Resize] ScrollTrigger.refresh failed:', err);
      }
    }, 150);
  });
  
  state.initComplete = true;
  console.log('%c Premium Scroll-Motion Experience Loaded ', 'background: #d4a843; color: #0a0a0f; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;');
}

// ========================================
// START - Handle both DOMContentLoaded and already-loaded cases
// ========================================
function start() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    // DOM already ready - init immediately
    init();
  }
}

start();

// Export for debugging
window.__APP_STATE__ = state;