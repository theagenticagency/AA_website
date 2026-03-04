import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Calendar, MessageSquare, FileText, Target, Users, Clock, CheckCircle } from 'lucide-react';
import { MagneticButton } from '../components/common';
import { ProductLadderSection, TargetAudienceSection, FAQSection } from '../components/sections';
import { PageMeta, CatalystCourseSchema, FAQSchema, BreadcrumbSchema } from '../components/seo';

gsap.registerPlugin(ScrollTrigger);

const CatalystPage = () => {
  const pageRef = useRef(null);

  const catalystFAQs = [
    { q: "Do we need to complete The Spark first?", a: "Yes. The Spark teaches the methodology; The Catalyst embeds it. Without shared vocabulary and baseline skills, the 12 weeks are less effective." },
    { q: "How many team members should be involved?", a: "Minimum 3 who completed The Spark. Ideal is 4-6. Larger teams can participate but primary focus is the core group." },
    { q: "What happens if we have an emergency?", a: "Up to 2 emergency half-days per quarter are included. Critical issues (production risk) get 2-hour response with on-site support if needed." },
    { q: "What's the Scaling Readiness Assessment?", a: "Week 12 deliverable that identifies which other teams could benefit from agentic engineering, what prerequisites must exist, and realistic timeline. It's both a deliverable and the foundation for Scale Engine conversations." },
    { q: "Can we pause the engagement?", a: "Pauses are possible but not recommended. Momentum matters. If business circumstances require it, we work together on a modified timeline." },
    { q: "How is pricing determined?", a: "We scope engagements based on your team's size and specific needs. Contact us for a discovery conversation." }
  ];

  const phases = [
    {
      name: "Foundation",
      weeks: "1-3",
      focus: "Setup & First Workflows",
      yourTeam: "Learning patterns",
      consultant: "Heavy guidance",
      color: "bg-white"
    },
    {
      name: "Momentum",
      weeks: "4-8",
      focus: "Independent Execution",
      yourTeam: "Running workflows",
      consultant: "Coach & reviewer",
      color: "bg-black text-[#E6E6E1]"
    },
    {
      name: "Autonomy",
      weeks: "9-11",
      focus: "Full Operation",
      yourTeam: "Leading practice",
      consultant: "Advisor & sparring partner",
      color: "bg-white"
    },
    {
      name: "Handoff",
      weeks: "12",
      focus: "Documentation & Assessment",
      yourTeam: "Presenting results",
      consultant: "Preparing scale readiness",
      color: "bg-[#111] text-[#E6E6E1]"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      // Phase cards stacking
      const cards = gsap.utils.toArray('.phase-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.7,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          }
        });
      });

      // Timeline progress
      gsap.fromTo('.timeline-progress',
        { width: '0%' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '#timeline-section',
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <PageMeta
        title="The Catalyst — 12-Week Agentic Transformation"
        description="12-week embedded program transforming one team into agentic engineering practitioners. 1 day/week on-site + async support."
        path="/the-catalyst"
      />
      <CatalystCourseSchema />
      <FAQSchema faqs={catalystFAQs} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'The Catalyst', path: '/the-catalyst' }
      ]} />

      {/* A. HERO SECTION */}
      <section className="relative h-[100dvh] w-full flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-[#E6E6E1]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000"
            alt="Industrial Forge"
            className="w-full h-full object-cover opacity-25 mix-blend-multiply grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E6E6E1] via-[#E6E6E1]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="hero-anim font-mono text-sm uppercase tracking-widest text-black/50 mb-4">12-Week Transformation</div>
          <h1 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-4 text-black">
            THE CATALYST
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-black/80 max-w-3xl mb-12 font-medium leading-snug">
            A workshop gives you the methodology. <strong>The Catalyst</strong> embeds it into your team's daily workflow — with expert guidance every step of the way.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <MagneticButton className="bg-black text-[#E6E6E1] px-8 py-5 text-lg font-bold flex items-center gap-2 hover:bg-black/90">
              Book a discovery call <ArrowUpRight size={20} />
            </MagneticButton>
            <span className="font-mono text-sm font-bold uppercase tracking-widest text-black/50 border-l-2 border-black/20 pl-4 py-1">
              Prerequisite: The Spark<br/>Custom scoped
            </span>
          </div>
        </div>
      </section>

      {/* B. THE MODEL */}
      <section className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1] rounded-xl mx-4 my-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">The Structured Pulse Model</h2>
            <p className="text-xl text-[#E6E6E1]/70 font-medium max-w-2xl mx-auto">
              1 day per week on-site + async support between visits. Consistent rhythm, measurable progress.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-[#111] rounded-xl p-6 border border-white/10 text-center">
              <Calendar size={32} className="mx-auto mb-4 text-[#E6E6E1]/80" />
              <div className="font-mono text-3xl font-bold mb-2">12</div>
              <div className="text-sm text-[#E6E6E1]/60 font-medium uppercase tracking-wider">On-site days</div>
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-white/10 text-center">
              <MessageSquare size={32} className="mx-auto mb-4 text-[#E6E6E1]/80" />
              <div className="font-mono text-3xl font-bold mb-2">4hr</div>
              <div className="text-sm text-[#E6E6E1]/60 font-medium uppercase tracking-wider">Async SLA</div>
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-white/10 text-center">
              <FileText size={32} className="mx-auto mb-4 text-[#E6E6E1]/80" />
              <div className="font-mono text-3xl font-bold mb-2">12</div>
              <div className="text-sm text-[#E6E6E1]/60 font-medium uppercase tracking-wider">Weekly briefs</div>
            </div>
            <div className="bg-[#111] rounded-xl p-6 border border-white/10 text-center">
              <Target size={32} className="mx-auto mb-4 text-[#E6E6E1]/80" />
              <div className="font-mono text-3xl font-bold mb-2">3</div>
              <div className="text-sm text-[#E6E6E1]/60 font-medium uppercase tracking-wider">Monthly reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* C. TIMELINE / PHASES */}
      <section id="timeline-section" className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">12-Week Journey</h2>
            <p className="text-xl text-black/70 font-medium">From heavy guidance to full autonomy.</p>
          </div>

          {/* Timeline Progress Bar */}
          <div className="hidden md:block relative h-2 bg-black/10 rounded-full mb-16 overflow-hidden">
            <div className="timeline-progress absolute left-0 top-0 h-full bg-black rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-[#E6E6E1]"></div>
            <div className="absolute left-[25%] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-[#E6E6E1]"></div>
            <div className="absolute left-[67%] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-[#E6E6E1]"></div>
            <div className="absolute left-[92%] top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-[#E6E6E1]"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-2 border-[#E6E6E1]"></div>
          </div>

          {/* Phase Cards */}
          <div className="space-y-6">
            {phases.map((phase, i) => (
              <div
                key={phase.name}
                className={`phase-card sticky rounded-xl p-8 md:p-12 border-4 border-black ${phase.color}`}
                style={{ top: `${120 + i * 20}px` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="font-mono text-sm uppercase tracking-wider opacity-60 mb-1">Weeks {phase.weeks}</div>
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">{phase.name}</h3>
                  </div>
                  <div className="flex-grow grid md:grid-cols-3 gap-6 md:gap-12">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-50 mb-2">Focus</div>
                      <p className="font-medium text-lg">{phase.focus}</p>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-50 mb-2">Your Team</div>
                      <p className="font-medium text-lg">{phase.yourTeam}</p>
                    </div>
                    <div>
                      <div className="font-mono text-xs uppercase tracking-wider opacity-50 mb-2">Our Consultant</div>
                      <p className="font-medium text-lg">{phase.consultant}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. WHAT'S INCLUDED */}
      <section className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16">What's Included</h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Delivery */}
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Clock size={24} /> Delivery
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">12 on-site days (1 per week, full day embedded with team)</span>
                </li>
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">Continuous async support (4-hour response SLA, business hours)</span>
                </li>
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">Up to 2 emergency half-days per quarter for critical escalations</span>
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div>
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <FileText size={24} /> Documentation
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">12 weekly written briefs (progress, blockers, recommendations)</span>
                </li>
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">3 monthly progress reviews with CTO/sponsor</span>
                </li>
                <li className="flex items-start gap-4 bg-[#111] p-4 rounded-lg border border-white/10">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0" />
                  <span className="font-medium">Final case study with before/after metrics</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Assessment */}
          <div className="mt-12 bg-[#111] rounded-xl p-8 border-4 border-white/20">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 flex items-center gap-3">
              <Target size={24} /> Week 12: Scaling Readiness Assessment
            </h3>
            <p className="text-[#E6E6E1]/70 font-medium text-lg mb-6">
              By Week 12, we deliver a comprehensive assessment that:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="font-medium">Identifies which other teams could benefit</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="font-medium">Defines prerequisites that must exist</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg">
                <p className="font-medium">Provides realistic timeline for org-wide rollout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. OUTCOMES */}
      <section className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">By Week 12</h2>
          <p className="text-xl text-black/70 font-medium mb-12">Your team will:</p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Run agentic workflows independently without consultant initiation",
              "Handle edge cases and failure modes systematically",
              "Have documented before/after metrics proving ROI",
              "Know exactly where else in your organization agentic engineering should expand"
            ].map((outcome, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="font-mono text-sm text-black/50 mb-2">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-xl font-bold">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. TARGET AUDIENCE */}
      <TargetAudienceSection
        forItems={[
          "Teams that completed The Spark and want to go deeper.",
          "Engineering leaders who need measurable transformation (not just training).",
          "Organizations with a high-value project that could prove agentic engineering ROI."
        ]}
        notForItems={[
          "Teams without Spark foundation (prerequisite).",
          "Organizations looking for staff augmentation.",
          "Projects under 12 weeks duration."
        ]}
        requirement="At least 3 team members must have completed The Spark."
      />

      {/* G. CTA */}
      <section className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl p-12 md:p-16 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Ready to transform your team?</h2>
            <p className="text-xl text-black/70 font-medium mb-8">
              The Catalyst is a 12-week embedded transformation program.<br/>
              Pricing is scoped to your team's size and specific needs.
            </p>
            <MagneticButton className="bg-black text-[#E6E6E1] px-10 py-5 text-xl font-bold mx-auto">
              Book a discovery call <ArrowUpRight size={22} />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* H. FAQ */}
      <FAQSection faqs={catalystFAQs} />

      {/* I. PRODUCT LADDER */}
      <ProductLadderSection currentProduct="catalyst" variant="journey" />
    </div>
  );
};

export default CatalystPage;
