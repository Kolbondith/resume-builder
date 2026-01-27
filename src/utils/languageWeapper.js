import { useParams } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../i18n/i18n";

export default function LanguageWrapper({ children }) {
    const { lang } = useParams();

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
            document.documentElement.lang = lang; // optional SEO
        }
    }, [lang]);

    return children;
}
