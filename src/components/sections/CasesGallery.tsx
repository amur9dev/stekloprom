/**
 * Секция CasesGallery — галерея работ
 * 
 * @description 4 примера работ на главной (2 колонки на мобильных)
 */

import { Link } from 'react-router-dom';
import { MapPin, Ruler, ArrowRight } from 'lucide-react';
import styles from './CasesGallery.module.css';

/**
 * Примеры работ для главной страницы (4 карточки)
 */
const CASES = [
  {
    id: 1,
    title: 'Проект №1',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Проект №2',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Проект №3',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Проект №4',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    image: '/placeholder.svg',
  },
];

/**
 * Компонент CasesGallery
 */
const CasesGallery = () => {
  return (
    <section className={styles.cases}>
      <div className={styles.cases__container}>
        {/* Заголовок */}
        <header className={styles.cases__header}>
          <h2 className={styles.cases__title}>
            Наши работы в Ростове-на-Дону
          </h2>
          <p className={styles.cases__subtitle}>
            Более 500 успешных проектов — от частных домов до крупных 
            жилых комплексов и бизнес-центров
          </p>
        </header>

        {/* Галерея */}
        <div className={styles.cases__grid}>
          {CASES.map((project) => (
            <article key={project.id} className={styles.cases__card}>
              <img
                src={project.image}
                alt={`${project.title} — остекление ${project.type.toLowerCase()} в Ростове-на-Дону`}
                className={styles.cases__cardImage}
              />
              <div className={styles.cases__cardOverlay}>
                <span className={styles.cases__cardBadge}>
                  {project.type}
                </span>
                <h3 className={styles.cases__cardTitle}>
                  {project.title}
                </h3>
                <div className={styles.cases__cardInfo}>
                  <span className={styles.cases__cardInfoItem}>
                    <MapPin size={14} />
                    {project.location}
                  </span>
                  <span className={styles.cases__cardInfoItem}>
                    <Ruler size={14} />
                    {project.area}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Кнопка */}
        <div className={styles.cases__footer}>
          <Link to="/cases" className={styles.cases__button}>
            Все наши работы
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CasesGallery;