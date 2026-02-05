/**
 * Секция ContactForm — форма обратной связи
 * 
 * @description Форма заявки на синем фоне
 */

import { useState } from 'react';
import { Phone, Clock, Gift, ArrowRight, Check, Loader2 } from 'lucide-react';
import { formatPhone, isValidPhone, handlePhoneKeyDown } from '@/utils/phoneFormat';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import styles from './ContactForm.module.css';

/**
 * Преимущества формы
 */
const BENEFITS = [
  {
    icon: Phone,
    text: 'Перезвоним оперативно',
  },
  {
    icon: Clock,
    text: 'Бесплатный расчёт стоимости',
  },
  {
    icon: Gift,
    text: 'Скидка 10% на первый заказ',
  },
];

/**
 * Компонент ContactForm
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !isValidPhone(formData.phone)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone,
          source: 'Форма обратной связи (главная)'
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      setTimeout(() => {
        setFormData({ name: '', phone: '' });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позвонить нам.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, formData.phone, (value) => {
      setFormData((prev) => ({ ...prev, phone: value }));
    });
  };

  return (
    <section className={styles.contactform}>
      <div className={styles.contactform__container}>
        <div className={styles.contactform__wrapper}>
          {/* Левая часть — текст */}
          <div className={styles.contactform__content}>
            <h2 className={styles.contactform__title}>
              Закажите бесплатный расчёт
            </h2>
            <p className={styles.contactform__subtitle}>
              Оставьте заявку и получите точный расчёт стоимости стеклопакетов 
              для вашего проекта в Ростове-на-Дону
            </p>

            <ul className={styles.contactform__benefits}>
              {BENEFITS.map((benefit, index) => (
                <li key={index} className={styles.contactform__benefit}>
                  <div className={styles.contactform__benefitIcon}>
                    <benefit.icon size={22} />
                  </div>
                  <span className={styles.contactform__benefitText}>
                    {benefit.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Правая часть — форма */}
          {isSubmitted ? (
            <div className={styles.contactform__form} style={{ textAlign: 'center', padding: '60px 40px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 24px rgba(56, 161, 105, 0.3)',
              }}>
                <Check size={40} color="#ffffff" />
              </div>
              <h3 className={styles.contactform__formTitle} style={{ color: '#38A169' }}>
                Заявка отправлена!
              </h3>
              <p className={styles.contactform__formSubtitle}>
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <form className={styles.contactform__form} onSubmit={handleSubmit}>
              <h3 className={styles.contactform__formTitle}>
                Получите расчёт быстро
              </h3>
              <p className={styles.contactform__formSubtitle}>
                Заполните форму и мы перезвоним вам
              </p>

              <div className={styles.contactform__formGroup}>
                <label htmlFor="contact-name" className={styles.contactform__formLabel}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className={styles.contactform__formInput}
                  required
                />
              </div>

              <div className={styles.contactform__formGroup}>
                <label htmlFor="contact-phone" className={styles.contactform__formLabel}>
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onKeyDown={handlePhoneKeyDownWrapper}
                  placeholder="+7 (___) ___-__-__"
                  className={styles.contactform__formInput}
                  required
                />
              </div>

              <button 
                type="submit" 
                className={styles.contactform__formButton}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Отправка...</span>
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span>Получить расчёт</span>
                    <ArrowRight size={20} />
                  </span>
                )}
              </button>

              <p className={styles.contactform__formNote}>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="/privacy" className={styles.contactform__formNoteLink}>
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
