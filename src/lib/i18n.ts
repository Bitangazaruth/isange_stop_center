// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
import translationEN from '../../locales/en/en.json';
import translationFR from '../../locales/fr/fr.json';
import translationRW from '../../locales/rw/rw.json';

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
      rw: {
        translation: translationRW,
      },
    },
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
