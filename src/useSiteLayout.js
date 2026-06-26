import { useState, useEffect } from 'react';

export const useSiteLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openContactModal = () => {
    setMobileMenuOpen(false);
    setIsContactModalOpen(true);
  };

  return {
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    isContactModalOpen,
    setIsContactModalOpen,
    openContactModal,
  };
};
