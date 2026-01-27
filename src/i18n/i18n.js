import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from './locales/en.json';
import kh from './locales/kh.json'

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: { translation: en },
        kh: { translation: kh },
        // fr: { translation: fr }
    }
});

export default i18n