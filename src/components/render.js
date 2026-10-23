/**
 * HTML RENDERER
 * Builds the complete page structure from components
 */

export function renderHTML() {
  const app = document.getElementById('app');
  if (!app) return;
  
  app.innerHTML = `
    <!-- NAVIGATION -->
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="#" class="nav__logo" aria-label="Aisha Chen — Home">Aisha Chen</a>
        <ul class="nav__links">
          <li><a href="#work" class="nav__link">Work</a></li>
          <li><a href="#approach" class="nav__link">Approach</a></li>
          <li><a href="#about" class="nav__link">About</a></li>
          <li><a href="#contact" class="nav__link">Contact</a></li>
        </ul>
        <a href="#contact" class="btn btn-primary nav__cta btn-magnetic">Work Together</a>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero section" id="hero" aria-labelledby="hero-title">
      <div class="hero__background" aria-hidden="true">
        <div class="hero__bg-layer hero__bg-layer--1"></div>
        <div class="hero__bg-layer hero__bg-layer--2"></div>
        <div class="hero__bg-layer hero__bg-layer--3"></div>
        <div class="hero__noise"></div>
      </div>
      
      <div class="container">
        <div class="hero__content">
          <div class="hero__badge tag">
            <span class="hero__badge-dot" aria-hidden="true"></span>
            Selectively taking 2 new clients for Q2 2026
          </div>
          
          <h1 id="hero-title" class="hero__title">
            <div class="hero__title-line"><span>I build brands</span></div>
            <div class="hero__title-line"><span class="text-accent">that sell</span></div>
            <div class="hero__title-line"><span>, not just look pretty.</span></div>
          </h1>
          
          <p class="hero__description">
            Strategy-first brand consulting for founders who want to own their category. 
            <span class="font-semibold">No templates. No fluff. Just work that moves the needle.</span>
          </p>
          
          <div class="hero__cta-group">
            <a href="#contact" class="btn btn-primary btn-magnetic">
              <span>Start a Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#work" class="btn btn-secondary btn-magnetic">See the Work</a>
          </div>
          
          <div class="hero__stats" role="list" aria-label="Key metrics">
            <div class="hero__stat" role="listitem">
              <div class="hero__stat-value" data-target="47">0+</div>
              <div class="hero__stat-label">Brands Launched</div>
            </div>
            <div class="hero__stat" role="listitem">
              <div class="hero__stat-value" data-target="12">0M+</div>
              <div class="hero__stat-label">Revenue Generated</div>
            </div>
            <div class="hero__stat" role="listitem">
              <div class="hero__stat-value" data-target="12">0+</div>
              <div class="hero__stat-label">Industries Served</div>
            </div>
            <div class="hero__stat" role="listitem">
              <div class="hero__stat-value" data-target="94">0%</div>
              <div class="hero__stat-label">Client Retention</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero__scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>
    </section>

    <!-- WORK - PINNED HORIZONTAL SCROLL -->
    <section class="work section" id="work" aria-labelledby="work-title">
      <div class="container">
        <header class="work__header">
          <span class="tag">Selected Work</span>
          <h2 id="work-title">Case Studies That <span class="text-accent">Matter</span></h2>
          <p>Every project starts with strategy. The visuals come after we know exactly who we're talking to and why they should care.</p>
        </header>
        
        <div class="work__pin-wrapper">
          <div class="work__track" role="list" aria-label="Case studies">
            <!-- Meridian Health -->
            <article class="work__card" role="listitem">
              <div class="work__card-image">
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80" alt="Meridian Health case study" loading="lazy" />
                <div class="work__card-overlay" aria-hidden="true"></div>
                <div class="work__card-content">
                  <span class="work__card-category">Brand Strategy + Visual Identity</span>
                  <h3 class="work__card-title">Meridian Health</h3>
                  <p class="work__card-tagline">DTC supplement brand repositioning</p>
                </div>
                <div class="work__card-meta">
                  <span class="work__card-meta-item">340% revenue increase</span>
                  <span class="work__card-meta-item">12 months</span>
                  <span class="work__card-meta-item">DTC / Wellness</span>
                </div>
              </div>
            </article>
            
            <!-- Luma Finance -->
            <article class="work__card" role="listitem">
              <div class="work__card-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Luma Finance case study" loading="lazy" />
                <div class="work__card-overlay" aria-hidden="true"></div>
                <div class="work__card-content">
                  <span class="work__card-category">Brand Strategy + Launch System</span>
                  <h3 class="work__card-title">Luma Finance</h3>
                  <p class="work__card-tagline">Fintech startup launch & positioning</p>
                </div>
                <div class="work__card-meta">
                  <span class="work__card-meta-item">$2.4M seed raised</span>
                  <span class="work__card-meta-item">Oversubscribed</span>
                  <span class="work__card-meta-item">Fintech / Series A</span>
                </div>
              </div>
            </article>
            
            <!-- Kindred Coffee -->
            <article class="work__card" role="listitem">
              <div class="work__card-image">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" alt="Kindred Coffee case study" loading="lazy" />
                <div class="work__card-overlay" aria-hidden="true"></div>
                <div class="work__card-content">
                  <span class="work__card-category">Visual Identity + Packaging</span>
                  <h3 class="work__card-title">Kindred Coffee</h3>
                  <p class="work__card-tagline">Specialty coffee subscription rebrand</p>
                </div>
                <div class="work__card-meta">
                  <span class="work__card-meta-item">2.8x subscription growth</span>
                  <span class="work__card-meta-item">6 months</span>
                  <span class="work__card-meta-item">CPG / Subscription</span>
                </div>
              </div>
            </article>
            
            <!-- Vex Robotics -->
            <article class="work__card" role="listitem">
              <div class="work__card-image">
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Vex Robotics case study" loading="lazy" />
                <div class="work__card-overlay" aria-hidden="true"></div>
                <div class="work__card-content">
                  <span class="work__card-category">Brand Strategy + Website</span>
                  <h3 class="work__card-title">Vex Robotics</h3>
                  <p class="work__card-tagline">B2B robotics brand modernization</p>
                </div>
                <div class="work__card-meta">
                  <span class="work__card-meta-item">40% faster deal closure</span>
                  <span class="work__card-meta-item">Enterprise</span>
                  <span class="work__card-meta-item">B2B / Robotics</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- APPROACH - PINNED TIMELINE -->
    <section class="approach section" id="approach" aria-labelledby="approach-title">
      <div class="container">
        <header class="approach__header">
          <span class="tag">How I Work</span>
          <h2 id="approach-title">A Process That <span class="text-accent">Delivers</span></h2>
          <p>Four phases. Eight weeks. One brand that actually works.</p>
        </header>
        
        <div class="approach__pin-wrapper">
          <div class="approach__timeline">
            <!-- Step 1 -->
            <article class="approach__step">
              <div class="approach__step-marker" aria-hidden="true"></div>
              <div class="approach__step-content">
                <div class="approach__step-number">01</div>
                <h3 class="approach__step-title">Discovery & Research</h3>
                <p class="approach__step-desc">Deep dive into your market, competitors, customers, and business goals. I interview stakeholders, audit existing assets, and map the competitive landscape.</p>
                <div class="approach__step-duration">Week 1–2</div>
              </div>
            </article>
            
            <!-- Step 2 -->
            <article class="approach__step">
              <div class="approach__step-marker" aria-hidden="true"></div>
              <div class="approach__step-content">
                <div class="approach__step-number">02</div>
                <h3 class="approach__step-title">Strategy & Positioning</h3>
                <p class="approach__step-desc">Define your unique position, messaging architecture, brand personality, and voice. We articulate why you exist, who you serve, and why you win.</p>
                <div class="approach__step-duration">Week 2–3</div>
              </div>
            </article>
            
            <!-- Step 3 -->
            <article class="approach__step">
              <div class="approach__step-marker" aria-hidden="true"></div>
              <div class="approach__step-content">
                <div class="approach__step-number">03</div>
                <h3 class="approach__step-title">Visual Identity System</h3>
                <p class="approach__step-desc">Logo, typography, color palette, imagery style, iconography, and motion principles. Delivered as a comprehensive brand guidelines site.</p>
                <div class="approach__step-duration">Week 3–5</div>
              </div>
            </article>
            
            <!-- Step 4 -->
            <article class="approach__step">
              <div class="approach__step-marker" aria-hidden="true"></div>
              <div class="approach__step-content">
                <div class="approach__step-number">04</div>
                <h3 class="approach__step-title">Launch & Activation</h3>
                <p class="approach__step-desc">Website, social templates, pitch decks, packaging, signage — every touchpoint. Plus 90-day check-in to measure and iterate.</p>
                <div class="approach__step-duration">Week 5–8</div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about section" id="about" aria-labelledby="about-title">
      <div class="container">
        <div class="about__grid">
          <div class="about__image-wrapper">
            <div class="about__image-frame">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" alt="Aisha Chen at work" loading="lazy" />
              <div class="about__image-accent" aria-hidden="true"></div>
            </div>
            <div class="about__floating-card" aria-label="Currently reading">
              <span class="about__floating-card-label">Currently Reading</span>
              <h4 class="about__floating-card-title">The Brand Gap</h4>
              <p class="about__floating-card-author">Marty Neumeier</p>
            </div>
          </div>
          
          <div class="about__content">
            <span class="tag">About</span>
            <h2 id="about-title">Hi, I'm <span class="text-accent">Aisha</span>.</h2>
            
            <div class="about__description">
              <p>I spent 8 years in-house at Airbnb and Stripe building brand systems that scaled to millions of users. I learned that the best brands aren't just beautiful — they're <span class="font-semibold">strategic assets</span>.</p>
              <p>Since going independent in 2021, I've helped 47 founders turn vague ideas into category-defining brands. My clients have raised over $40M, exited to strategic acquirers, and built loyal communities.</p>
              <p>I believe in <span class="font-semibold">doing less, better</span>. I take on 2–3 clients per quarter so I can go deep. If you're looking for a vendor who delivers PDFs, I'm not your person. If you want a partner who challenges your thinking and builds something that lasts, let's talk.</p>
            </div>
            
            <div class="about__values" role="list" aria-label="Core values">
              <article class="value-card" role="listitem">
                <span class="value-card__icon" aria-hidden="true">🎯</span>
                <h4 class="value-card__title">Strategy First</h4>
                <p class="value-card__desc">Visuals follow thinking</p>
              </article>
              <article class="value-card" role="listitem">
                <span class="value-card__icon" aria-hidden="true">🤝</span>
                <h4 class="value-card__title">Partner, Not Vendor</h4>
                <p class="value-card__desc">I tell you the hard truths</p>
              </article>
              <article class="value-card" role="listitem">
                <span class="value-card__icon" aria-hidden="true">⚡</span>
                <h4 class="value-card__title">Speed to Market</h4>
                <p class="value-card__desc">8 weeks, not 8 months</p>
              </article>
              <article class="value-card" role="listitem">
                <span class="value-card__icon" aria-hidden="true">📈</span>
                <h4 class="value-card__title">Measurable Impact</h4>
                <p class="value-card__desc">Brands that sell</p>
              </article>
            </div>
            
            <details class="about__details">
              <summary>Things that don't go on LinkedIn</summary>
              <div class="about__details-content">
                <p>• Makes terrible playlists for deep work (mostly 90s R&B)</p>
                <p>• Has opinions on coffee roast levels — ask me</p>
                <p>• Once spent 3 weeks in Japan studying minimal packaging design</p>
                <p>• Believes the best brand strategy happens on long walks</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact section" id="contact" aria-labelledby="contact-title">
      <div class="container">
        <div class="contact__grid">
          <div class="contact__info">
            <span class="tag">Let's Work Together</span>
            <h2 id="contact-title">Ready to Build Something <span class="text-accent">That Lasts</span>?</h2>
            <p class="contact__description">I take on 2–3 new clients per quarter. If we're a fit, I'll reply within 24 hours with next steps.</p>
            
            <div class="contact__methods">
              <article class="contact__method">
                <div class="contact__method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p class="contact__method-label">Email</p>
                  <p class="contact__method-value">hello@aishachen.com</p>
                </div>
              </article>
              
              <article class="contact__method">
                <div class="contact__method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </div>
                <div>
                  <p class="contact__method-label">LinkedIn</p>
                  <p class="contact__method-value">/in/aishachen — DMs open</p>
                </div>
              </article>
              
              <article class="contact__method">
                <div class="contact__method-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <p class="contact__method-label">Typical Engagement</p>
                  <p class="contact__method-value">8 weeks • $15k–$40k</p>
                </div>
              </article>
            </div>
            
            <div class="contact__engagement" role="status" aria-live="polite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>
              Usually responds within 24 hours
            </div>
          </div>
          
          <div class="contact__form-wrapper">
            <form class="contact__form" novalidate>
              <header class="contact__form-header">
                <h3 class="contact__form-title">Start a Conversation</h3>
                <p class="contact__form-subtitle">Tell me about the challenge. I'll respond with initial thoughts.</p>
              </header>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="name" class="form-label">Full Name *</label>
                  <input type="text" id="name" name="name" class="form-input" placeholder="Aisha Chen" required aria-required="true" />
                </div>
                <div class="form-group">
                  <label for="email" class="form-label">Email *</label>
                  <input type="email" id="email" name="email" class="form-input" placeholder="aisha@startup.com" required aria-required="true" />
                </div>
              </div>
              
              <div class="form-group">
                <label for="company" class="form-label">Company / Project Name</label>
                <input type="text" id="company" name="company" class="form-input" placeholder="Meridian Health" />
              </div>
              
              <div class="form-group">
                <label for="project-type" class="form-label">What Do You Need? *</label>
                <select id="project-type" name="projectType" class="form-select" required aria-required="true">
                  <option value="">Select project type</option>
                  <option value="brand">Full Brand Identity</option>
                  <option value="strategy">Brand Strategy Only</option>
                  <option value="positioning">Positioning & Messaging</option>
                  <option value="website">Website Copy + Design</option>
                  <option value="rebrand">Rebrand / Refresh</option>
                  <option value="consulting">Ongoing Advisory</option>
                  <option value="other">Something Else</option>
                </select>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="timeline" class="form-label">Timeline</label>
                  <select id="timeline" name="timeline" class="form-select">
                    <option value="">When do you need this?</option>
                    <option value="asap">ASAP / Urgent</option>
                    <option value="1-2">1–2 months</option>
                    <option value="3-4">3–4 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="budget" class="form-label">Budget Range</label>
                  <select id="budget" name="budget" class="form-select">
                    <option value="">Investment level</option>
                    <option value="15-25">$15k–$25k</option>
                    <option value="25-40">$25k–$40k</option>
                    <option value="40+">$40k+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">Tell Me About the Challenge *</label>
                <textarea id="message" name="message" class="form-textarea" rows="5" placeholder="What's the business problem? Who's the audience? What does success look like?" required aria-required="true"></textarea>
              </div>
              
              <button type="submit" class="btn btn-primary contact__submit btn-magnetic" aria-label="Send inquiry">
                <span>Send Inquiry</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              
              <p class="contact__disclaimer">By submitting, you agree to my <a href="/privacy">Privacy Policy</a>. No spam, ever.</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer" role="contentinfo">
      <div class="footer__bg" aria-hidden="true"></div>
      <div class="container">
        <div class="footer__inner">
          <div class="footer__brand">
            <a href="#" class="footer__logo" aria-label="Aisha Chen — Home">Aisha Chen</a>
            <p class="footer__brand-desc">Brand & strategy consultant helping founders build category-defining brands. Strategy-first. No templates. Measurable results.</p>
            <div class="footer__social">
              <a href="https://linkedin.com/in/aishachen" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com/aishachen" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="mailto:hello@aishachen.com" class="footer__social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>
          </div>
          
          <nav class="footer__nav" aria-label="Navigation">
            <h4 class="footer__nav-title">Navigate</h4>
            <ul class="footer__nav-list">
              <li><a href="#work" class="footer__nav-link">Work</a></li>
              <li><a href="#approach" class="footer__nav-link">Approach</a></li>
              <li><a href="#about" class="footer__nav-link">About</a></li>
              <li><a href="#contact" class="footer__nav-link">Contact</a></li>
            </ul>
          </nav>
          
          <nav class="footer__nav" aria-label="Resources">
            <h4 class="footer__nav-title">Resources</h4>
            <ul class="footer__nav-list">
              <li><a href="/case-studies" class="footer__nav-link">Case Studies</a></li>
              <li><a href="/insights" class="footer__nav-link">Insights</a></li>
              <li><a href="/process" class="footer__nav-link">Process</a></li>
              <li><a href="/faq" class="footer__nav-link">FAQ</a></li>
            </ul>
          </nav>
          
          <nav class="footer__nav" aria-label="Legal">
            <h4 class="footer__nav-title">Legal</h4>
            <ul class="footer__nav-list">
              <li><a href="/privacy" class="footer__nav-link">Privacy Policy</a></li>
              <li><a href="/terms" class="footer__nav-link">Terms of Service</a></li>
              <li><a href="/cookies" class="footer__nav-link">Cookie Policy</a></li>
              <li><a href="/accessibility" class="footer__nav-link">Accessibility</a></li>
            </ul>
          </nav>
        </div>
        
        <div class="footer__bottom">
          <p class="footer__copyright">© 2025 Aisha Chen. All rights reserved.</p>
          <p class="footer__credits">Designed & developed by <a href="#">Your Name</a></p>
        </div>
      </div>
    </footer>
  `;
}