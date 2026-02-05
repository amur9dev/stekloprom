/**
 * Утилиты для SEO-оптимизации
 * 
 * @description Генерация структурированных данных (JSON-LD) для поисковых систем
 */

/**
 * Данные организации для Schema.org
 */
export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  sameAs?: string[];
}

/**
 * Базовые данные организации «Стеклопром»
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * Обновите эти данные при изменении контактной информации
 */
export const COMPANY_DATA: OrganizationSchema = {
  name: 'Стеклопром',
  description: 'Производство и установка стеклопакетов в Ростове-на-Дону',
  url: 'https://stekloprom-rostov.ru',
  logo: 'https://stekloprom-rostov.ru/logo.svg',
  telephone: '+7 (863) 123-45-67',
  email: 'info@stekloprom-rostov.ru',
  address: {
    streetAddress: 'ул. Промышленная, 15',
    addressLocality: 'Ростов-на-Дону',
    addressRegion: 'Ростовская область',
    postalCode: '344000',
    addressCountry: 'RU',
  },
  geo: {
    latitude: 47.2357,
    longitude: 39.7015,
  },
  openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-15:00'],
  sameAs: [],
};

/**
 * Генерирует JSON-LD разметку для организации
 */
export const generateOrganizationSchema = (data: OrganizationSchema = COMPANY_DATA): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': data.url,
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    telephone: data.telephone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address.streetAddress,
      addressLocality: data.address.addressLocality,
      addressRegion: data.address.addressRegion,
      postalCode: data.address.postalCode,
      addressCountry: data.address.addressCountry,
    },
    geo: data.geo ? {
      '@type': 'GeoCoordinates',
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    } : undefined,
    openingHoursSpecification: data.openingHours?.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1],
    })),
    sameAs: data.sameAs,
  };

  return JSON.stringify(schema);
};

/**
 * Генерирует JSON-LD разметку для хлебных крошек
 */
export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(schema);
};

/**
 * Генерирует JSON-LD разметку для продукта
 */
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  sku?: string;
  brand?: string;
  offers?: {
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  };
}): string => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    offers: product.offers ? {
      '@type': 'Offer',
      price: product.offers.price,
      priceCurrency: product.offers.priceCurrency,
      availability: `https://schema.org/${product.offers.availability}`,
    } : undefined,
  };

  return JSON.stringify(schema);
};
