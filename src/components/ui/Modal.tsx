/**
 * Modal — модальное окно
 * 
 * @description Универсальный компонент модального окна
 */

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  // Блокировка прокрутки при открытом модале
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#E30613] transition-colors rounded-full hover:bg-gray-100"
          aria-label="Закрыть"
        >
          <X size={24} />
        </button>

        <h2 className="font-inter text-2xl font-bold text-[#2D3748] mb-6 pr-8">
          {title}
        </h2>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
