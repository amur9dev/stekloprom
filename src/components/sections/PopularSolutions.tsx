/**
 * Секция PopularSolutions — популярные решения
 * 
 * @description Карточки с основными типами стеклопакетов
 * Использует БЭМ-методологию для именования классов
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * - Продукты: измените PRODUCTS
 * - Изображения: замените placeholder.svg на реальные фото
 */

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './PopularSolutions.module.css';

/**
 * Данные о продуктах
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * Редактируйте данные продуктов здесь
 * Замените image на путь к реальному изображению
 */
const PRODUCTS = [
  {
    id: 'dvuhkamernye',
    image: '/placeholder.svg',
    title: 'Двухкамерные',
    description: 'Оптимальный выбор для жилых помещений с отличной тепло- и шумоизоляцией. Надёжный и проверенный вариант',
    features: ['Толщина 32-40 мм', 'Формула 4-12-4-12-4', 'Улучшенная изоляция'],
    price: 'от 1 800',
    href: '/catalog/dvuhkamernye',
    popular: false,
  },
  {
    id: 'multifunktsionalnye',
    image: '/placeholder.svg',
    title: 'Мультифункциональные',
    description: 'Сочетание энергосбережения, защиты от солнца и шумоизоляции в одном стеклопакете. Премиальное решение',
    features: ['Защита от УФ до 99%', 'Защита от жары', 'Энергосбережение'],
    price: 'от 3 600',
    href: '/catalog/multifunktsionalnye',
    popular: true,
  },
  {
    id: 'energosberegayushchie',
    image: '/placeholder.svg',
    title: 'Энергосберегающие',
    description: 'Экономия на отоплении до 40% за счёт специального I-покрытия. Сохраняет тепло зимой и прохладу летом',
    features: ['I-стекло Low-E', 'Заполнение аргоном', 'Экономия до 40%'],
    price: 'от 2 400',
    href: '/catalog/energosberegayushchie',
    popular: false,
  },
  {
    id: 'shumoizolyatsionnye',
    image: '/placeholder.svg',
    title: 'Шумоизоляционные',
    description: 'Тишина даже у оживлённой дороги благодаря многослойной конструкции. Снижение шума до 42 дБ',
    features: ['Триплекс', 'До 42 дБ изоляции', 'Разная толщина стёкол'],
    price: 'от 2 800',
    href: '/catalog/shumoizolyatsionnye',
    popular: false,
  },
];

/**
 * Компонент PopularSolutions
 */
const PopularSolutions = () => {
  return (
    <section className={styles.solutions}>
      <div className={styles.solutions__container}>
        {/* Заголовок секции */}
        <div className={styles.solutions__header}>
          <h2 className={styles.solutions__title}>
            Популярные решения
          </h2>
          <p className={styles.solutions__subtitle}>
            Выберите оптимальный тип стеклопакета для ваших задач. 
            Мы поможем подобрать идеальное решение.
          </p>
        </div>

        {/* Сетка продуктов */}
        <div className={styles.solutions__grid}>
          {PRODUCTS.map((product) => (
            <article 
              key={product.id}
              className={`${styles.solutions__card} ${
                product.popular ? styles['solutions__card--popular'] : ''
              }`}
            >
              {/* Бейдж популярного */}
              {product.popular && (
                <div className={styles.solutions__cardBadge}>
                  Популярный
                </div>
              )}

              {/* Изображение продукта */}
              <div className={styles.solutions__cardImageWrapper}>
                <img 
                  src={product.image} 
                  alt={product.title}
                  className={styles.solutions__cardImage}
                  loading="lazy"
                />
              </div>

              {/* Заголовок */}
              <h3 className={styles.solutions__cardTitle}>
                {product.title}
              </h3>

              {/* Описание */}
              <p className={styles.solutions__cardDescription}>
                {product.description}
              </p>

              {/* Характеристики */}
              <ul className={styles.solutions__cardFeatures}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.solutions__cardFeature}>
                    <span className={styles.solutions__cardFeatureDot} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Цена */}
              <div className={styles.solutions__cardPrice}>
                {product.price} <span className={styles.solutions__cardPriceLabel}>₽/м²</span>
              </div>

              {/* Кнопка */}
              <Link 
                to={product.href}
                className={styles.solutions__cardButton}
              >
                Подробнее
                <ArrowRight size={18} />
              </Link>
            </article>
          ))}
        </div>

        {/* Кнопка "Весь каталог" */}
        <div className={styles.solutions__footer}>
          <Link to="/catalog" className={styles.solutions__allButton}>
            Смотреть весь каталог
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularSolutions;
