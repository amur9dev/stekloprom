/**
 * Секция HeroSection — главный баннер
 * 
 * @description Первый экран главной страницы с призывом к действию
 * Использует БЭМ-методологию для именования классов
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * - Заголовок: измените HERO_CONTENT.title
 * - Подзаголовок: измените HERO_CONTENT.subtitle
 * - Преимущества: измените HERO_CONTENT.benefits
 */

import { Factory, Zap, Truck, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import heroBanner from '@/assets/images/hero-banner.jpg';

/**
 * Контент секции Hero
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * Редактируйте тексты ниже для изменения контента баннера
 */
const HERO_CONTENT = {
  badge: 'Собственное производство с 2008 года',
  title: {
    before: 'Стеклопакеты',
    accent: 'в Ростове-на-Дону',
    after: 'от производителя',
  },
  subtitle: 'Изготовление стеклопакетов любой сложности за 1 час. Доставка по городу за 2 часа. Гарантия качества 5 лет. Работаем с 2008 года.',
  benefits: [
    {
      icon: Factory,
      text: 'Своё производство',
    },
    {
      icon: Zap,
      text: 'Готовность за 1 час',
    },
    {
      icon: Truck,
      text: 'Доставка 2 часа',
    },
    {
      icon: Shield,
      text: 'Гарантия 5 лет',
    },
  ],
  primaryButton: 'Заказать расчёт',
  secondaryButton: 'Смотреть каталог',
};

/**
 * Компонент HeroSection
 */
interface HeroSectionProps {
  onOpenCallback?: () => void;
}

const HeroSection = ({ onOpenCallback }: HeroSectionProps) => {
  const handlePrimaryClick = () => {
    if (onOpenCallback) {
      onOpenCallback();
    } else {
      // Fallback: использование глобального контекста
      import('@/components/layout/Layout').then(({ ModalContext }) => {
        ModalContext.openCallback();
      });
    }
  };

  return (
    <section className={styles.hero}>
      {/* Фоновое изображение */}
      <div className={styles.hero__background}>
        <img
          src={heroBanner}
          alt="Производство стеклопакетов в Ростове-на-Дону"
          className={styles.hero__backgroundImage}
        />
        <div className={styles.hero__backgroundOverlay} />
      </div>

      {/* Контент */}
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          {/* Бейдж */}
          <div className={styles.hero__badge}>
            <span className={styles.hero__badgeIcon} />
            {HERO_CONTENT.badge}
          </div>

          {/* Заголовок */}
          <h1 className={styles.hero__title}>
            {HERO_CONTENT.title.before}{' '}
            <span className={styles.hero__titleAccent}>
              {HERO_CONTENT.title.accent}
            </span>{' '}
            {HERO_CONTENT.title.after}
          </h1>

          {/* Подзаголовок */}
          <p className={styles.hero__subtitle}>
            {HERO_CONTENT.subtitle}
          </p>

          {/* Преимущества */}
          <div className={styles.hero__benefits}>
            {HERO_CONTENT.benefits.map((benefit, index) => (
              <div key={index} className={styles.hero__benefit}>
                <div className={styles.hero__benefitIcon}>
                  <benefit.icon size={22} color="#ffffff" />
                </div>
                <span className={styles.hero__benefitText}>
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>

          {/* Кнопки */}
          <div className={styles.hero__actions}>
            <button 
              className={`${styles.hero__button} ${styles['hero__button--primary']}`}
              onClick={handlePrimaryClick}
            >
              {HERO_CONTENT.primaryButton}
              <ArrowRight size={20} />
            </button>
            <Link 
              to="/catalog" 
              className={`${styles.hero__button} ${styles['hero__button--secondary']}`}
            >
              {HERO_CONTENT.secondaryButton}
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
