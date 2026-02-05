/**
 * Страница Home — главная страница
 * 
 * @description Главная страница сайта «Стеклопром»
 */

import { useEffect } from 'react';
import { Layout } from '@/components/layout';
import { 
  HeroSection, 
  PopularSolutions, 
  WhyUs,
  HowWeWork,
  ForWhom,
  CasesGallery,
  ContactForm,
} from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { generateOrganizationSchema, COMPANY_DATA } from '@/utils/seo';

/**
 * Компонент HomePage
 */
const HomePage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    // Устанавливаем мета-теги — главная страница без префикса в title
    setMeta({
      title: '',
      description: 'Производство стеклопакетов в Ростове-на-Дону от производителя. Изготовление за 1 час, доставка за 2 часа. Гарантия 5 лет. Цены от 1 200 ₽/м². Энергосберегающие, шумоизоляционные, мультифункциональные. Звоните: +7 (863) 123-45-67',
      keywords: 'стеклопакеты Ростов-на-Дону, производство стеклопакетов Ростов, купить стеклопакеты, энергосберегающие стеклопакеты Ростов, шумоизоляционные стеклопакеты, цена стеклопакетов Ростов-на-Дону, стеклопакеты от производителя',
    });

    // Добавляем структурированные данные организации
    const existingOrg = document.querySelector('script[data-organization-schema]');
    if (existingOrg) existingOrg.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-organization-schema', 'true');
    script.textContent = generateOrganizationSchema(COMPANY_DATA);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[data-organization-schema]');
      if (existing) {
        existing.remove();
      }
    };
  }, [setMeta]);

  return (
    <Layout>
      <HeroSection />
      <PopularSolutions />
      <HowWeWork />
      <WhyUs />
      <ForWhom />
      <CasesGallery />
      <ContactForm />
    </Layout>
  );
};

export default HomePage;
