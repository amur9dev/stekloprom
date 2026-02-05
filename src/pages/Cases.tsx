/**
 * Страница Cases — наши работы
 * 
 * @description Портфолио выполненных проектов с мобильным слайдером
 */

import { useEffect, useState, useRef } from 'react';
import { MapPin, Ruler, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { useIsMobile } from '@/hooks/use-mobile';
import styles from './Cases.module.css';

/**
 * Все работы компании (заглушки)
 */
const ALL_CASES = [
  {
    id: 1,
    title: 'Проект №1',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Проект №2',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Проект №3',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Проект №4',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Проект №5',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Проект №6',
    type: 'Тип объекта',
    location: 'Ростов-на-Дону',
    area: '— м²',
    year: '2024',
    description: 'Описание проекта будет добавлено позже. Свяжитесь с нами для подробностей.',
    image: '/placeholder.svg',
  },
];

/**
 * Компонент CasesPage
 */
const CasesPage = () => {
  const { setMeta } = useSeoMeta();
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Наши работы — примеры остекления стеклопакетами в Ростове-на-Дону',
      description: 'Фото выполненных проектов по остеклению в Ростове-на-Дону: жилые комплексы, офисы, коттеджи, торговые центры. Более 500 успешных проектов с 2008 года. Смотрите примеры работ. ☎ +7 (863) 123-45-67',
      keywords: 'примеры работ стеклопакеты Ростов, портфолио остекление Ростов-на-Дону, фото работ стеклопакеты, проекты остекления жилых комплексов',
    });
  }, [setMeta]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.offsetWidth;
      const newSlide = Math.round(sliderRef.current.scrollLeft / slideWidth);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    }
  };

  return (
    <Layout withPadding>
      <div className={styles.cases}>
        <Breadcrumbs items={[{ label: 'Наши работы' }]} />

        {/* Заголовок */}
        <header className={styles.cases__header}>
          <h1 className={styles.cases__title}>Наши работы</h1>
          <p className={styles.cases__subtitle}>
            Фотографии выполненных проектов по остеклению в Ростове-на-Дону и Ростовской области. 
            За 16 лет работы мы реализовали более 500 проектов различной сложности.
          </p>
        </header>

        {/* Галерея работ - Десктоп */}
        {!isMobile && (
          <section className={styles.cases__gallery}>
            <div className={styles.cases__grid}>
              {ALL_CASES.map((project) => (
                <article key={project.id} className={styles.cases__card}>
                  <div className={styles.cases__cardImage}>
                    <img src={project.image} alt={`${project.title} — ${project.type}`} />
                    <div className={styles.cases__cardBadge}>{project.type}</div>
                  </div>
                  <div className={styles.cases__cardContent}>
                    <h2 className={styles.cases__cardTitle}>{project.title}</h2>
                    <p className={styles.cases__cardDescription}>{project.description}</p>
                    <div className={styles.cases__cardMeta}>
                      <span className={styles.cases__cardMetaItem}>
                        <MapPin size={14} />
                        {project.location}
                      </span>
                      <span className={styles.cases__cardMetaItem}>
                        <Ruler size={14} />
                        {project.area}
                      </span>
                      <span className={styles.cases__cardMetaItem}>
                        <Calendar size={14} />
                        {project.year}
                      </span>
                      <span className={styles.cases__cardMetaItem}>
                        <Building2 size={14} />
                        {project.type}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Галерея работ - Мобильный слайдер */}
        {isMobile && (
          <section className={styles.cases__sliderSection}>
            <div 
              className={styles.cases__slider} 
              ref={sliderRef}
              onScroll={handleScroll}
            >
              {ALL_CASES.map((project) => (
                <article key={project.id} className={styles.cases__slide}>
                  <div className={styles.cases__slideImage}>
                    <img src={project.image} alt={`${project.title} — ${project.type}`} />
                    <div className={styles.cases__cardBadge}>{project.type}</div>
                  </div>
                  <div className={styles.cases__slideContent}>
                    <h2 className={styles.cases__cardTitle}>{project.title}</h2>
                    <p className={styles.cases__cardDescription}>{project.description}</p>
                    <div className={styles.cases__cardMeta}>
                      <span className={styles.cases__cardMetaItem}>
                        <MapPin size={14} />
                        {project.location}
                      </span>
                      <span className={styles.cases__cardMetaItem}>
                        <Calendar size={14} />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {/* Индикаторы слайдера */}
            <div className={styles.cases__dots}>
              {ALL_CASES.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.cases__dot} ${index === currentSlide ? styles['cases__dot--active'] : ''}`}
                  onClick={() => handleSlideChange(index)}
                  aria-label={`Слайд ${index + 1}`}
                />
              ))}
            </div>
          </section>
        )}

      </div>

      <ContactForm />
    </Layout>
  );
};

export default CasesPage;