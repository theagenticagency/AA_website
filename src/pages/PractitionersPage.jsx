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

      {/* INTRO */}
      <section className="py-20 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-black/70 font-medium leading-relaxed mb-8">
            It takes all kinds to figure out what works — and for whom, and in which settings. The Practitioners series features long-form interviews and LinkedIn reels with the people gathering experiences the rest of us can learn from and be inspired by.
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-black text-[#E6E6E1] font-mono text-xs uppercase tracking-wider rounded">
              Long-form interviews
            </span>
            <span className="px-4 py-2 bg-black text-[#E6E6E1] font-mono text-xs uppercase tracking-wider rounded">
              LinkedIn reels
            </span>
            <span className="px-4 py-2 bg-black text-[#E6E6E1] font-mono text-xs uppercase tracking-wider rounded">
              Practical insights
            </span>
          </div>
        </div>
      </section>

      {/* PRACTITIONERS GRID */}
      <section id="practitioners-grid" className="py-24 px-6 md:px-16 bg-[#E6E6E1]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {practitioners.map((practitioner, index) => (
              <Link
                key={practitioner.slug}
                to={`/practitioners/${practitioner.slug}`}
                className="practitioner-card group block"
              >
                <div className="bg-white rounded-xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300">
                  {/* Episode badge */}
                  <div className="bg-black text-[#E6E6E1] px-6 py-3 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest">
                      Episode {String(practitioner.episode).padStart(2, '0')}
                    </span>
                    <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="font-mono text-xs uppercase tracking-wider text-black/40 mb-2">
                      {practitioner.organisation || practitioner.location}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2 group-hover:text-black/80 transition-colors">
                      {practitioner.name}
                    </h2>
                    <p className="text-sm text-black/60 font-medium mb-4">
                      {practitioner.title}{practitioner.organisation ? `, ${practitioner.organisation}` : ''}
                    </p>
                    <p className="text-black/70 font-medium mb-6 leading-relaxed">
                      {practitioner.tagline}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {practitioner.topics.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-black/5 text-black/60 text-xs font-medium rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Pull quote */}
                    <div className="border-l-4 border-black pl-4">
                      <p className="text-sm italic text-black/60">
                        "{practitioner.pullQuote}"
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
