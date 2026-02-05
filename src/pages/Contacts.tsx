/**
 * Страница Contacts — контакты
 * 
 * @description Контактная информация компании «Стеклопром»
 * 
 * ИНСТРУКЦИЯ: Для изменения ссылки на ВКонтакте — измените SOCIAL_LINKS.vk
 */

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { formatPhone, handlePhoneKeyDown } from '@/utils/phoneFormat';
import styles from './Contacts.module.css';

/**
 * Иконка ВКонтакте (SVG)
 */
const VKIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.713-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.048-2.763-5.339-2.763-5.81 0-.254.102-.488.593-.488h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.661V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.17-3.62 2.17-3.62.119-.254.322-.488.763-.488h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.716-.576.716z"/>
  </svg>
);

/**
 * Социальные сети
 * 
 * ИНСТРУКЦИЯ: Замените ссылку на вашу группу ВКонтакте
 */
const SOCIAL_LINKS = {
  vk: 'https://vk.com/stekloprom_rostov', // <-- Замените на вашу ссылку ВКонтакте
};

/**
 * Контактная информация
 */
const CONTACT_INFO = {
  phone: '+7 (863) 123-45-67',
  phoneHref: 'tel:+78631234567',
  email: 'info@stekloprom-rostov.ru',
  address: 'г. Ростов-на-Дону',
  workHours: {
    weekdays: 'Понедельник — Пятница: 8:00 — 18:00',
    saturday: 'Суббота: 8:00 — 18:00',
    sunday: 'Воскресенье: выходной',
  },
};

/**
 * Компонент ContactsPage
 */
const ContactsPage = () => {
  const { setMeta } = useSeoMeta();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Контакты Стеклопром — адрес, телефон, режим работы в Ростове-на-Дону',
      description: 'Контакты компании «Стеклопром» в Ростове-на-Дону. Адрес производства: ул. Промышленная, 15. Телефон: +7 (863) 123-45-67. Режим работы: Пн-Пт 8:00-18:00, Сб 9:00-15:00. Приезжайте на экскурсию!',
      keywords: 'контакты Стеклопром Ростов, адрес производства стеклопакетов, телефон стеклопакеты Ростов-на-Дону, как добраться Стеклопром',
    });

    const contactSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Стеклопром',
      description: 'Производство стеклопакетов в Ростове-на-Дону',
      telephone: '+7 (863) 123-45-67',
      email: 'info@stekloprom-rostov.ru',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Промышленная, 15',
        addressLocality: 'Ростов-на-Дону',
        addressRegion: 'Ростовская область',
        postalCode: '344000',
        addressCountry: 'RU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.2357,
        longitude: 39.7015,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '15:00',
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-contact-schema', 'true');
    script.textContent = JSON.stringify(contactSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[data-contact-schema]');
      if (existing) existing.remove();
    };
  }, [setMeta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      setFormData({
        ...formData,
        phone: formatPhone(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhoneKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, formData.phone, (value) => {
      setFormData((prev) => ({ ...prev, phone: value }));
    });
  };

  return (
    <Layout withPadding>
      <div className={styles.contacts}>
        <Breadcrumbs items={[{ label: 'Контакты' }]} />

        {/* Заголовок */}
        <header className={styles.contacts__header}>
          <h1 className={styles.contacts__title}>Контакты</h1>
          <p className={styles.contacts__subtitle}>
            Свяжитесь с нами любым удобным способом. Мы всегда рады ответить 
            на ваши вопросы и помочь с выбором стеклопакетов.
          </p>
        </header>

        {/* Основной контент */}
        <div className={styles.contacts__content}>
          {/* Форма обратной связи - первая на мобильных */}
          <div className={styles.contacts__form}>
            <h2 className={styles.contacts__formTitle}>Написать нам</h2>
            <p className={styles.contacts__formSubtitle}>
              Заполните форму и мы свяжемся с вами
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.contacts__formGroup}>
                <label htmlFor="name" className={styles.contacts__formLabel}>
                  Ваше имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  required
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="phone" className={styles.contacts__formLabel}>
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDownWrapper}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="email" className={styles.contacts__formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={styles.contacts__formInput}
                />
              </div>

              <div className={styles.contacts__formGroup}>
                <label htmlFor="message" className={styles.contacts__formLabel}>
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Ваш вопрос или комментарий..."
                  rows={4}
                  className={styles.contacts__formTextarea}
                />
              </div>

              <button type="submit" className={styles.contacts__formButton}>
                <Send size={20} />
                Отправить сообщение
              </button>
            </form>
          </div>

          {/* Контактная информация */}
          <div className={styles.contacts__info}>
            {/* Телефон */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIcon}>
                <Phone size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Телефон</h3>
                <a href={CONTACT_INFO.phoneHref} className={styles.contacts__infoLink}>
                  {CONTACT_INFO.phone}
                </a>
                <p className={styles.contacts__infoNote}>Звоните, мы на связи!</p>
              </div>
            </div>

            {/* Email — цвета Яндекс.Почты */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconEmail}>
                <Mail size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Email</h3>
                <a href={`mailto:${CONTACT_INFO.email}`} className={styles.contacts__infoLinkSecondary}>
                  {CONTACT_INFO.email}
                </a>
                <p className={styles.contacts__infoNote}>Ответим быстро и оперативно</p>
              </div>
            </div>

            {/* Адрес — цвета Яндекс.Карт */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconAddress}>
                <MapPin size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Адрес</h3>
                <p className={styles.contacts__infoText}>{CONTACT_INFO.address}</p>
                <p className={styles.contacts__infoNote}>Производство и офис</p>
              </div>
            </div>

            {/* Режим работы — стилистика сайта */}
            <div className={styles.contacts__infoCard}>
              <div className={styles.contacts__infoIconSchedule}>
                <Clock size={24} />
              </div>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>Режим работы</h3>
                <ul className={styles.contacts__workHours}>
                  <li>{CONTACT_INFO.workHours.weekdays}</li>
                  <li>{CONTACT_INFO.workHours.saturday}</li>
                  <li className={styles.contacts__workHoursOff}>{CONTACT_INFO.workHours.sunday}</li>
                </ul>
              </div>
            </div>

            {/* ВКонтакте */}
            <div className={styles.contacts__infoCard}>
              <a 
                href={SOCIAL_LINKS.vk}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contacts__socialLink}
                aria-label="ВКонтакте"
              >
                <VKIcon size={24} />
              </a>
              <div className={styles.contacts__infoContent}>
                <h3 className={styles.contacts__infoTitle}>ВКонтакте</h3>
                <a 
                  href={SOCIAL_LINKS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contacts__infoLinkSecondary}
                >
                  Наша группа в VK
                </a>
                <p className={styles.contacts__infoNote}>Следите за новостями</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactsPage;