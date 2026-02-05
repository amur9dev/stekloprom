/**
 * API-сервис для работы с бэкендом
 * 
 * @description Централизованный модуль для API-запросов
 * 
 * ИНСТРУКЦИЯ ДЛЯ РАЗРАБОТЧИКА:
 * Замените BASE_URL на реальный адрес API при деплое
 */

const BASE_URL = '/api';

/**
 * Типы данных для API
 */
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
}

export interface CalculatorFormData {
  width: number;
  height: number;
  type: string;
  quantity: number;
  phone: string;
  name: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Базовый метод для API-запросов
 */
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ошибка сервера');
    }

    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Неизвестная ошибка',
    };
  }
};

/**
 * Отправка формы обратной связи
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<ApiResponse> => {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

/**
 * Отправка заявки на расчёт
 */
export const submitCalculatorForm = async (
  formData: CalculatorFormData
): Promise<ApiResponse> => {
  return apiRequest('/calculator', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

/**
 * Получение списка продуктов
 */
export const getProducts = async (): Promise<ApiResponse> => {
  return apiRequest('/products');
};

/**
 * Получение детальной информации о продукте
 */
export const getProductBySlug = async (slug: string): Promise<ApiResponse> => {
  return apiRequest(`/products/${slug}`);
};

export default {
  submitContactForm,
  submitCalculatorForm,
  getProducts,
  getProductBySlug,
};
