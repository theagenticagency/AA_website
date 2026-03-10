import React, { createContext, useContext, useState, useCallback } from 'react';
import { InquiryModal } from '../components/common';

const InquiryContext = createContext(null);

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within InquiryProvider');
  }
  return context;
};

export const InquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState('general');
  const [ctaLabel, setCtaLabel] = useState('');

  const openInquiry = useCallback((productType = 'general', label = '') => {
    setProduct(productType);
    setCtaLabel(label);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <InquiryContext.Provider value={{ openInquiry, closeInquiry }}>
      {children}
      <InquiryModal
        isOpen={isOpen}
        onClose={closeInquiry}
        product={product}
        ctaLabel={ctaLabel}
      />
    </InquiryContext.Provider>
  );
};

export default InquiryContext;
