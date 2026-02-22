const formatPhone = (value) => {
  let digits = value.replace(/\D/g, '');

  if (digits.length > 11) {
    digits = digits.substring(0, 11);
  }

  if (digits.length > 0 && digits[0] === '8') {
    digits = '7' + digits.substring(1);
  }

  if (digits.length > 0 && digits[0] !== '7') {
    digits = '7' + digits;
    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }
  }

  if (digits.length === 0) return '';

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

const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && digits[0] === '7';
};

const handlePhoneKeyDown = (event, currentValue, setValue) => {
  if (event.key === 'Backspace') {
    const input = event.target;
    const cursorPos = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;

    if (cursorPos !== selectionEnd) {
      return;
    }

    const digits = currentValue.replace(/\D/g, '');
    const charBefore = currentValue[cursorPos - 1];

    if (charBefore && /[\s\(\)\-]/.test(charBefore)) {
      event.preventDefault();

      if (digits.length > 1) {
        const newDigits = digits.slice(0, -1);
        const formatted = formatPhone('+' + newDigits);
        setValue(formatted);
        setTimeout(() => {
          input.setSelectionRange(formatted.length, formatted.length);
        }, 0);
      } else {
        setValue('');
      }
    }
  }
};

const setupPhoneInputs = () => {
  const inputs = document.querySelectorAll('[data-phone-input]');
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const formatted = formatPhone(event.target.value);
      event.target.value = formatted;
    });

    input.addEventListener('keydown', (event) => {
      handlePhoneKeyDown(event, event.target.value, (nextValue) => {
        event.target.value = nextValue;
      });
    });
  });
};

const setupHeader = () => {
  const header = document.querySelector('[data-header]');
  const dropdownItems = document.querySelectorAll('[data-dropdown]');

  const syncHeaderOffset = () => {
    if (!header) return;
    const height = header.offsetHeight || 0;
    document.documentElement.style.setProperty('--header-offset', `${height}px`);
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('header--scrolled', window.scrollY > 50);
    syncHeaderOffset();
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader);
  window.addEventListener('resize', syncHeaderOffset);

  dropdownItems.forEach((item) => {
    const dropdown = item.querySelector('.header__dropdown');
    if (!dropdown) return;

    item.addEventListener('mouseenter', () => {
      dropdown.classList.add('header__dropdown--open');
    });

    item.addEventListener('mouseleave', () => {
      dropdown.classList.remove('header__dropdown--open');
    });
  });
};

