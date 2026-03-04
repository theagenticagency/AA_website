import React from 'react';
import { CheckSquare, XSquare } from 'lucide-react';

const TargetAudienceSection = ({
  forItems = [],
  notForItems = [],
  requirement = null
}) => {
  return (
    <section className="py-24 bg-black text-[#E6E6E1] px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-0 border-4 border-white/20 rounded-xl overflow-hidden">
        {/* Who It's For */}
        <div className="p-12 md:p-16 bg-black border-b md:border-b-0 md:border-r border-white/20">
          <div className="flex items-center gap-4 mb-8">
            <CheckSquare size={32} className="text-[#E6E6E1]" />
            <h3 className="text-3xl font-bold uppercase">Who It's For</h3>
          </div>
          <ul className="space-y-6 text-lg font-medium text-[#E6E6E1]/80">
            {forItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Who It's Not For */}
        <div className="p-12 md:p-16 bg-[#111]">
          <div className="flex items-center gap-4 mb-8">
            <XSquare size={32} className="text-white/50" />
            <h3 className="text-3xl font-bold uppercase text-white/50">Who It's Not For</h3>
          </div>
          <ul className="space-y-6 text-lg font-medium text-white/50">
            {notForItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
            {requirement && (
              <li className="pt-4 mt-4 border-t border-white/10 text-white/80">
                <strong>Requirement:</strong> {requirement}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
