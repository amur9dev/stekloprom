/**
 * Страница Blog — полезные статьи
 * 
 * @description Блог с полезными статьями о стеклопакетах
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { BLOG_ARTICLES, formatDate } from '@/data/blogArticles';
import styles from './Blog.module.css';

/**
 * Компонент BlogPage
 */
const BlogPage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setMeta({
      title: 'Блог о стеклопакетах — полезные статьи | Стеклопром Ростов-на-Дону',
      description: 'Полезные статьи о выборе стеклопакетов, энергосбережении, шумоизоляции окон. Советы экспертов компании Стеклопром. Читайте и делайте правильный выбор!',
      keywords: 'блог стеклопакеты, статьи о стеклопакетах, как выбрать стеклопакет, энергосберегающие окна статья, шумоизоляция окон советы',
    });
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div className={styles.blog}>
        <div className={styles.blog__container}>
          <Breadcrumbs items={[{ label: 'Блог' }]} />

          {/* Заголовок */}
          <header className={styles.blog__header}>
            <h1 className={styles.blog__title}>
              Полезные статьи о стеклопакетах
            </h1>
            <p className={styles.blog__subtitle}>
              Делимся экспертными знаниями о выборе, установке и эксплуатации стеклопакетов. 
              Помогаем сделать правильный выбор для вашего дома.
            </p>
          </header>

          {/* Сетка статей */}
          <div className={styles.blog__grid}>
            {BLOG_ARTICLES.map((article) => (
              <article key={article.id} className={styles.blog__card}>
                <div className={styles.blog__cardImageWrapper}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.blog__cardImage}
                    loading="lazy"
                  />
                  <span className={styles.blog__cardCategory}>
                    {article.category}
                  </span>
                </div>
                
                <div className={styles.blog__cardContent}>
                  <div className={styles.blog__cardMeta}>
                    <span className={styles.blog__cardMetaItem}>
                      <Calendar size={14} />
                      {formatDate(article.date)}
                    </span>
                    <span className={styles.blog__cardMetaItem}>
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>

                  <h2 className={styles.blog__cardTitle}>
                    {article.title}
                  </h2>

                  <p className={styles.blog__cardExcerpt}>
                    {article.excerpt}
                  </p>

                  <div className={styles.blog__cardFooter}>
                    <div className={styles.blog__cardAuthor}>
                      <User size={16} />
                      {article.author}
                    </div>
                    <Link 
                      to={`/blog/${article.id}`}
                      className={styles.blog__cardLink}
                    >
                      Читать
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <ContactForm />
    </Layout>
  );
};

export default BlogPage;
