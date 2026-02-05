/**
 * CallbackForm — форма заявки на звонок
 * 
 * @description Форма с валидацией и маской телефона
 */

import { useState, useRef } from 'react';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { formatPhone, isValidPhone, handlePhoneKeyDown } from '@/utils/phoneFormat';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CallbackFormProps {
  onSuccess?: () => void;
  buttonText?: string;
}

const CallbackForm = ({ onSuccess, buttonText = 'Отправить заявку' }: CallbackFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    agreement: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Введите полный номер телефона';
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name.trim(),
          phone: formData.phone,
          source: 'Модальное окно (заказать звонок)'
        }
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      onSuccess?.();

      // Сброс через 5 секунд
      setTimeout(() => {
        setFormData({ name: '', phone: '', agreement: false });
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handlePhoneKeyDownWrapper = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handlePhoneKeyDown(e, formData.phone, (value) => {
      setFormData((prev) => ({ ...prev, phone: value }));
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="font-inter text-xl font-bold text-[#2D3748] mb-2">
          Заявка отправлена!
        </h3>
        <p className="font-inter text-[#718096]">
          Мы перезвоним вам в течение 15 минут
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Имя */}
      <div>
        <label
          htmlFor="callback-name"
          className="block font-inter text-sm font-medium text-[#2D3748] mb-2"
        >
          Ваше имя *
        </label>
        <input
          type="text"
          id="callback-name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Иван"
          className={`w-full px-4 py-3 border-2 rounded-xl font-inter text-[#2D3748] bg-[#F8F9FA] transition-all outline-none ${
            errors.name
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-[#00a3d5] focus:bg-white'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500 font-inter">{errors.name}</p>
        )}
      </div>

      {/* Телефон */}
      <div>
        <label
          htmlFor="callback-phone"
          className="block font-inter text-sm font-medium text-[#2D3748] mb-2"
        >
          Телефон *
        </label>
        <input
          type="tel"
          id="callback-phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          onKeyDown={handlePhoneKeyDownWrapper}
          placeholder="+7 (___) ___-__-__"
          className={`w-full px-4 py-3 border-2 rounded-xl font-inter text-[#2D3748] bg-[#F8F9FA] transition-all outline-none ${
            errors.phone
              ? 'border-red-400 focus:border-red-500'
              : 'border-gray-200 focus:border-[#00a3d5] focus:bg-white'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500 font-inter">{errors.phone}</p>
        )}
      </div>

      {/* Согласие */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={formData.agreement}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, agreement: e.target.checked }));
              if (errors.agreement) setErrors((prev) => ({ ...prev, agreement: '' }));
            }}
            className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#00a3d5] focus:ring-[#00a3d5] cursor-pointer"
          />
          <span className="font-inter text-sm text-[#718096] leading-relaxed group-hover:text-[#2D3748] transition-colors">
            Согласен на обработку{' '}
            <a href="/privacy" className="text-[#00a3d5] hover:underline">
              персональных данных
            </a>
          </span>
        </label>
        {errors.agreement && (
          <p className="mt-1 text-sm text-red-500 font-inter">{errors.agreement}</p>
        )}
      </div>

      {/* Кнопка */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 bg-gradient-to-r from-[#E53935] to-[#D32F2F] text-white rounded-xl font-inter text-lg font-semibold flex items-center justify-center gap-2 transition-shadow disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg"
        style={{ boxShadow: '0 4px 16px rgba(229, 57, 53, 0.3)' }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            {buttonText}
            <ArrowRight size={20} />
          </>
        )}
      </button>

      <p className="font-inter text-xs text-[#718096] text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default CallbackForm;
