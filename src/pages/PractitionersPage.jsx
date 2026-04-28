import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PageMeta, BreadcrumbSchema } from '../components/seo';
import { practitioners } from '../data/practitioners';

gsap.registerPlugin(ScrollTrigger);

const PractitionersPage = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );

      // Practitioner cards
      gsap.fromTo('.practitioner-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#practitioners-grid',
            start: 'top 75%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <PageMeta
        title="The Practitioners — Agentic Agency"
        description="Trailblazers in Agentic Engineering. Long-form interviews with leaders and individual contributors gathering experiences the rest of us can learn from."
        path="/practitioners"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Practitioners', path: '/practitioners' }
      ]} />

      {/* HERO */}
      <section className="relative min-h-[70dvh] w-full flex items-end pb-24 px-6 md:px-16 overflow-hidden bg-black text-[#E6E6E1]">
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}></div>

        <div className="relative z-10 max-w-5xl">
          <div className="hero-anim font-mono text-xs uppercase tracking-widest text-[#E6E6E1]/50 mb-6">
            The Practitioners Series
          </div>
          <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter mb-6">
            TRAILBLAZERS IN<br />AGENTIC ENGINEERING
          </h1>
          <p className="hero-anim text-xl md:text-2xl text-[#E6E6E1]/70 max-w-3xl font-medium leading-relaxed">
            Every week there's a new tool, a new repo, a new model release. Staying ahead is a full-time job. We interview the leaders and individual contributors doing the hard work of figuring out what actually works.
          </p>
        </div>
      </section>

      {/* FEATURED PRACTITIONER */}
      {practitioners[0] && (
        <section id="practitioners-grid" className="bg-[#E6E6E1]">
          <Link
            to={`/practitioners/${practitioners[0].slug}`}
            className="practitioner-card group block"
          >
            <div className="grid lg:grid-cols-2 min-h-[70vh]">
              {/* Quote side */}
              <div className="bg-black text-[#E6E6E1] p-12 md:p-16 lg:p-24 flex flex-col justify-center">
                <div className="max-w-xl">
                  <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-12">
                    "{practitioners[0].pullQuote}"
                  </p>
                  <div className="w-16 h-px bg-[#E6E6E1]/30 mb-8"></div>
                  <p className="text-xl md:text-2xl font-medium mb-2 group-hover:text-white transition-colors">
                    {practitioners[0].name}
                  </p>
                  <p className="text-[#E6E6E1]/50">
                    {practitioners[0].title}{practitioners[0].organisation ? `, ${practitioners[0].organisation}` : ''}
                  </p>
                </div>
              </div>

              {/* Teaser side */}
              <div className="bg-[#F5F5F0] p-12 md:p-16 lg:p-24 flex flex-col justify-center">
                <div className="max-w-lg">
                  <span className="font-mono text-xs uppercase tracking-widest text-black/30 mb-6 block">
                    Episode {String(practitioners[0].episode).padStart(2, '0')} · {practitioners[0].publishedDisplay}
                  </span>
                  <p className="text-xl md:text-2xl text-black/70 font-medium leading-relaxed mb-8">
                    {practitioners[0].interviewTeaser}
                  </p>
                  <span className="inline-flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all">
                    Read interview <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* REMAINING PRACTITIONERS */}
      <section className="bg-[#E6E6E1] py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-16">
          {practitioners.slice(1).map((practitioner, index) => (
            <Link
              key={practitioner.slug}
              to={`/practitioners/${practitioner.slug}`}
              className="practitioner-card group block border-t border-black/10 py-16 first:border-t-0 first:pt-0"
            >
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                {/* Episode number and date */}
                <div className="md:col-span-2">
                  <span className="font-mono text-sm text-black/30">
                    {String(practitioner.episode).padStart(2, '0')} · {practitioner.publishedDisplay}
                  </span>
                </div>

                {/* Name and title */}
                <div className="md:col-span-3">
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 group-hover:text-black/60 transition-colors">
                    {practitioner.name}
                  </h2>
                  <p className="text-black/50">
                    {practitioner.title}{practitioner.organisation ? `, ${practitioner.organisation}` : ''}
                  </p>
                </div>

                {/* Pull quote */}
                <div className="md:col-span-6">
                  <p className="text-xl text-black/70 font-light leading-relaxed mb-4">
                    "{practitioner.pullQuote}"
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-black/50 group-hover:text-black group-hover:gap-3 transition-all">
                    Read interview <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>

                {/* Arrow */}
                <div className="md:col-span-1 hidden md:flex justify-end">
                  <ArrowUpRight size={20} className="text-black/20 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 bg-black text-[#E6E6E1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6">
            Know a Practitioner?
          </h2>
          <p className="text-xl text-[#E6E6E1]/70 font-medium mb-8 max-w-2xl mx-auto">
            We're always looking for leaders and individual contributors who are gathering real experiences with agentic engineering. If you know someone doing interesting work, let us know.
          </p>
          <a
            href="mailto:daniel.holm@agenticagency.dev?subject=Practitioners%20Series%20Nomination"
            className="inline-flex items-center gap-2 bg-[#E6E6E1] text-black px-8 py-4 font-bold uppercase tracking-wider rounded hover:bg-white transition-colors"
          >
            Nominate a Practitioner <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PractitionersPage;
