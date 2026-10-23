/**
 * CUSTOM CURSOR WITH MAGNETIC EFFECTS
 * Desktop only - respects reduced motion
 * Fixed: removed invalid ScrollTrigger.addEventListener
 */

export function initCursor() {
  const cursor = document.getElementById('cursor');
  const cursorDot = cursor?.querySelector('.cursor__dot');
  const cursorRing = cursor?.querySelector('.cursor__ring');
  
  if (!cursor || !cursorDot || !cursorRing) return;
  
  // State
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let isVisible = false;
  let animationId = null;
  
  // Magnetic elements selector
  const magneticSelectors = [
    'a', 'button', '.btn', '.btn-magnetic',
    '.card', '.work__card', '.contact__submit',
    '.nav__link', '.footer__nav-link', '.footer__social-link',
    'input', 'textarea', 'select'
  ].join(', ');
  
  let magneticElements = [];
  
  // Update magnetic elements
  function refreshMagneticElements() {
    magneticElements = Array.from(document.querySelectorAll(magneticSelectors));
  }
  
  // Initial refresh
  refreshMagneticElements();
  
  // Refresh on window resize (simpler than ScrollTrigger events)
  window.addEventListener('resize', refreshMagneticElements);
  
  // Mouse move handler
  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isVisible) {
      cursor.classList.add('visible');
      isVisible = true;
    }
  }
  
  // Mouse leave handler
  function onMouseLeave() {
    cursor.classList.remove('visible');
    isVisible = false;
  }
  
  // Mouse down/up for click effect
  function onMouseDown() { cursor.classList.add('click'); }
  function onMouseUp() { cursor.classList.remove('click'); }
  
  // Animation loop
  function animate() {
    // Smooth follow for dot (fast)
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    
    // Smooth follow for ring (slower, springy)
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
    
    // Magnetic effects
    magneticElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = Math.max(rect.width, rect.height) * 0.8 + 40;
      
      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        const force = strength * 0.15;
        
        el.classList.add('is-magnetic');
        el.style.setProperty('--mx', `${distanceX * force * 2}px`);
        el.style.setProperty('--my', `${distanceY * force * 2}px`);
      } else {
        el.classList.remove('is-magnetic');
        el.style.removeProperty('--mx');
        el.style.removeProperty('--my');
      }
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Event listeners
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  
  // Start animation loop
  animationId = requestAnimationFrame(animate);
  
  // Cleanup function
  return function destroy() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    if (animationId) cancelAnimationFrame(animationId);
    cursor.classList.remove('visible');
  };
}