const setupMobileMenu = () => {
  const button = document.querySelector('[data-mobile-menu-button]');
  const panel = document.querySelector('[data-mobile-panel]');
  const dropdownButtons = document.querySelectorAll('[data-mobile-dropdown-button]');

  if (!button || !panel) return;

  const closeMenu = () => {
    panel.classList.remove('header__mobilePanel--open');
    button.classList.remove('header__mobileMenuButton--open');
    button.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  button.addEventListener('click', () => {
    const isOpen = panel.classList.toggle('header__mobilePanel--open');
    button.classList.toggle('header__mobileMenuButton--open', isOpen);
    button.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  dropdownButtons.forEach((dropdownButton) => {
    dropdownButton.addEventListener('click', () => {
      const dropdown = dropdownButton.nextElementSibling;
      if (!dropdown || !dropdown.classList.contains('header__mobileDropdown')) return;
      const isOpen = dropdown.classList.toggle('header__mobileDropdown--open');
      dropdownButton.classList.toggle('header__mobileMenuLink--open', isOpen);
    });
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
};

const setupModal = () => {
  const modal = document.querySelector('[data-modal="callback"]');
  const openButtons = document.querySelectorAll('[data-modal-open="callback"]');
  const closeElements = document.querySelectorAll('[data-modal-close]');

  if (!modal) return;

  const openModal = () => {
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openButtons.forEach((button) => button.addEventListener('click', openModal));
  closeElements.forEach((el) => el.addEventListener('click', closeModal));

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
};

const setupScrollTop = () => {
  const button = document.querySelector('[data-scroll-top]');
  if (!button) return;

  const toggleVisibility = () => {
    button.classList.toggle('scroll-top--visible', window.scrollY > 500);
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

const setupFooterYear = () => {
  const yearElement = document.querySelector('[data-current-year]');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

const showLoading = (button, text) => {
  button.dataset.originalContent = button.innerHTML;
  button.innerHTML = `
    <span class="icon-placeholder icon-placeholder--sm icon-placeholder--white icon-placeholder--spin"></span>
    <span>${text}</span>
  `;
  button.setAttribute('disabled', 'true');
};

const hideLoading = (button) => {
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }
  button.removeAttribute('disabled');
};

const setupContactForm = () => {
  const formWrapper = document.querySelector('[data-contact-form]');
  const form = document.querySelector('[data-contact-fields]');
  const submitButton = document.querySelector('[data-contact-submit]');
  const successBlock = document.querySelector('[data-contact-success]');

  if (!formWrapper || !form || !submitButton || !successBlock) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('#contact-name');
    const phoneInput = form.querySelector('#contact-phone');
    const nameError = form.querySelector('[data-error="contact-name"]');
    const phoneError = form.querySelector('[data-error="contact-phone"]');

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Введите ваше имя';
      isValid = false;
    } else {
      nameError.textContent = '';
    }

    if (!isValidPhone(phoneInput.value)) {
      phoneError.textContent = 'Введите полный номер телефона';
      isValid = false;
    } else {
      phoneError.textContent = '';
    }

    if (!isValid) return;

    showLoading(submitButton, 'Отправка...');

    setTimeout(() => {
      hideLoading(submitButton);
      formWrapper.classList.add('contactform__form--submitted');
      successBlock.style.display = 'block';
      form.reset();

      setTimeout(() => {
        formWrapper.classList.remove('contactform__form--submitted');
      }, 5000);
    }, 1200);
  });
};

const setupCallbackForm = () => {
  const formWrapper = document.querySelector('[data-callback]');
  const form = document.querySelector('[data-callback-form]');
  const success = document.querySelector('[data-callback-success]');
  const submitButton = document.querySelector('[data-callback-submit]');

  if (!formWrapper || !form || !success || !submitButton) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = form.querySelector('#callback-name');
    const phoneInput = form.querySelector('#callback-phone');
    const agreementInput = form.querySelector('input[name="agreement"]');

    const nameError = form.querySelector('[data-error="callback-name"]');
    const phoneError = form.querySelector('[data-error="callback-phone"]');
    const agreementError = form.querySelector('[data-error="callback-agreement"]');

    let isValid = true;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Введите ваше имя';
      nameInput.classList.add('callback__input--error');
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Имя слишком короткое';
      nameInput.classList.add('callback__input--error');
      isValid = false;
    } else {
      nameError.textContent = '';
      nameInput.classList.remove('callback__input--error');
    }

    if (!isValidPhone(phoneInput.value)) {
      phoneError.textContent = 'Введите полный номер телефона';
      phoneInput.classList.add('callback__input--error');
      isValid = false;
    } else {
      phoneError.textContent = '';
      phoneInput.classList.remove('callback__input--error');
    }

    if (!agreementInput.checked) {
      agreementError.textContent = 'Необходимо согласие';
      isValid = false;
    } else {
      agreementError.textContent = '';
    }

    if (!isValid) return;

    showLoading(submitButton, 'Отправка...');

    setTimeout(() => {
      hideLoading(submitButton);
      formWrapper.classList.add('callback--submitted');
      success.style.display = 'block';
      form.reset();

      setTimeout(() => {
        formWrapper.classList.remove('callback--submitted');
      }, 5000);
    }, 1200);
  });
};


const setupProductImageSliders = () => {
  const initSlider = (container, primaryImage) => {
    if (!container || !primaryImage || container.dataset.sliderReady === 'true') return;

    const primarySrc = primaryImage.getAttribute('src') || '/placeholder.svg';
    const primaryAlt = primaryImage.getAttribute('alt') || 'Изображение товара';
    const secondarySrc = primaryImage.dataset.secondImage || primarySrc;

    const primaryImg = document.createElement('img');
    primaryImg.className = primaryImage.className;
    primaryImg.src = primarySrc;
    primaryImg.alt = primaryAlt;

    const secondaryImg = document.createElement('img');
    secondaryImg.className = `${primaryImage.className} productSlider__image--secondary`;
    secondaryImg.src = secondarySrc;
    secondaryImg.alt = `${primaryAlt} — дополнительный ракурс`;

    const track = document.createElement('div');
    track.className = 'productSlider__track';

    const slide1 = document.createElement('div');
    slide1.className = 'productSlider__slide';
    slide1.appendChild(primaryImg);

    const slide2 = document.createElement('div');
    slide2.className = 'productSlider__slide';
    slide2.appendChild(secondaryImg);

    track.appendChild(slide1);
    track.appendChild(slide2);

    const dots = document.createElement('div');
    dots.className = 'productSlider__dots';

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'productSlider__arrow productSlider__arrow--prev';
    prevButton.setAttribute('aria-label', 'Предыдущее изображение');
    prevButton.innerHTML = '‹';

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'productSlider__arrow productSlider__arrow--next';
    nextButton.setAttribute('aria-label', 'Следующее изображение');
    nextButton.innerHTML = '›';

    const slidesCount = 2;
    const dotButtons = Array.from({ length: slidesCount }, (_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'productSlider__dot';
      dot.setAttribute('aria-label', `Показать изображение ${index + 1}`);
      if (index === 0) dot.classList.add('productSlider__dot--active');
      dots.appendChild(dot);
      return dot;
    });

    container.classList.add('productSlider');
    container.setAttribute('data-product-slider', '');
    container.innerHTML = '';
    container.appendChild(track);
    container.appendChild(prevButton);
    container.appendChild(nextButton);
    container.appendChild(dots);

    let currentIndex = 0;
    let startX = 0;

    const normalizeIndex = (index) => {
      if (index < 0) return slidesCount - 1;
      if (index >= slidesCount) return 0;
      return index;
    };

    const update = (nextIndex) => {
      currentIndex = normalizeIndex(nextIndex);
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dotButtons.forEach((dot, index) => {
        dot.classList.toggle('productSlider__dot--active', index === currentIndex);
      });
    };

    const goNext = () => update(currentIndex - 1);
    const goPrev = () => update(currentIndex + 1);

    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', () => update(index));
    });

    prevButton.addEventListener('click', goPrev);
    nextButton.addEventListener('click', goNext);

    container.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) < 40) return;
      if (deltaX < 0) goNext();
      if (deltaX > 0) goPrev();
    }, { passive: true });

    container.dataset.sliderReady = 'true';
  };

  document.querySelectorAll('.solutions__cardImageWrapper').forEach((wrapper) => {
    const image = wrapper.querySelector('img');
    initSlider(wrapper, image);
  });

  document.querySelectorAll('.catalog__cardImage').forEach((image) => {
    if (image.closest('[data-product-slider]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'catalog__cardImageWrapper';
    image.parentNode.insertBefore(wrapper, image);
    initSlider(wrapper, image);
    image.remove();
  });

  document.querySelectorAll('.catalogDetail__image').forEach((image) => {
    if (image.closest('[data-product-slider]')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'catalogDetail__imageWrapper';
    image.parentNode.insertBefore(wrapper, image);
    initSlider(wrapper, image);
    image.remove();
  });
};

const setupCasesSlider = () => {
  const slider = document.querySelector('[data-cases-slider]');
  const dots = Array.from(document.querySelectorAll('[data-cases-dot]'));

  if (!slider || dots.length === 0) return;

  const setActiveDot = (index) => {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('cases__dot--active', idx === index);
    });
  };

  const handleScroll = () => {
    const slideWidth = slider.offsetWidth;
    if (!slideWidth) return;
    const newIndex = Math.round(slider.scrollLeft / slideWidth);
    setActiveDot(newIndex);
  };

  slider.addEventListener('scroll', handleScroll);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
      setActiveDot(index);
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  setupMobileMenu();
  setupModal();
  setupScrollTop();
  setupPhoneInputs();
  setupContactForm();
  setupCallbackForm();
  setupCasesSlider();
  setupProductImageSliders();
  setupFooterYear();
});
