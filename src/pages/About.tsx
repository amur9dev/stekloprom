/**
 * Страница About — о компании
 * 
 * @description Информация о компании «Стеклопром»
 */

import { useEffect } from 'react';
import { Award, Users, Factory, Calendar, MapPin, CheckCircle, Shield, Truck, Zap, Settings } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import styles from './About.module.css';

/**
 * Статистика компании — реальные данные
 */
const STATS = [
  { icon: Calendar, value: 'с 2008', label: 'года работаем' },
  { icon: Factory, value: '30', label: 'специалистов' },
  { icon: Users, value: '1 час', label: 'изготовление' },
  { icon: Award, value: '5 лет', label: 'гарантии' },
];

/**
 * Преимущества — реальные факты
 */
const ADVANTAGES = [
  'Высокое качество стекла и комплектующих',
  'Изготовление стандартных стеклопакетов за 1 час',
  'Собственное производство в Ростове-на-Дону',
  'Индивидуальный подход к каждому заказу',
  'Команда из 30 профессионалов',
  'Проекты любой сложности',
  'Доставка по Ростову за 2 часа',
  'Гарантия 5 лет на продукцию',
];

/**
 * Особенности производства
 */
const PRODUCTION_FEATURES = [
  {
    icon: Settings,
    title: 'Современное оборудование',
    description: 'Автоматизированные линии резки стекла обеспечивают точность до 0.1 мм.'
  },
  {
    icon: Shield,
    title: 'Контроль качества',
    description: 'Каждый стеклопакет проходит многоэтапную проверку перед отгрузкой.'
  },
  {
    icon: Zap,
    title: 'Высокая производительность',
    description: 'Более 500 стеклопакетов в сутки. Стандартные заказы за 1 час.'
  },
  {
    icon: Truck,
    title: 'Быстрая логистика',
    description: 'Собственный автопарк для безопасной транспортировки. Доставка за 2 часа.'
  },
];

/**
 * Компонент AboutPage
 */
const AboutPage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'О компании — производитель стеклопакетов с 2008 года',
      description: 'Компания «Стеклопром» — производитель стеклопакетов в Ростове-на-Дону с 2008 года. 30 профессионалов, 50 000+ стеклопакетов в год. Гарантия 5 лет. ☎ +7 (863) 123-45-67',
      keywords: 'о компании Стеклопром Ростов, производитель стеклопакетов Ростов-на-Дону, история компании Стеклопром, производство стеклопакетов',
    });
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div className={styles.about__container}>
        <Breadcrumbs items={[{ label: 'О компании' }]} />

        {/* Заголовок */}
        <header className={styles.about__header}>
          <h1 className={styles.about__title}>
            О компании «Стеклопром»
          </h1>
          <p className={styles.about__subtitle}>
            Компания «Стеклопром» (ИП) работает на рынке Ростова-на-Дону с 2008 года. 
            Наша команда из 30 профессионалов ежедневно создаёт качественные стеклопакеты. 
            Собственное производство, офис и склад позволяют контролировать весь процесс — 
            от изготовления до доставки.
          </p>
        </header>

        {/* Статистика */}
        <section className={styles.about__stats}>
          {STATS.map((stat, index) => (
            <div key={index} className={styles.about__stat}>
              <div className={styles.about__statIcon}>
                <stat.icon size={22} />
              </div>
              <div className={styles.about__statValue}>{stat.value}</div>
              <div className={styles.about__statLabel}>{stat.label}</div>
            </div>
          ))}
        </section>

        {/* О нас */}
        <section className={styles.about__twoColumn}>
          <div>
            <h2 className={styles.about__sectionTitle}>Наше производство</h2>
            <div className={styles.about__text}>
              <p>
                Компания «Стеклопром» имеет собственное производство, офис и склад 
                в Ростове-на-Дону. Это позволяет нам контролировать весь процесс — 
                от изготовления до доставки готовой продукции.
              </p>
              <p>
                Мы используем качественные стёкла и комплектующие для изготовления 
                стеклопакетов. Вся продукция сертифицирована и соответствует ГОСТ.
              </p>
              <p>
                Каждый стеклопакет проходит проверку качества перед отгрузкой: 
                контроль размеров, визуальный осмотр, проверка герметичности.
              </p>
            </div>
          </div>
          <div>
            <h2 className={styles.about__sectionTitle}>Наши преимущества</h2>
            <ul className={styles.about__advantages}>
              {ADVANTAGES.map((advantage, index) => (
                <li key={index} className={styles.about__advantage}>
                  <CheckCircle size={18} color="#ff342f" />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Блок производства */}
        <section className={styles.about__production} id="production">
          <h2 className={styles.about__productionTitle}>
            Производство стеклопакетов в Ростове-на-Дону
          </h2>
          <p className={styles.about__productionSubtitle}>
            Наш производственный комплекс оснащён современным оборудованием для изготовления 
            стеклопакетов любой сложности.
          </p>
          
          <div className={styles.about__productionGrid}>
            {PRODUCTION_FEATURES.map((feature, index) => (
              <div key={index} className={styles.about__productionCard}>
                <div className={styles.about__productionCardIcon}>
                  <feature.icon size={18} />
                </div>
                <div className={styles.about__productionCardContent}>
                  <h3 className={styles.about__productionCardTitle}>
                    {feature.title}
                  </h3>
                  <p className={styles.about__productionCardDesc}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.about__productionLocation}>
            <MapPin size={20} color="#ff342f" />
            г. Ростов-на-Дону
          </div>
          <p className={styles.about__productionNote}>
            Собственное производство, офис и склад. Звоните для консультации!
          </p>
        </section>

        {/* Сертификаты */}
        <section className={styles.about__certificates} id="certificates">
          <h2 className={styles.about__certificatesTitle}>Качество и гарантия</h2>
          <div className={styles.about__certificatesGrid}>
            {/* Сертификат-заглушка */}
            <div className={styles.about__certificate}>
              <div className={styles.about__certificatePlaceholder}>
                <Award size={48} color="#00a3d5" style={{ opacity: 0.5 }} />
                <p className={styles.about__certificatePlaceholderText}>
                  Сертификат соответствия
                </p>
              </div>
              <h3 className={styles.about__certificateTitle}>Сертификат ГОСТ</h3>
              <p className={styles.about__certificateDesc}>
                Сертификат предоставляется по запросу
              </p>
            </div>

            {/* Текстовый блок */}
            <div className={styles.about__guarantee}>
              <Award size={40} className={styles.about__guaranteeIcon} />
              <h3 className={styles.about__guaranteeTitle}>Гарантия 5 лет</h3>
              <p className={styles.about__guaranteeText}>
                Вся продукция сертифицирована и соответствует ГОСТ. 
                Мы даём официальную гарантию 5 лет на все стеклопакеты.
              </p>
              <ul className={styles.about__guaranteeList}>
                {['Сертификаты ГОСТ', 'Гарантийное обслуживание', 'Контроль качества'].map((item, i) => (
                  <li key={i} className={styles.about__guaranteeItem}>
                    <CheckCircle size={14} color="#ff342f" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <ContactForm />
    </Layout>
  );
};

export default AboutPage;
