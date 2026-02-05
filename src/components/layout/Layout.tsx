/**
 * Компонент Layout — основной макет страницы
 * 
 * @description Обёртка для страниц с Header, Footer и плавающими элементами
 */

import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingCallButton from '@/components/ui/FloatingCallButton';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Modal from '@/components/ui/Modal';
import CallbackForm from '@/components/ui/CallbackForm';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  /** Добавить отступ сверху для страниц без hero-баннера */
  withPadding?: boolean;
}

/**
 * Контекст для модального окна (упрощённый вариант)
 */
export const ModalContext = {
  openCallback: () => {},
};

/**
 * Компонент Layout
 */
const Layout = ({ children, withPadding = false }: LayoutProps) => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  // Глобальный доступ к открытию модала
  ModalContext.openCallback = () => setIsCallbackOpen(true);

  return (
    <div className={styles.layout}>
      <Header onOpenCallback={() => setIsCallbackOpen(true)} />
      <main className={`${styles.layout__main} ${withPadding ? styles['layout__main--withPadding'] : ''}`}>
        {children}
      </main>
      <Footer />

      {/* Плавающие элементы */}
      <FloatingCallButton />
      <ScrollToTop />

      {/* Модальное окно заявки */}
      <Modal
        isOpen={isCallbackOpen}
        onClose={() => setIsCallbackOpen(false)}
        title="Заказать звонок"
      >
        <p className="font-inter text-[#718096] mb-6">
          Оставьте заявку и мы перезвоним вам в течение 15 минут
        </p>
        <CallbackForm 
          onSuccess={() => {
            setTimeout(() => setIsCallbackOpen(false), 3000);
          }}
          buttonText="Заказать звонок"
        />
      </Modal>
    </div>
  );
};

export default Layout;
