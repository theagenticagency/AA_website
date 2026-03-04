import React from 'react';

const SectionContainer = ({
  children,
  className = '',
  dark = false,
  rounded = false,
  id
}) => {
  const baseClasses = dark
    ? 'bg-black text-[#E6E6E1]'
    : 'bg-[#E6E6E1] text-black';

  const roundedClasses = rounded ? 'rounded-xl mx-4 my-12' : '';

  return (
    <section
      id={id}
      className={`py-24 px-6 md:px-16 ${baseClasses} ${roundedClasses} ${className}`}
    >
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
