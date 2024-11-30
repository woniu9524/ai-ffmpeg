'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../public/locales/en/common.json';
import zhTranslation from '../public/locales/zh/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enTranslation,
      },
      zh: {
        common: zhTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n; 