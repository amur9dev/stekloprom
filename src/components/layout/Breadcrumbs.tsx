/**
 * Компонент Breadcrumbs — хлебные крошки
 * 
 * @description Навигационная цепочка для улучшения UX и SEO
 * 
 * @example
 * <Breadcrumbs 
 *   items={[
 *     { label: 'Каталог', href: '/catalog' },
 *     { label: 'Двухкамерные стеклопакеты' }
 *   ]} 
 * />
 */

import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Добавляет JSON-LD разметку для хлебных крошек
 */
const addBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  const baseUrl = window.location.origin;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: baseUrl,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `${baseUrl}${item.href}` : undefined,
      })),
    ],
  };

  // Удаляем предыдущую разметку
  const existing = document.querySelector('script[data-breadcrumb-schema]');
  if (existing) {
    existing.remove();
  }

  // Добавляем новую
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-breadcrumb-schema', 'true');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Компонент Breadcrumbs
 */
const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  useEffect(() => {
    addBreadcrumbSchema(items);
    
    return () => {
      const script = document.querySelector('script[data-breadcrumb-schema]');
      if (script) {
        script.remove();
      }
    };
  }, [items]);

  return (
    <nav 
      aria-label="Хлебные крошки" 
      className="pt-2.5 pb-4"
    >
      <ol className="flex flex-wrap items-center gap-2 text-body-sm">
        {/* Главная */}
        <li className="flex items-center">
          <Link 
            to="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Главная</span>
          </Link>
        </li>

        {/* Остальные элементы */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            {item.href ? (
              <Link 
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
