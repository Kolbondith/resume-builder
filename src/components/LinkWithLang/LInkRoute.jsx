import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LinkComponent = ({ to, children, ...props }) => {
    const { i18n } = useTranslation(); // Access the i18n object for language

    // Generate the path with the current language
    const currentLanguage = i18n.language;
    const pathWithLang = `/${currentLanguage}${to}`;

    return (
        <Link to={pathWithLang} {...props}>
            {children}
        </Link>
    );
}

export default LinkComponent;
