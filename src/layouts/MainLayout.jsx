import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FloatingNav, Footer } from '../components/navigation';
import { NoiseOverlay } from '../components/common';
import { InquiryProvider } from '../context/InquiryContext';

const MainLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <InquiryProvider>
      <div className="bg-[#E6E6E1] text-[#000000] selection:bg-[#000000] selection:text-[#E6E6E1] relative min-h-screen">
        <NoiseOverlay />
        <FloatingNav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </InquiryProvider>
  );
};

export default MainLayout;
