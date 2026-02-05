/**
 * Секция ForWhom — для кого
 * 
 * @description 4 типа клиентов с преимуществами
 */

import { Home, Building2, Warehouse, Users, Check } from 'lucide-react';
import styles from './ForWhom.module.css';

/**
 * Типы клиентов
 */
const CLIENTS = [
  {
    icon: Home,
    title: 'Частные лица',
    description: 'Владельцы квартир и загородных домов в Ростове-на-Дону',
    benefits: [
      'Бесплатный замер на дому',
      'Изготовление от 1 штуки',
      'Доставка до подъезда',
      'Рассрочка без переплат',
    ],
  },
  {
    icon: Building2,
    title: 'Оконные компании',
    description: 'Партнёрские условия для производителей окон ПВХ',
    benefits: [
      'Оптовые цены от 10%',
      'Срочное производство',
      'Отсрочка платежа',
      'Персональный менеджер',
    ],
  },
  {
    icon: Warehouse,
    title: 'Застройщики',
    description: 'Крупные объёмы для строительных компаний',
    benefits: [
      'Скидки до 25%',
      'Поставка на объект',
      'Гибкий график',
      'Сертификаты на объём',
    ],
  },
  {
    icon: Users,
    title: 'Дилеры',
    description: 'Выгодные условия для торговых представителей',
    benefits: [
      'Дилерские цены',
      'Маркетинговая поддержка',
      'Обучение персонала',
      'Эксклюзивные права',
    ],
  },
];

/**
 * Компонент ForWhom
 */
const ForWhom = () => {
  return (
    <section className={styles.forwhom}>
      <div className={styles.forwhom__container}>
        {/* Заголовок */}
        <header className={styles.forwhom__header}>
          <h2 className={styles.forwhom__title}>
            Для кого мы работаем
          </h2>
          <p className={styles.forwhom__subtitle}>
            Индивидуальный подход к каждому клиенту — от частного заказа 
            до крупных строительных объектов
          </p>
        </header>

        {/* Карточки */}
        <div className={styles.forwhom__grid}>
          {CLIENTS.map((client, index) => (
            <article key={index} className={styles.forwhom__card}>
              <div className={styles.forwhom__cardIcon}>
                <client.icon size={36} />
              </div>
              <h3 className={styles.forwhom__cardTitle}>
                {client.title}
              </h3>
              <p className={styles.forwhom__cardDescription}>
                {client.description}
              </p>
              <ul className={styles.forwhom__cardBenefits}>
                {client.benefits.map((benefit, i) => (
                  <li key={i} className={styles.forwhom__cardBenefit}>
                    <Check size={16} className={styles.forwhom__cardBenefitIcon} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
