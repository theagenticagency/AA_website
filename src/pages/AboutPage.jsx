import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail } from 'lucide-react';
import { MagneticButton } from '../components/common';
import { PageMeta, OrganizationSchema, FounderSchema, BreadcrumbSchema } from '../components/seo';
import { useInquiry } from '../context/InquiryContext';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null);
  const { openInquiry } = useInquiry();

  const founders = [
    {
      initials: "DHK",
      name: "Daniel Holm Kristensen",
      title: "Co-Founder",
      image: "/daniel.jpg",
      imagePosition: "center 30%",
      bio: "Daniel is a transformation leader who has guided engineering teams through billion-kroner technology programs at STARK Group, TDC, Telenor, and Adecco. He specializes in aligning leadership, rebuilding momentum in complex programs, and ensuring technology investments deliver real impact.",
      credentials: [
        "Led enterprise transformations across 200+ person programs",
        "Background in M&A (Deloitte) and startup founding (ChefsClub, exited)"
      ],
      quote: "There's a gap between AI generating code and AI engineering software. We close that gap — one project at a time."
    },
    {
      initials: "ME",
      name: "Morten Elk",
      title: "Co-Founder",
      image: "/morten.jpg",
      imagePosition: "center top",
      bio: "Morten combines scientific rigor with entrepreneurial execution. With a PhD in Physics and decades of building technology businesses, he brings analytical depth to understanding what actually works in engineering practice.",
      credentials: [
        "PhD Physics, University of Copenhagen",
        "CEO of SimpleSite; Founder of Nordic Growth Hackers",
        "Entrepreneur and investor in Copenhagen's technology ecosystem"
      ],
      quote: "The best engineering practices are discovered through rigorous observation, not invented through theory. We measure what works."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      // Founder cards
      gsap.fromTo('.founder-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#team-section',
            start: 'top 70%'
          }
        }
      );

      // Values reveal
      gsap.fromTo('.value-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#values-section',
            start: 'top 70%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <PageMeta
        title="About — Agentic Agency"
        description="AI Development as a Service. Enterprise software built by AI, overseen by engineers. Meet the team."
        path="/about"
      />
      <OrganizationSchema />
      {founders.map((founder) => (
        <FounderSchema
          key={founder.name}
          name={founder.name}
          jobTitle={founder.title}
          description={founder.bio}
        />
      ))}
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ]} />

      {/* A. HERO SECTION */}
      <section className="relative h-[70dvh] w-full flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-[#E6E6E1]">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}></div>

        <div className="relative z-10 max-w-5xl">
          <h1 className="hero-anim text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-4 text-black">
            ABOUT US
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-black/80 max-w-3xl font-medium leading-snug">
            We build enterprise software. AI does the heavy lifting. Engineers ensure it's done&nbsp;right.
          </p>
        </div>
      </section>

      {/* B. WHAT WE DO */}
      <section className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1] rounded-xl mx-4 my-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-[#E6E6E1]/70 font-medium mb-8">
            You want results. Fast results.<br/>
            We deliver production software — not&nbsp;experiments.
          </p>
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8">
            AI builds it. We&nbsp;engineer&nbsp;it.
          </h2>
          <p className="text-lg text-[#E6E6E1]/70 font-medium max-w-3xl mx-auto">
            AI Development as a&nbsp;Service. We scope your project, build it with AI-powered development, and do our best work to keep your software in peak&nbsp;condition. Fixed&nbsp;price. Production-grade. Enterprise&nbsp;quality.
          </p>
        </div>
      </section>

      {/* C. OUR APPROACH / VALUES */}
      <section id="values-section" className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">We Believe In</h2>
          <p className="text-xl text-black/70 font-medium mb-16 max-w-2xl">
            Our approach is built on three principles that guide everything we do.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="value-item bg-white rounded-xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Methodology over tools.</h3>
              <p className="text-black/70 font-medium">
                Tools change every quarter. The discipline of engineering systematically with AI persists. Our process outlasts any single product.
              </p>
            </div>
            <div className="value-item bg-white rounded-xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Delivery over theory.</h3>
              <p className="text-black/70 font-medium">
                We ship production code, not slide decks. Real software. Real test coverage. Real documentation as a byproduct.
              </p>
            </div>
            <div className="value-item bg-white rounded-xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">Results over credentials.</h3>
              <p className="text-black/70 font-medium">
                We don't sell certifications. We deliver working software. The work speaks for&nbsp;itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* D. THE TEAM */}
      <section id="team-section" className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">The Team</h2>
          <p className="text-xl text-[#E6E6E1]/70 font-medium mb-16 max-w-2xl">
            Enterprise transformation experience, AI product leadership, and technical depth. We build software for companies who need it done right.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="founder-card bg-[#111] rounded-xl border-4 border-white/20 overflow-hidden group hover:border-white/40 transition-colors"
              >
                {/* Founder Photo */}
                <div style={{ height: '320px', backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: founder.imagePosition }}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#E6E6E1]/50 mb-2">{founder.title}</div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">{founder.name}</h3>
                  <p className="text-[#E6E6E1]/70 font-medium text-sm mb-6 leading-relaxed">
                    {founder.bio}
                  </p>

                  {/* Credentials */}
                  <ul className="space-y-2 mb-6">
                    {founder.credentials.map((cred, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#E6E6E1]/50 font-medium">
                        <div className="w-1 h-1 rounded-full bg-[#E6E6E1]/30 mt-1.5 flex-shrink-0"></div>
                        {cred}
                      </li>
                    ))}
                  </ul>

                  {/* Quote */}
                  {founder.quote && (
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-sm italic text-[#E6E6E1]/60">
                        "{founder.quote}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. WHY WORK WITH US */}
      <section className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-12 md:p-16 border-4 border-black">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">
              Practitioners at the Forefront
            </h2>
            <p className="text-lg text-black/70 font-medium mb-6 leading-relaxed">
              Agentic engineering is evolving rapidly. We invest heavily in staying current — continuously refining our methodology as tools and best practices advance.
            </p>
            <p className="text-lg text-black/70 font-medium mb-6 leading-relaxed">
              We're not theorists. We build with these tools daily, encounter the edge cases, and know what actually works in production environments.
            </p>
            <p className="text-xl text-black font-bold">
              You get that experience applied directly to your software.
            </p>
          </div>
        </div>
      </section>

      {/* F. BASED IN DENMARK */}
      <section className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">
                Based in Denmark
              </h2>
              <p className="text-lg text-[#E6E6E1]/70 font-medium mb-6 leading-relaxed">
                We're a Danish company building software for enterprises across the Nordics and beyond.
              </p>
              <p className="text-lg text-[#E6E6E1]/70 font-medium leading-relaxed">
                Close enough for face-to-face when it matters. Remote-first for everything else.
              </p>
            </div>
            <div className="bg-[#111] rounded-xl p-8 border-4 border-white/20">
              <div className="font-mono text-xs uppercase tracking-wider text-[#E6E6E1]/50 mb-4">Location</div>
              <p className="text-2xl font-bold mb-2">Copenhagen, Denmark</p>
              <p className="text-[#E6E6E1]/60 font-medium">Building for enterprises across the Nordics and Europe</p>
            </div>
          </div>
        </div>
      </section>

      {/* G. GET IN TOUCH */}
      <section className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl p-12 md:p-16 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-4">Get in Touch</h2>
            <p className="text-xl text-black/70 font-medium mb-8">
              Have a project in mind? Let's talk about what you need built.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <MagneticButton
                onClick={() => openInquiry('general', 'Book a conversation')}
                className="bg-black text-[#E6E6E1] px-10 py-5 text-lg font-bold"
              >
                Book a conversation <ArrowUpRight size={20} />
              </MagneticButton>
              <MagneticButton
                onClick={() => openInquiry('general', 'Get in touch')}
                className="bg-white text-black px-10 py-5 text-lg font-bold border-2 border-black"
              >
                <Mail size={20} /> Get in touch
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
