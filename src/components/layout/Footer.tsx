/**
 * Компонент Footer — подвал сайта
 * 
 * @description Контактная информация, ссылки и копирайт
 * Использует БЭМ-методологию для именования классов
 * 
 * ИНСТРУКЦИЯ ДЛЯ КОНТЕНТ-МЕНЕДЖЕРА:
 * - Контакты: измените CONTACT_INFO
 * - Ссылки: измените FOOTER_LINKS
 * - Ссылка на ВКонтакте: измените SOCIAL_LINKS.vk
 */

import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import styles from './Footer.module.css';

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
  address: 'г. Ростов-на-Дону, ул. Промышленная, 15',
  workHours: 'Пн-Пт: 8:00-18:00, Сб: 9:00-15:00',
};

/**
 * Ссылки подвала
 */
const FOOTER_LINKS = {
  products: {
    title: 'Каталог',
    items: [
      { label: 'Однокамерные', href: '/catalog/odnokamernye' },
      { label: 'Двухкамерные', href: '/catalog/dvuhkamernye' },
      { label: 'Энергосберегающие', href: '/catalog/energosberegayushchie' },
      { label: 'Шумоизоляционные', href: '/catalog/shumoizolyatsionnye' },
      { label: 'Мультифункциональные', href: '/catalog/multifunktsionalnye' },
      { label: 'Солнцезащитные', href: '/catalog/solntsezashchitnye' },
      { label: 'Ударопрочные', href: '/catalog/udaroprochnye' },
      { label: 'Тонированные', href: '/catalog/tonirovannye' },
      { label: 'С закаленным стеклом', href: '/catalog/zakalennye' },
      { label: 'С триплексом', href: '/catalog/tripleks' },
      { label: 'Теплосберегающие', href: '/catalog/teplosberegayushchie' },
      { label: 'Зеркальные', href: '/catalog/zerkalnye' },
      { label: 'Нестандартные', href: '/catalog/nestandartnye' },
      { label: 'С газонаполнением', href: '/catalog/gazonapolnennye' },
    ],
  },
  company: {
    title: 'Компания',
    items: [
      { label: 'О компании', href: '/about' },
      { label: 'Наши работы', href: '/cases' },
      { label: 'Блог', href: '/blog' },
      { label: 'Услуги', href: '/services' },
      { label: 'Контакты', href: '/contacts' },
    ],
  },
};

/**
 * Компонент Footer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Основной контент */}
      <div className={styles.footer__main}>
        <div className={styles.footer__container}>
          <div className={styles.footer__grid}>
            {/* Колонка с логотипом и контактами */}
            <div className={styles.footer__brand}>
              <Link to="/" className={styles.footer__logo}>
                <img 
                  src="/images/logo_footer.png" 
                  alt="Стеклопром" 
                  className={styles.footer__logoImage}
                />
                <span className={styles.footer__logoText}>СТЕКЛОПРОМ</span>
              </Link>
              
              <p className={styles.footer__description}>
                Производство качественных стеклопакетов в Ростове-на-Дону с 2008 года. 
                Современное оборудование, опытная команда и гарантия 5 лет.
              </p>

              <ul className={styles.footer__contacts}>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Phone size={16} />
                  </div>
                  <a href={CONTACT_INFO.phoneHref} className={styles.footer__contactLink}>
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className={styles.footer__contactLink}>
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <MapPin size={16} />
                  </div>
                  <span className={styles.footer__contactText}>
                    {CONTACT_INFO.address}
                  </span>
                </li>
                <li className={styles.footer__contactItem}>
                  <div className={styles.footer__contactIcon}>
                    <Clock size={16} />
                  </div>
                  <span className={styles.footer__contactText}>
                    {CONTACT_INFO.workHours}
                  </span>
                </li>
              </ul>
              
              {/* Социальные сети */}
              <div className={styles.footer__social}>
                <a 
                  href={SOCIAL_LINKS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.footer__socialLink}
                  aria-label="ВКонтакте"
                >
                  <VKIcon size={20} />
                </a>
              </div>
            </div>

            {/* Колонка продуктов */}
            <nav className={styles.footer__nav}>
              <h3 className={styles.footer__navTitle}>{FOOTER_LINKS.products.title}</h3>
              <ul className={styles.footer__navList}>
                {FOOTER_LINKS.products.items.map((link) => (
                  <li key={link.href} className={styles.footer__navItem}>
                    <Link to={link.href} className={styles.footer__navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Колонка компании */}
            <nav className={styles.footer__nav}>
              <h3 className={styles.footer__navTitle}>{FOOTER_LINKS.company.title}</h3>
              <ul className={styles.footer__navList}>
                {FOOTER_LINKS.company.items.map((link) => (
                  <li key={link.href} className={styles.footer__navItem}>
                    <Link to={link.href} className={styles.footer__navLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className={styles.footer__bottom}>
        <div className={styles.footer__bottomContainer}>
          <p className={styles.footer__copyright}>
            © {currentYear} Стеклопром. Все права защищены.
          </p>
          <div className={styles.footer__legal}>
            <Link to="/privacy" className={styles.footer__legalLink}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
