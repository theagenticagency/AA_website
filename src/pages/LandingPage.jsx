import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { MagneticButton, FloatingShapes, GlowOrb, AnimatedGrid } from '../components/common';
import { ProductLadderSection } from '../components/sections';
import { PageMeta, OrganizationSchema, BreadcrumbSchema } from '../components/seo';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation with enhanced stagger
      gsap.fromTo('.hero-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
      );

      // Floating shapes subtle rotation
      gsap.to('.hero-shape', {
        rotation: 360,
        duration: 120,
        ease: 'none',
        repeat: -1
      });

      // Scroll indicator with refined animation
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        gsap.to('.scroll-indicator', {
          y: 10,
          duration: 1.5,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          delay: 1.5
        });

        gsap.to('.scroll-indicator', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#problem-section',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      // Problem section parallax background
      gsap.to('.parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '#problem-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      // Philosophy word reveal with scale
      gsap.fromTo('.phil-word',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#problem-section',
            start: 'top 65%'
          }
        }
      );

      // Glow pulse animation
      gsap.to('.glow-pulse', {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Subtext reveal with blur effect
      gsap.fromTo('.subtext-reveal',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#subtext-section',
            start: 'top 65%'
          }
        }
      );

      // Pillar items with 3D-like entrance
      gsap.fromTo('.pillar-item',
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.pillar-item',
            start: 'top 80%'
          }
        }
      );

      // Why Us section with slide-in
      gsap.fromTo('.why-us-content',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#why-us-section',
            start: 'top 65%'
          }
        }
      );

      // Principle items stagger
      gsap.fromTo('.principle-item',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.principle-item',
            start: 'top 75%'
          }
        }
      );

      // Final CTA with elegant reveal
      gsap.fromTo('.cta-reveal',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-reveal',
            start: 'top 80%'
          }
        }
      );

      // Section divider lines animate in
      gsap.fromTo('.section-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '.section-line',
            start: 'top 85%'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-x-hidden">
      <PageMeta
        title="Agentic Agency — AI Development as a Service"
        description="Fixed-price enterprise software delivery. AI-powered development with human engineering oversight. Perpetual licence included."
        path="/"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }]} />

      {/* A. HERO SECTION */}
      <section className="relative h-[100dvh] w-full flex flex-col justify-end pb-16 px-6 md:px-16 overflow-hidden bg-[#E6E6E1]">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2000"
            alt=""
            className="w-full h-full object-cover opacity-20 mix-blend-multiply grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E6E6E1] via-[#E6E6E1]/70 to-[#E6E6E1]/40"></div>
        </div>

        {/* Floating decorative shapes */}
        <FloatingShapes variant="light" />

        {/* Subtle glow */}
        <GlowOrb color="rgba(0, 0, 0, 0.03)" size={800} position="topRight" blur={200} />

        {/* Grid overlay */}
        <AnimatedGrid variant="light" className="opacity-50" />

        <div className="relative z-10 max-w-5xl mb-16">
          <h1 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-8 text-black">
            ENGINEERING &gt; PROMPTING
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-black/80 max-w-3xl mb-12 font-medium leading-snug">
            AI Development as a Service. Fixed price. Enterprise quality. Perpetual licence.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <MagneticButton
              to="/the-spark"
              className="bg-black text-[#E6E6E1] px-8 py-5 text-lg font-bold flex items-center gap-2 hover:bg-black/90 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            >
              Start with The Spark <ArrowUpRight size={20} />
            </MagneticButton>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-black/50 border-l-2 border-black/20 pl-4 py-1">
              Production-grade software.<br/>Delivered in weeks.
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-black/40">Scroll</span>
          <div className="w-8 h-14 border-2 border-black/20 rounded-full flex items-start justify-center pt-3">
            <div className="w-1.5 h-3 bg-black/30 rounded-full"></div>
          </div>
        </div>

        {/* Decorative corner lines */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-black/10"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-black/10"></div>
      </section>

      {/* B. THE GAP (Problem Statement) */}
      <section id="problem-section" className="relative py-32 md:py-48 px-6 md:px-16 bg-black text-[#E6E6E1] overflow-hidden rounded-xl mx-4 mt-12 mb-0 rounded-b-none">
        {/* Parallax background */}
        <div className="parallax-bg absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356f27?q=80&w=2000"
            alt=""
            className="w-full h-[120%] object-cover grayscale"
          />
        </div>

        {/* Animated glow */}
        <div className="glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px]"></div>

        {/* Grid overlay */}
        <AnimatedGrid variant="dark" className="opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="phil-word text-xl md:text-3xl text-[#E6E6E1]/70 mb-12 font-medium leading-relaxed">
            There's a gap between "AI helped me write this function" and<br className="hidden md:block" /> "AI systematically helped us deliver this feature."
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight uppercase">
            <span className="phil-word inline-block mr-2 md:mr-3">That</span>
            <span className="phil-word inline-block mr-2 md:mr-3">gap</span>
            <span className="phil-word inline-block mr-2 md:mr-3">has</span>
            <span className="phil-word inline-block mr-2 md:mr-3">a</span>
            <span className="phil-word inline-block">name:</span>
          </h2>
          <div className="mt-8 md:mt-12">
            <span className="phil-word inline-block text-4xl md:text-6xl lg:text-7xl font-bold uppercase text-[#E6E6E1] bg-white/10 backdrop-blur-sm px-8 py-4 border border-white/20 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.1)]">
              AGENTIC ENGINEERING.
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 w-24 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="absolute bottom-12 right-12 w-24 h-px bg-gradient-to-l from-white/20 to-transparent"></div>
      </section>

      {/* B2. THE SOLUTION (Below Fold) */}
      <section id="subtext-section" className="relative py-32 md:py-48 px-6 md:px-16 overflow-hidden rounded-xl mx-4 mt-0 mb-12 rounded-t-none bg-[#E6E6E1]">
        {/* Gradient blend from black section */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>

        {/* Floating shapes */}
        <FloatingShapes variant="light" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h3 className="subtext-reveal text-4xl md:text-6xl font-bold uppercase tracking-tight mb-8 text-black">
            We close that gap.
          </h3>

          <p className="subtext-reveal text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-16 text-black/60">
            Systematically.
          </p>

          {/* Animated divider */}
          <div className="section-line w-24 h-px bg-black/20 mx-auto mb-16 origin-center"></div>

          {/* Three pillars */}
          <div className="subtext-reveal grid md:grid-cols-3 gap-6 mt-8 mb-12" style={{ perspective: '1000px' }}>
            <Link to="/the-spark" className="pillar-item group p-8 rounded-xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-black text-black/10 mb-3 group-hover:text-black/20 transition-colors">01</div>
              <div className="font-bold text-lg uppercase tracking-tight text-black">The Spark</div>
              <div className="text-sm text-black/50 mt-2">Onboarding & readiness</div>
              <div className="mt-4 text-xs font-mono uppercase tracking-wider text-black/30 group-hover:text-black/50 transition-colors">1-2 weeks</div>
            </Link>
            <Link to="/the-catalyst" className="pillar-item group p-8 rounded-xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-black text-black/10 mb-3 group-hover:text-black/20 transition-colors">02</div>
              <div className="font-bold text-lg uppercase tracking-tight text-black">The Catalyst</div>
              <div className="text-sm text-black/50 mt-2">AI Development as a Service</div>
              <div className="mt-4 text-xs font-mono uppercase tracking-wider text-black/30 group-hover:text-black/50 transition-colors">8-12 weeks</div>
            </Link>
            <Link to="/the-core" className="pillar-item group p-8 rounded-xl bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl font-black text-black/10 mb-3 group-hover:text-black/20 transition-colors">03</div>
              <div className="font-bold text-lg uppercase tracking-tight text-black">The Core</div>
              <div className="text-sm text-black/50 mt-2">Command center & support</div>
              <div className="mt-4 text-xs font-mono uppercase tracking-wider text-black/30 group-hover:text-black/50 transition-colors">Ongoing</div>
            </Link>
          </div>

          <div className="subtext-reveal mt-12">
            <MagneticButton
              to="/the-spark"
              className="bg-black text-[#E6E6E1] px-8 py-4 text-lg font-bold hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              Start with The Spark <ArrowUpRight size={18} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* C. PRODUCT LADDER */}
      <ProductLadderSection variant="full" />

      {/* D. WHY US */}
      <section id="why-us-section" className="relative py-32 px-6 md:px-16 bg-black text-[#E6E6E1] rounded-xl mx-4 my-12 overflow-hidden">
        {/* Subtle animated glow */}
        <GlowOrb color="rgba(230, 230, 225, 0.05)" size={700} position="bottomRight" blur={180} />
        <AnimatedGrid variant="dark" className="opacity-20" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="why-us-content md:sticky md:top-32">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
                Practitioners at the forefront.
              </h2>
              <p className="text-lg text-[#E6E6E1]/70 font-medium leading-relaxed mb-6">
                Agentic engineering is evolving rapidly. We invest heavily in staying current — continuously refining our methodology as tools and best practices advance.
              </p>
              <p className="text-lg text-[#E6E6E1]/70 font-medium leading-relaxed mb-10">
                We're not theorists. We build with these tools daily, encounter the edge cases, and know what actually works in production environments.
              </p>
              <MagneticButton
                to="/about"
                className="bg-[#E6E6E1] text-black px-8 py-4 text-lg font-bold hover:shadow-[0_10px_40px_rgba(230,230,225,0.2)] transition-all duration-300"
              >
                Meet the team <ArrowUpRight size={18} />
              </MagneticButton>
            </div>
            <div className="why-us-content bg-[#0a0a0a] rounded-2xl p-10 md:p-12 border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
              <div className="space-y-10">
                <div className="principle-item">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-3">Methodology over tools.</h4>
                  <p className="text-[#E6E6E1]/60 font-medium leading-relaxed">Tools change every quarter. The discipline persists.</p>
                </div>
                <div className="principle-item border-t border-white/10 pt-10">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-3">Practice over theory.</h4>
                  <p className="text-[#E6E6E1]/60 font-medium leading-relaxed">Hands-on from hour one. Real code, real results.</p>
                </div>
                <div className="principle-item border-t border-white/10 pt-10">
                  <h4 className="font-bold text-xl uppercase tracking-tight mb-3">Results over credentials.</h4>
                  <p className="text-[#E6E6E1]/60 font-medium leading-relaxed">No certifications. Just measurable capability.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. FINAL CTA */}
      <section className="relative pt-24 pb-32 px-6 md:px-16 bg-[#E6E6E1] overflow-hidden">
        <FloatingShapes variant="light" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="cta-reveal text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8">
            Ready to start?
          </h2>
          <p className="cta-reveal text-xl text-black/60 font-medium mb-12 max-w-2xl mx-auto mt-6">
            Most organizations begin with The Spark — structured onboarding that prepares you for AI Development as a Service. From there, The Catalyst delivers.
          </p>
          <div className="cta-reveal flex flex-col sm:flex-row justify-center gap-6">
            <MagneticButton
              to="/the-spark"
              className="bg-black text-[#E6E6E1] px-10 py-5 text-lg font-bold hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              Explore The Spark <ArrowUpRight size={20} />
            </MagneticButton>
            <MagneticButton
              to="/about"
              className="bg-white text-black px-10 py-5 text-lg font-bold border-2 border-black hover:bg-black hover:text-[#E6E6E1] transition-all duration-300"
            >
              Learn about us
            </MagneticButton>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="section-line absolute bottom-16 left-1/2 -translate-x-1/2 w-32 h-px bg-black/10 origin-center"></div>
      </section>
    </div>
  );
};

export default LandingPage;
