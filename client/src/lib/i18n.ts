import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishTranslations from '../translations/en';
import arabicTranslations from '../translations/ar';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      ar: {
        translation: arabicTranslations,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
