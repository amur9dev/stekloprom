/**
 * Хук для управления SEO мета-тегами
 * 
 * @description Динамически устанавливает title, description и Open Graph теги
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * const { setMeta } = useSeoMeta();
 * setMeta({
 *   title: 'Заголовок страницы',
 *   description: 'Описание страницы',
 *   keywords: 'ключевые, слова'
 * });
 */

import { useEffect, useCallback } from 'react';

interface SeoMetaProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
}

/**
 * Базовые SEO-данные компании
 */
const BASE_SEO = {
  siteName: 'Стеклопром',
  baseTitle: 'Стеклопром — Производство стеклопакетов в Ростове-на-Дону',
  baseDescription: 'Производство и установка стеклопакетов в Ростове-на-Дону. Энергосберегающие, шумоизоляционные и мультифункциональные стеклопакеты. Гарантия качества 5 лет.',
  baseKeywords: 'стеклопакеты, производство стеклопакетов, Ростов-на-Дону, окна ПВХ, энергосберегающие стеклопакеты',
};

/**
 * Обновляет или создаёт мета-тег
 */
const updateMetaTag = (name: string, content: string, property = false) => {
  const attr = property ? 'property' : 'name';
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

/**
 * Хук для управления SEO мета-тегами страницы
 */
export const useSeoMeta = () => {
  const setMeta = useCallback(({
    title,
    description,
    keywords = BASE_SEO.baseKeywords,
    ogImage = '/og-image.jpg',
    ogType = 'website',
    canonicalUrl,
  }: SeoMetaProps) => {
    // Формируем полный заголовок
    const fullTitle = title 
      ? `${title} | ${BASE_SEO.siteName}` 
      : BASE_SEO.baseTitle;

    // Устанавливаем title
    document.title = fullTitle;

    // Основные мета-теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph теги
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', BASE_SEO.siteName, true);
    updateMetaTag('og:locale', 'ru_RU', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, []);

  return { setMeta, BASE_SEO };
};

export default useSeoMeta;
