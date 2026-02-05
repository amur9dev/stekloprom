/**
 * Страница Services — услуги компании
 * 
 * @description Полное описание услуг компании «Стеклопром»
 */

import { useEffect, useState } from 'react';
import { Factory, Truck, Shield, Ruler, Phone, Check, ArrowRight } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import Modal from '@/components/ui/Modal';
import CallbackForm from '@/components/ui/CallbackForm';
import styles from './Services.module.css';

/**
 * Основные услуги
 */
const MAIN_SERVICES = [
  {
    id: 'production',
    icon: Factory,
    title: 'Изготовление стеклопакетов',
    description: 'Производство стеклопакетов любой сложности. Однокамерные, двухкамерные, мультифункциональные, шумоизоляционные, энергосберегающие и другие виды.',
    features: [
      'Изготовление стандартных стеклопакетов за 1 час',
      'Нестандартные формы и размеры',
      'Индивидуальный подход к каждому заказу',
      'Качественные стёкла и комплектующие',
      'Проверка качества перед отгрузкой',
    ],
    price: 'от 1 200 ₽/м²',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
  },
  {
    id: 'delivery',
    icon: Truck,
    title: 'Доставка по Ростову-на-Дону',
    description: 'Быстрая доставка стеклопакетов по городу и области. Бережная транспортировка на специализированном транспорте.',
    features: [
      'Доставка по Ростову за 2 часа',
      'Доставка по области в день заказа',
      'Бережная транспортировка',
      'Специальная упаковка',
    ],
    price: 'от 500 ₽',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
  },
  {
    id: 'warranty',
    icon: Shield,
    title: 'Гарантия 5 лет',
    description: 'Официальная гарантия на все виды продукции. Вся продукция сертифицирована и соответствует ГОСТ.',
    features: [
      '5 лет гарантии на стеклопакеты',
      'Сертификаты качества',
      'Соответствие ГОСТ',
      'Проверка продукции перед отгрузкой',
    ],
    price: 'Бесплатно',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
  },
];

/**
 * Дополнительные услуги
 */
const ADDITIONAL_SERVICES = [
  {
    icon: Phone,
    title: 'Бесплатная консультация',
    description: 'Консультируем по телефону, отвечаем на вопросы мгновенно. Помогаем подобрать оптимальное решение.',
  },
  {
    icon: Ruler,
    title: 'Расчёт стоимости',
    description: 'Рассчитаем стоимость заказа по вашим размерам. Предоплата по договорённости.',
  },
  {
    icon: Factory,
    title: 'Срочное изготовление',
    description: 'Производство стандартных стеклопакетов за 1 час. Индивидуальные сроки для сложных заказов.',
  },
];

/**
 * Компонент ServicesPage
 */
const ServicesPage = () => {
  const { setMeta } = useSeoMeta();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Услуги — производство и доставка стеклопакетов в Ростове-на-Дону',
      description: 'Производство стеклопакетов за 1 час, доставка по Ростову-на-Дону за 2 часа. Бесплатный замер, монтаж, гарантия 5 лет. Цены от 1 200 ₽/м². Звоните: +7 (863) 123-45-67',
      keywords: 'услуги производство стеклопакетов Ростов, изготовление стеклопакетов на заказ, доставка стеклопакетов Ростов-на-Дону, замер окон бесплатно, монтаж стеклопакетов',
    });

    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Производство стеклопакетов',
      description: 'Изготовление стеклопакетов на заказ за 1 час в Ростове-на-Дону',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Стеклопром',
        telephone: '+7 (863) 123-45-67',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ростов-на-Дону',
          streetAddress: 'ул. Промышленная, 15',
        },
      },
      areaServed: {
        '@type': 'City',
        name: 'Ростов-на-Дону',
      },
      offers: {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '1200',
          priceCurrency: 'RUB',
          unitText: 'м²',
        },
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-service-schema', 'true');
    script.textContent = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[data-service-schema]');
      if (existing) existing.remove();
    };
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div className={styles.services}>
        <Breadcrumbs items={[{ label: 'Услуги' }]} />

        {/* Заголовок */}
        <header className={styles.services__header}>
          <h1 className={styles.services__title}>Наши услуги</h1>
          <p className={styles.services__subtitle}>
            Полный цикл услуг по изготовлению и доставке стеклопакетов в Ростове-на-Дону. 
            От замера до установки — работаем быстро, качественно и с гарантией.
          </p>
        </header>

        {/* Основные услуги */}
        <section className={styles.services__main}>
          {MAIN_SERVICES.map((service, idx) => (
            <article key={service.id} className={styles.services__card}>
              <div className={styles.services__cardImage}>
                <img src={service.image} alt={service.title} />
              </div>
              <div className={styles.services__cardContent}>
                <h2 className={styles.services__cardTitle}>{service.title}</h2>
                <p className={styles.services__cardDescription}>{service.description}</p>
                <ul className={styles.services__cardFeatures}>
                  {service.features.map((feature, i) => (
                    <li key={i} className={styles.services__cardFeature}>
                      <Check size={16} color="#00a3d5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className={styles.services__cardFooter}>
                  <span className={styles.services__cardPrice}>{service.price}</span>
                  <button 
                    className={styles.services__cardButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Заказать
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Дополнительные услуги */}
        <section className={styles.services__additional}>
          <h2 className={styles.services__additionalTitle}>Дополнительные услуги</h2>
          <div className={styles.services__additionalGrid}>
            {ADDITIONAL_SERVICES.map((service, index) => (
              <div key={index} className={styles.services__additionalCard}>
                <div className={styles.services__additionalIcon}>
                  <service.icon size={24} />
                </div>
                <h3 className={styles.services__additionalCardTitle}>{service.title}</h3>
                <p className={styles.services__additionalCardDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA блок */}
        <section className={styles.services__cta}>
          <h2 className={styles.services__ctaTitle}>Нужна консультация?</h2>
          <p className={styles.services__ctaText}>Позвоните нам или оставьте заявку — ответим на все вопросы</p>
          <a href="tel:+78631234567" className={styles.services__ctaButton}>
            <Phone size={20} />
            +7 (863) 123-45-67
          </a>
        </section>
      </div>

      <ContactForm />

      {/* Модальное окно заказа */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Заказать звонок">
        <CallbackForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </Layout>
  );
};

export default ServicesPage;