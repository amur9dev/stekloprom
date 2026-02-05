/**
 * Утилита для форматирования номера телефона
 * Формат: +7 (XXX) XXX-XX-XX
 * 
 * Улучшенная версия с корректным удалением символов
 */

export const formatPhone = (value: string): string => {
  // Убираем все нецифровые символы
  let digits = value.replace(/\D/g, '');
  
  // Ограничиваем длину до 11 цифр
  if (digits.length > 11) {
    digits = digits.substring(0, 11);
  }
  
  // Если начинается с 8, заменяем на 7
  if (digits.length > 0 && digits[0] === '8') {
    digits = '7' + digits.substring(1);
  }
  
  // Если начинается не с 7 и есть цифры - добавляем 7
  if (digits.length > 0 && digits[0] !== '7') {
    digits = '7' + digits;
    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }
  }
  
  // Если пусто, возвращаем пустую строку
  if (digits.length === 0) return '';
  
  // Форматируем по маске +7 (XXX) XXX-XX-XX
  let result = '+7';
  
  if (digits.length > 1) {
    const areaCode = digits.substring(1, Math.min(4, digits.length));
    result += ' (' + areaCode;
    if (areaCode.length === 3) {
      result += ')';
    }
  }
  
  if (digits.length > 4) {
    result += ' ' + digits.substring(4, Math.min(7, digits.length));
  }
  
  if (digits.length > 7) {
    result += '-' + digits.substring(7, Math.min(9, digits.length));
  }
  
  if (digits.length > 9) {
    result += '-' + digits.substring(9, 11);
  }
  
  return result;
};

export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && digits[0] === '7';
};

/**
 * Обработчик ввода телефона с поддержкой удаления через скобки
 */
export const handlePhoneInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: (value: string) => void
) => {
  const input = e.target;
  const newValue = input.value;
  
  // Просто форматируем введённое значение
  const formatted = formatPhone(newValue);
  setValue(formatted);
};

/**
 * Обработчик клавиш для корректного удаления через скобки
 */
export const handlePhoneKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  setValue: (value: string) => void
) => {
  if (e.key === 'Backspace') {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;
    
    // Если есть выделение, позволяем стандартное поведение
    if (cursorPos !== selectionEnd) {
      return;
    }
    
    // Получаем текущие цифры
    const digits = currentValue.replace(/\D/g, '');
    
    // Определяем, какой символ перед курсором
    const charBefore = currentValue[cursorPos - 1];
    
    // Если перед курсором спец.символ (скобка, пробел, дефис), удаляем предыдущую цифру
    if (charBefore && /[\s\(\)\-]/.test(charBefore)) {
      e.preventDefault();
      
      // Удаляем последнюю цифру
      if (digits.length > 1) {
        const newDigits = digits.slice(0, -1);
        const formatted = formatPhone('+' + newDigits);
        setValue(formatted);
        
        // Устанавливаем курсор в конец
        setTimeout(() => {
          input.setSelectionRange(formatted.length, formatted.length);
        }, 0);
      } else {
        setValue('');
      }
    }
  }
};
