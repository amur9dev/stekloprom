/**
 * FloatingCallButton — фиксированная кнопка звонка
 * 
 * @description Плавающая кнопка для быстрого звонка
 */

import { Phone } from 'lucide-react';

const FloatingCallButton = () => {
  return (
    <>
      <style>{`
        @keyframes gentlePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(255, 52, 47, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 28px rgba(255, 52, 47, 0.55);
          }
        }
      `}</style>
      <a
        href="tel:+78631234567"
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#ff5a56] to-[#ff342f] rounded-full flex items-center justify-center text-white z-[9999] transition-all duration-300 hover:scale-110 md:bottom-10 md:right-10"
        aria-label="Позвонить"
        style={{
          animation: 'gentlePulse 3s ease-in-out infinite',
        }}
      >
        <Phone size={28} />
      </a>
    </>
  );
};

export default FloatingCallButton;
