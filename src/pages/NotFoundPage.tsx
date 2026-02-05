/**
 * Страница 404 — страница не найдена
 * 
 * @description Отображается при переходе на несуществующий URL
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Layout } from '@/components/layout';
import { useSeoMeta } from '@/hooks/useSeoMeta';

/**
 * Популярные страницы
 */
const POPULAR_PAGES = [
  { label: 'Каталог стеклопакетов', href: '/catalog' },
  { label: 'Услуги', href: '/services' },
  { label: 'О компании', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
];

/**
 * Компонент NotFoundPage
 */
const NotFoundPage = () => {
  const { setMeta } = useSeoMeta();

  useEffect(() => {
    setMeta({
      title: '404 — Страница не найдена',
      description: 'Запрашиваемая страница не найдена. Вернитесь на главную страницу сайта «Стеклопром» или выберите раздел из меню.',
    });
  }, [setMeta]);

  return (
    <Layout withPadding>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        {/* Код ошибки */}
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '160px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #E30613 0%, #003366 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          404
        </div>

        {/* Заголовок */}
        <h1 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '32px',
          fontWeight: 700,
          color: '#2D3748',
          margin: '0 0 16px 0',
        }}>
          Страница не найдена
        </h1>

        {/* Описание */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '18px',
          color: '#718096',
          lineHeight: 1.6,
          margin: '0 0 40px 0',
        }}>
          К сожалению, запрашиваемая страница не существует или была удалена.
          Возможно, вы перешли по устаревшей ссылке.
        </p>

        {/* Кнопки */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '64px',
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #E30613 0%, #C00000 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(227, 6, 19, 0.35)',
            }}
          >
            <Home size={20} />
            На главную
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 32px',
              background: 'transparent',
              color: '#003366',
              border: '2px solid rgba(0, 51, 102, 0.2)',
              borderRadius: '12px',
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={20} />
            Назад
          </button>
        </div>

        {/* Популярные страницы */}
        <div style={{
          background: '#F8F9FA',
          borderRadius: '20px',
          padding: '40px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <Search size={24} color="#003366" />
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '20px',
              fontWeight: 600,
              color: '#2D3748',
              margin: 0,
            }}>
              Возможно, вы искали
            </h2>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {POPULAR_PAGES.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                style={{
                  padding: '12px 24px',
                  background: '#ffffff',
                  color: '#003366',
                  border: '1px solid rgba(0, 51, 102, 0.1)',
                  borderRadius: '10px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
