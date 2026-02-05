/**
 * Секция WhyUs — почему выбирают нас
 * 
 * @description Блок с преимуществами компании
 * Использует БЭМ-методологию для именования классов
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * - Преимущества: измените ADVANTAGES
 * - Статистика: измените STATS
 */

import { Factory, Award, Clock, Truck, Shield, Users } from 'lucide-react';
import styles from './WhyUs.module.css';

/**
 * Преимущества компании (реальная информация о Стеклопром)
 */
const ADVANTAGES = [
  {
    icon: Factory,
    title: 'Собственное производство',
    description: 'Полный цикл производства в Ростове-на-Дону. Офис, производство и склад — всё под контролем',
  },
  {
    icon: Award,
    title: 'Качество и надёжность',
    description: 'Используем качественные стёкла и комплектующие. Сертификаты качества, соответствие ГОСТ',
  },
  {
    icon: Clock,
    title: 'Изготовление за 1 час',
    description: 'Быстрое производство стандартных стеклопакетов благодаря современному оборудованию',
  },
  {
    icon: Truck,
    title: 'Доставка за 2 часа',
    description: 'Быстрая доставка по Ростову-на-Дону и области в день заказа',
  },
  {
    icon: Shield,
    title: 'Гарантия 5 лет',
    description: 'Официальная гарантия на все виды продукции. Проверяем качество перед отправкой',
  },
  {
    icon: Users,
    title: 'Команда профессионалов',
    description: '30 специалистов с опытом работы. Реализуем проекты любой сложности',
  },
];

/**
 * Статистика компании (реальные данные с 2008 года)
 */
const STATS = [
  { value: 'с 2008', label: 'года на рынке' },
  { value: '30', label: 'специалистов' },
  { value: '5 лет', label: 'гарантии' },
  { value: '1 час', label: 'изготовление' },
];

/**
 * Компонент WhyUs
 */
const WhyUs = () => {
  return (
    <section className={styles.whyus}>
      <div className={styles.whyus__container}>
        {/* Заголовок секции */}
        <header className={styles.whyus__header}>
          <h2 className={styles.whyus__title}>
            Почему выбирают нас
          </h2>
          <p className={styles.whyus__subtitle}>
            Компания «Стеклопром» работает на рынке Ростова-на-Дону с 2008 года. 
            Наша команда из 30 профессионалов ежедневно создаёт качественные стеклопакеты. 
            Собственное производство, офис и склад позволяют контролировать весь процесс — 
            от изготовления до доставки.
          </p>
        </header>

        {/* Сетка преимуществ */}
        <div className={styles.whyus__grid}>
          {ADVANTAGES.map((advantage, index) => (
            <article key={index} className={styles.whyus__card}>
              <div className={styles.whyus__cardIcon}>
                <advantage.icon size={26} />
              </div>
              <div className={styles.whyus__cardContent}>
                <h3 className={styles.whyus__cardTitle}>
                  {advantage.title}
                </h3>
                <p className={styles.whyus__cardDescription}>
                  {advantage.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Статистика */}
        <div className={styles.whyus__stats}>
          {STATS.map((stat, index) => (
            <div key={index} className={styles.whyus__stat}>
              <div className={styles.whyus__statValue}>
                {stat.value}
              </div>
              <div className={styles.whyus__statLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
