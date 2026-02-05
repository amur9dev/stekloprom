/**
 * Утилиты для валидации форм
 * 
 * @description Функции валидации для форм обратной связи и заказа
 */

/**
 * Регулярные выражения для валидации
 */
const PATTERNS = {
  phone: /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[а-яёА-ЯЁa-zA-Z\s-]{2,50}$/,
};

/**
 * Сообщения об ошибках
 */
export const ERROR_MESSAGES = {
  required: 'Обязательное поле',
  phone: 'Введите корректный номер телефона',
  email: 'Введите корректный email',
  name: 'Введите корректное имя (2-50 символов)',
  minLength: (min: number) => `Минимум ${min} символов`,
  maxLength: (max: number) => `Максимум ${max} символов`,
};

/**
 * Валидирует номер телефона
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return ERROR_MESSAGES.required;
  }
  
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  if (!PATTERNS.phone.test(phone) && !/^(\+7|8)\d{10}$/.test(cleanPhone)) {
    return ERROR_MESSAGES.phone;
  }
  
  return null;
};

/**
 * Валидирует email
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return null; // Email не обязателен
  }
  
  if (!PATTERNS.email.test(email)) {
    return ERROR_MESSAGES.email;
  }
  
  return null;
};

/**
 * Валидирует имя
 */
export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return ERROR_MESSAGES.required;
  }
  
  if (name.length < 2) {
    return ERROR_MESSAGES.minLength(2);
  }
  
  if (name.length > 50) {
    return ERROR_MESSAGES.maxLength(50);
  }
  
  return null;
};

/**
 * Валидирует сообщение
 */
export const validateMessage = (message: string): string | null => {
  if (!message.trim()) {
    return null; // Сообщение не обязательно
  }
  
  if (message.length < 10) {
    return ERROR_MESSAGES.minLength(10);
  }
  
  if (message.length > 1000) {
    return ERROR_MESSAGES.maxLength(1000);
  }
  
  return null;
};

/**
 * Форматирует номер телефона для отображения
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    const match = cleaned.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/);
    if (match) {
      return `+7 (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
    }
  }
  
  return phone;
};

/**
 * Форматирует номер телефона для href="tel:"
 */
export const formatPhoneHref = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  return `+${cleaned}`;
};
