/**
 * Страница статьи блога
 * 
 * @description Детальная страница статьи с SEO-оптимизацией
 */

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Layout, Breadcrumbs } from '@/components/layout';
import { ContactForm } from '@/components/sections';
import { useSeoMeta } from '@/hooks/useSeoMeta';
import { BLOG_ARTICLES, getArticleById, getRelatedArticles, formatDate } from '@/data/blogArticles';
import styles from './BlogArticle.module.css';

/**
 * Компонент страницы статьи
 */
const BlogArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { setMeta } = useSeoMeta();
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const article = articleId ? getArticleById(articleId) : undefined;
  const relatedArticles = articleId ? getRelatedArticles(articleId, 3) : [];

  useEffect(() => {
    window.scrollTo(0, 0);

    if (article) {
      setMeta({
        title: `${article.title} | Блог Стеклопром Ростов-на-Дону`,
        description: article.excerpt,
        keywords: `${article.category}, стеклопакеты, ${article.title.toLowerCase()}`,
      });

      // Добавляем структурированные данные Article
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: article.image,
        author: {
          '@type': 'Person',
          name: article.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Стеклопром',
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/favicon.ico`,
          },
        },
        datePublished: article.date,
        dateModified: article.date,
      };

      const existingSchema = document.querySelector('script[data-article-schema]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-article-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);

      return () => {
        const schemaScript = document.querySelector('script[data-article-schema]');
        if (schemaScript) {
          schemaScript.remove();
        }
      };
    }
  }, [article, setMeta]);

  // Если статья не найдена
  if (!article) {
    return (
      <Layout withPadding>
        <div className={styles.article}>
          <div className={styles.article__container}>
            <Breadcrumbs 
              items={[
                { label: 'Блог', href: '/blog' },
                { label: 'Статья не найдена' },
              ]} 
            />
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <h1 style={{ fontSize: '32px', color: '#00407e', marginBottom: '16px' }}>
                Статья не найдена
              </h1>
              <p style={{ color: '#718096', marginBottom: '32px' }}>
                К сожалению, запрашиваемая статья не существует или была удалена.
              </p>
              <Link 
                to="/blog" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#00a3d5',
                  fontWeight: 600,
                }}
              >
                <ArrowLeft size={18} />
                Вернуться в блог
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout withPadding>
      <article className={styles.article}>
        <div className={styles.article__container}>
          <Breadcrumbs 
            items={[
              { label: 'Блог', href: '/blog' },
              { label: article.title },
            ]} 
          />

          {/* Заголовок статьи */}
          <header className={styles.article__header}>
            <span className={styles.article__category}>
              {article.category}
            </span>
            <h1 className={styles.article__title}>
              {article.title}
            </h1>
            <div className={styles.article__meta}>
              <span className={styles.article__metaItem}>
                <Calendar size={16} />
                {formatDate(article.date)}
              </span>
              <span className={styles.article__metaItem}>
                <Clock size={16} />
                {article.readTime}
              </span>
              <span className={styles.article__metaItem}>
                <User size={16} />
                {article.author}
              </span>
            </div>
          </header>

          {/* Изображение статьи */}
          <img
            src={article.image}
            alt={article.title}
            className={styles.article__image}
          />

          {/* Контент статьи */}
          <div 
            className={styles.article__content}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA блок */}
          <div className={styles.article__cta}>
            <h3 className={styles.article__ctaTitle}>
              Нужна консультация по стеклопакетам?
            </h3>
            <p className={styles.article__ctaText}>
              Оставьте заявку и получите бесплатный расчёт стоимости за 30 минут
            </p>
            <Link to="/contacts" className={styles.article__ctaButton}>
              Заказать расчёт
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Блок "Читайте также" */}
          {relatedArticles.length > 0 && (
            <section className={styles.related}>
              <h2 className={styles.related__title}>
                Читайте также
              </h2>
              <div className={styles.related__grid}>
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/blog/${relatedArticle.id}`}
                    className={styles.related__card}
                  >
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className={styles.related__cardImage}
                      loading="lazy"
                    />
                    <div className={styles.related__cardContent}>
                      <h3 className={styles.related__cardTitle}>
                        {relatedArticle.title}
                      </h3>
                      <span className={styles.related__cardMeta}>
                        {formatDate(relatedArticle.date)} · {relatedArticle.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <ContactForm />
    </Layout>
  );
};

export default BlogArticlePage;
