import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Monitor, Activity, Shield, Clock, Bell, BarChart3, Check, Eye, Zap } from 'lucide-react';
import { MagneticButton, FloatingShapes, GlowOrb, AnimatedGrid } from '../components/common';
import { ProductLadderSection, FAQSection } from '../components/sections';
import { PageMeta, BreadcrumbSchema } from '../components/seo';
import { useInquiry } from '../context/InquiryContext';

gsap.registerPlugin(ScrollTrigger);

const CorePage = () => {
  const pageRef = useRef(null);
  const { openInquiry } = useInquiry();

  const coreFAQs = [
    { q: "What is The Core?", a: "The Core is the Command Center for AI-driven development. Real-time dashboards, session management, operational control, and SLA-backed support across all your Catalyst engagements." },
    { q: "Do we need it after The Catalyst?", a: "Optional but recommended. The Core provides ongoing visibility, support, and the ability to quickly spin up new engagements without re-onboarding." },
    { q: "What's included in the SLA?", a: "Response time guarantees, availability commitments, priority support queue, and escalation paths. Specific terms depend on your tier." },
    { q: "Can we self-manage without The Core?", a: "Yes. After The Catalyst, code is yours. The Core is for organizations that want ongoing operational visibility and rapid access to new engagements." },
    { q: "How is pricing structured?", a: "Monthly retainer based on scope of coverage and SLA tier. Contact us for a quote tailored to your operational needs." },
    { q: "Can we add new Catalyst engagements through The Core?", a: "Yes — that's a key benefit. The Core maintains your organizational context, so new engagements start faster and integrate seamlessly." }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Enhanced hero animation
      gsap.fromTo('.hero-anim',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
      );

      // Floating glow pulse
      gsap.to('.glow-pulse', {
        scale: 1.15,
        opacity: 0.7,
        duration: 5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Dashboard live indicator pulse
      gsap.to('.live-indicator', {
        scale: 1.3,
        opacity: 0.5,
        duration: 1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
      });

      // Dashboard elements cascade in
      gsap.fromTo('.dashboard-element',
        { scale: 0.9, opacity: 0, y: 20 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '#dashboard-section', start: 'top 65%' }
        }
      );

      // Feature cards with 3D effect
      gsap.fromTo('.feature-card',
        { y: 50, opacity: 0, rotateX: 8 },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#features-section', start: 'top 65%' }
        }
      );

      // Tier cards stagger
      gsap.fromTo('.tier-card',
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.tier-card', start: 'top 70%' }
        }
      );

      // Command center info slide in
      gsap.fromTo('.info-slide',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.info-slide', start: 'top 70%' }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <PageMeta
        title="The Core — Command Center for AI Development"
        description="Real-time visibility into AI-driven development. Dashboards, session management, operational control, and SLA-backed support."
        path="/the-core"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'The Core', path: '/the-core' }
      ]} />

      {/* HERO */}
      <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-[#111] text-[#E6E6E1]">
        {/* Floating shapes and grid */}
        <FloatingShapes variant="dark" />
        <AnimatedGrid variant="dark" className="opacity-40" />

        {/* Animated glow */}
        <div className="glow-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E6E6E1]/5 rounded-full blur-[200px]"></div>

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-white/10"></div>
        <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-white/10"></div>

        <div className="relative z-10 max-w-5xl">
          <div className="hero-anim font-mono text-sm uppercase tracking-widest text-[#E6E6E1]/50 mb-4">Ongoing</div>
          <h1 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-4">
            THE CORE
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-[#E6E6E1]/80 max-w-3xl mb-6 font-medium leading-snug">
            The Command Center. <strong className="text-[#E6E6E1]">Visibility. Control. Continuity.</strong>
          </p>
          <p className="hero-anim text-lg text-[#E6E6E1]/60 max-w-2xl mb-12 font-medium">
            Real-time dashboards, session management, operational control, and SLA-backed support across all your AI development engagements.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <MagneticButton
              onClick={() => openInquiry('core', 'Learn more')}
              className="bg-[#E6E6E1] text-black px-8 py-5 text-lg font-bold flex items-center gap-2 hover:bg-white"
            >
              Learn more <ArrowUpRight size={20} />
            </MagneticButton>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E6E6E1]/60 border-l-2 border-[#E6E6E1]/20 pl-4 py-1">
              SLA-based<br/>Monthly retainer
            </span>
          </div>
        </div>
      </section>

      {/* WHAT IS THE CORE */}
      <section className="relative py-24 px-6 md:px-16 bg-[#E6E6E1] overflow-hidden">
        <FloatingShapes variant="light" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8">The Command Center</h2>
              <p className="text-xl text-black/80 font-medium leading-relaxed mb-6">
                After The Catalyst delivers, The Core keeps you connected. Real-time visibility into ongoing engagements, operational metrics, and direct access to support.
              </p>
              <p className="text-xl text-black/70 font-medium leading-relaxed mb-8">
                No more status meetings. No more "let me check on that." Everything you need to know — in one place, updated in real time.
              </p>

              <div className="space-y-4">
                {[
                  "Real-time project dashboards",
                  "Active session monitoring",
                  "SLA tracking and reporting",
                  "Direct escalation channels"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={20} className="text-black" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dashboard Preview */}
            <div id="dashboard-section" className="bg-[#111] rounded-xl p-6 border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="live-indicator w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-mono text-sm text-[#E6E6E1]/70">COMMAND CENTER</span>
                </div>
                <span className="font-mono text-xs text-[#E6E6E1]/50 bg-white/5 px-2 py-1 rounded">LIVE</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Active Sessions", value: "3" },
                  { label: "This Week", value: "47 hrs" },
                  { label: "Test Coverage", value: "84%" }
                ].map((stat, i) => (
                  <div key={i} className="dashboard-element bg-white/5 rounded-lg p-4 text-center">
                    <div className="font-mono text-2xl font-bold text-[#E6E6E1]">{stat.value}</div>
                    <div className="text-xs text-[#E6E6E1]/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="dashboard-element space-y-3">
                {[
                  { name: "STARK Procurement", status: "active", progress: 65 },
                  { name: "Invoice Automation", status: "active", progress: 40 },
                  { name: "Dashboard v2", status: "pending", progress: 0 }
                ].map((project, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-[#E6E6E1]/90 text-sm">{project.name}</span>
                      <span className={`text-xs uppercase tracking-wider ${project.status === 'active' ? 'text-green-400' : 'text-[#E6E6E1]/40'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E6E6E1] rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features-section" className="relative py-24 px-6 md:px-16 bg-black text-[#E6E6E1] overflow-hidden">
        <GlowOrb color="rgba(230, 230, 225, 0.04)" size={500} position="topRight" blur={150} />
        <AnimatedGrid variant="dark" className="opacity-20" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">What You Get</h2>
            <p className="text-xl font-medium text-[#E6E6E1]/70 max-w-2xl">Operational visibility and control, backed by SLA commitments.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Monitor,
                title: "Real-Time Dashboards",
                desc: "Live project status, session activity, and progress metrics. No more weekly status emails."
              },
              {
                icon: Activity,
                title: "Session Monitoring",
                desc: "See active development sessions, agent activity, and work in progress. Full transparency."
              },
              {
                icon: BarChart3,
                title: "Operational Metrics",
                desc: "Test coverage trends, deployment frequency, code quality metrics. Data-driven oversight."
              },
              {
                icon: Bell,
                title: "Proactive Alerts",
                desc: "Notifications for key milestones, blockers, and items requiring your attention."
              },
              {
                icon: Shield,
                title: "SLA Guarantees",
                desc: "Response time commitments, availability targets, and escalation paths. Accountability built in."
              },
              {
                icon: Zap,
                title: "Rapid New Engagements",
                desc: "Start new Catalyst projects faster. Your context is already loaded — no re-onboarding needed."
              }
            ].map((item, i) => (
              <div key={i} className="feature-card bg-[#111] border border-white/10 rounded-xl p-8 hover:border-white/30 transition-colors">
                <item.icon size={32} className="text-[#E6E6E1]/60 mb-4" />
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-[#E6E6E1]/70 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA TIERS */}
      <section className="relative py-24 px-6 md:px-16 bg-[#E6E6E1] overflow-hidden">
        <FloatingShapes variant="light" />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">SLA Tiers</h2>
            <p className="text-xl font-medium text-black/70 max-w-2xl mx-auto">Choose the level of support that matches your operational needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Standard */}
            <div className="bg-white rounded-xl p-8 border-2 border-black">
              <div className="font-mono text-xs uppercase tracking-wider text-black/50 mb-2">Tier 1</div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Standard</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Dashboard access",
                  "8-hour response time",
                  "Business hours support",
                  "Monthly reporting"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-black/80">
                    <Check size={16} className="text-black" />
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticButton
                onClick={() => openInquiry('core', 'Standard tier')}
                className="w-full bg-black text-[#E6E6E1] px-6 py-3 font-bold justify-center"
              >
                Get pricing
              </MagneticButton>
            </div>

            {/* Priority */}
            <div className="bg-black text-[#E6E6E1] rounded-xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] -translate-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-[#E6E6E1]/50 mb-2">Tier 2</div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Priority</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Standard",
                  "2-hour response time",
                  "Extended hours support",
                  "Weekly syncs",
                  "Priority queue"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#E6E6E1]/80">
                    <Check size={16} className="text-[#E6E6E1]" />
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticButton
                onClick={() => openInquiry('core', 'Priority tier')}
                className="w-full bg-[#E6E6E1] text-black px-6 py-3 font-bold justify-center"
              >
                Get pricing
              </MagneticButton>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl p-8 border-2 border-black">
              <div className="font-mono text-xs uppercase tracking-wider text-black/50 mb-2">Tier 3</div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Enterprise</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Priority",
                  "30-min response time",
                  "24/7 support available",
                  "Dedicated account team",
                  "Custom integrations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-black/80">
                    <Check size={16} className="text-black" />
                    {item}
                  </li>
                ))}
              </ul>
              <MagneticButton
                onClick={() => openInquiry('core', 'Enterprise tier')}
                className="w-full bg-black text-[#E6E6E1] px-6 py-3 font-bold justify-center"
              >
                Contact us
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection faqs={coreFAQs} />

      {/* PRODUCT LADDER */}
      <ProductLadderSection currentProduct="core" variant="journey" />
    </div>
  );
};

export default CorePage;
