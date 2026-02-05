/**
 * Компонент Header — шапка сайта
 *
 * @description Главное меню навигации с логотипом, контактами и мобильным меню
 * Использует БЭМ-методологию для именования классов
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import styles from "./Header.module.css";

/**
 * Контактные данные компании
 * РЕАЛЬНЫЕ ДАННЫЕ — телефон будет обновлён клиентом
 */
const CONTACTS = {
  phone: "+7 (863) 123-45-67",
  phoneHref: "tel:+78631234567",
  address: "Ростов-на-Дону",
  workHours: "Пн-Сб: 8:00-18:00",
};

/**
 * Пункты главного меню
 */
const NAV_ITEMS = [
  { label: "Главная", href: "/" },
  {
    label: "Каталог",
    href: "/catalog",
    dropdown: [
      { label: "Однокамерные", href: "/catalog/odnokamernye" },
      { label: "Двухкамерные", href: "/catalog/dvuhkamernye" },
      { label: "Энергосберегающие", href: "/catalog/energosberegayushchie" },
      { label: "Шумоизоляционные", href: "/catalog/shumoizolyatsionnye" },
      { label: "Мультифункциональные", href: "/catalog/multifunktsionalnye" },
      { label: "Солнцезащитные", href: "/catalog/solntsezashchitnye" },
      { label: "Ударопрочные", href: "/catalog/udaroprochnye" },
      { label: "Тонированные", href: "/catalog/tonirovannye" },
      { label: "С закаленным стеклом", href: "/catalog/zakalennye" },
      { label: "С триплексом", href: "/catalog/tripleks" },
      { label: "С декоративной раскладкой", href: "/catalog/dekorativnye" },
      { label: "Теплосберегающие", href: "/catalog/teplosberegayushchie" },
      { label: "Зеркальные", href: "/catalog/zerkalnye" },
      { label: "Нестандартные", href: "/catalog/nestandartnye" },
      { label: "С газонаполнением", href: "/catalog/gazonapolnennye" },
    ],
  },
  { label: "Услуги", href: "/services" },
  { label: "О компании", href: "/about" },
  { label: "Наши работы", href: "/cases" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

interface HeaderProps {
  onOpenCallback?: () => void;
}

/**
 * Компонент Header
 */
const Header = ({ onOpenCallback }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  // Отслеживание скролла
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  }, [location.pathname]);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles["header--scrolled"] : ""}`}>
      {/* Верхняя полоса с контактами */}
      <div className={styles.header__topBar}>
        <div className={styles.header__topBarContainer}>
          <div className={styles.header__topBarAddress}>
            <MapPin size={14} />
            <span>{CONTACTS.address}</span>
          </div>
          <div className={styles.header__topBarContacts}>
            <div className={styles.header__topBarWorkHours}>
              <Clock size={14} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
              {CONTACTS.workHours}
            </div>
            <a href={CONTACTS.phoneHref} className={styles.header__topBarPhone}>
              <Phone size={14} />
              {CONTACTS.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <div className={styles.header__main}>
        <div className={styles.header__container}>
          {/* Логотип */}
          <div className={styles.header__logo}>
            <Link to="/" className={styles.header__logoLink}>
              <img src="/images/logo.png" alt="Стеклопром" className={styles.header__logoImage} />
            </Link>
          </div>

          {/* Десктопное меню */}
          <nav className={styles.header__nav}>
            <ul className={styles.header__menu}>
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  className={`${styles.header__menuItem} ${item.dropdown ? styles["header__menuItem--hasDropdown"] : ""}`}
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`${styles.header__menuLink} ${
                      isActiveLink(item.href) ? styles["header__menuLink--active"] : ""
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={16} className={styles.header__menuLinkIcon} />}
                  </Link>

                  {/* Выпадающее меню */}
                  {item.dropdown && (
                    <ul
                      className={`${styles.header__dropdown} ${openDropdown === item.href ? styles["header__dropdown--open"] : ""}`}
                    >
                      {item.dropdown.map((subItem) => (
                        <li key={subItem.href} className={styles.header__dropdownItem}>
                          <Link to={subItem.href} className={styles.header__dropdownLink}>
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакты */}
          <div className={styles.header__contacts}>
            <a href={CONTACTS.phoneHref} className={styles.header__phone}>
              <div className={styles.header__phoneIcon}>
                <Phone size={18} />
              </div>
              <span>{CONTACTS.phone}</span>
            </a>
            <button className={styles.header__callButton} onClick={onOpenCallback}>
              Заказать звонок
            </button>
          </div>

          {/* Телефон и кнопка мобильного меню */}
          <div className={styles.header__mobileControls}>
            <button
              className={`${styles.header__mobileMenuButton} ${
                isMobileMenuOpen ? styles["header__mobileMenuButton--open"] : ""
              }`}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={styles.header__mobileMenuIcon} />
              <span className={styles.header__mobileMenuIcon} />
              <span className={styles.header__mobileMenuIcon} />
            </button>
          </div>
        </div>

        {/* Мобильная панель */}
        <div className={`${styles.header__mobilePanel} ${isMobileMenuOpen ? styles["header__mobilePanel--open"] : ""}`}>
          <nav>
            <ul className={styles.header__mobileMenu}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={styles.header__mobileMenuItem}>
                  {item.dropdown ? (
                    <>
                      <button
                        className={`${styles.header__mobileMenuLink} ${styles["header__mobileMenuLink--hasDropdown"]}`}
                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.href ? null : item.href)}
                      >
                        {item.label}
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${mobileDropdownOpen === item.href ? "rotate-180" : ""}`}
                        />
                      </button>
                      {mobileDropdownOpen === item.href && (
                        <ul className={styles.header__mobileDropdown}>
                          <li>
                            <Link
                              to={item.href}
                              className={styles.header__mobileDropdownLink}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              Все {item.label.toLowerCase()}
                            </Link>
                          </li>
                          {item.dropdown.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                to={subItem.href}
                                className={styles.header__mobileDropdownLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`${styles.header__mobileMenuLink} ${
                        isActiveLink(item.href) ? styles["header__mobileMenuLink--active"] : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.header__mobileContacts}>
            <a href={CONTACTS.phoneHref} className={styles.header__mobilePhone}>
              <Phone size={20} />
              {CONTACTS.phone}
            </a>
            <button
              className={styles.header__mobileCallButton}
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCallback?.();
              }}
            >
              Заказать звонок
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
