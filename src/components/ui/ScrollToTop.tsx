/**
 * ScrollToTop — кнопка прокрутки наверх
 * 
 * @description Появляется после прокрутки страницы вниз
 */

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 w-12 h-12 bg-[#003366] text-white rounded-full flex items-center justify-center shadow-lg z-[9998] transition-all duration-300 hover:bg-[#002244] hover:-translate-y-1 md:bottom-28 md:right-10"
      aria-label="Вернуться наверх"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;
