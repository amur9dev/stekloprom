/**
 * Секция CallToAction — призыв к действию
 * 
 * @description Блок с призывом к заказу
 * Использует БЭМ-методологию для именования классов
 */

import { Phone, ArrowRight, Clock, MapPin } from 'lucide-react';
import styles from './CallToAction.module.css';

/**
 * Контент секции
 */
const CTA_CONTENT = {
  title: 'Готовы сделать заказ?',
  subtitle: 'Оставьте заявку и получите расчёт стоимости в течение 30 минут. Бесплатная консультация и замер.',
  phone: '+7 (863) 123-45-67',
  phoneHref: 'tel:+78631234567',
  primaryButton: 'Заказать звонок',
  secondaryButton: 'Рассчитать стоимость',
  info: [
    { icon: Clock, text: 'Ответим за 30 минут' },
    { icon: MapPin, text: 'Доставка по Ростову' },
  ],
};

/**
 * Компонент CallToAction
 */
interface CallToActionProps {
  onOpenCallback?: () => void;
}

const CallToAction = ({ onOpenCallback }: CallToActionProps) => {
  const handleClick = () => {
    if (onOpenCallback) {
      onOpenCallback();
    } else {
      import('@/components/layout/Layout').then(({ ModalContext }) => {
        ModalContext.openCallback();
      });
    }
  };

  return (
    <section className={styles.cta}>
      <div className={styles.cta__container}>
        <div className={styles.cta__content}>
          {/* Заголовок */}
          <h2 className={styles.cta__title}>
            {CTA_CONTENT.title}
          </h2>
          
          {/* Подзаголовок */}
          <p className={styles.cta__subtitle}>
            {CTA_CONTENT.subtitle}
          </p>

          {/* Кнопки */}
          <div className={styles.cta__actions}>
            <button 
              className={`${styles.cta__button} ${styles['cta__button--primary']}`}
              onClick={handleClick}
            >
              {CTA_CONTENT.primaryButton}
              <ArrowRight size={20} />
            </button>
            
            <a 
              href={CTA_CONTENT.phoneHref}
              className={`${styles.cta__button} ${styles['cta__button--secondary']}`}
            >
              <Phone size={20} />
              {CTA_CONTENT.phone}
            </a>
          </div>

          {/* Дополнительная информация */}
          <div className={styles.cta__info}>
            {CTA_CONTENT.info.map((item, index) => (
              <div key={index} className={styles.cta__infoItem}>
                <div className={styles.cta__infoIcon}>
                  <item.icon size={18} />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
