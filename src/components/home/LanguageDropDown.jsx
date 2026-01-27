import React, { useEffect, useState } from 'react';
import i18next from "i18next";
import { useNavigate } from 'react-router-dom';


const LanguageDropDown = () => {
    const [isOpen, setIsOpen] = useState(false); // State to handle dropdown visibility
    const currentLang = i18next.language
    const [selectedLanguage, setSelectedLanguage] = useState(currentLang); // State to store selected language
    const navigate = useNavigate()

    const languages = [
        { label: 'English', value: "en", image: "/images/en.png" },
        { label: 'ភាសាខ្មែរ', value: "kh", image: "/images/kh.png" }
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle dropdown visibility
    };


    const handleLanguageChange = (value) => {
        setSelectedLanguage(value); // Update the selected language
        setIsOpen(false); // Close dropdown after selecting language

        i18next.changeLanguage(value)
        navigate(`/${value}`);
    }

    const selectedLang = languages.find(lang => lang.value === selectedLanguage); // Get selected language data


    // Set initial language based on URL path
    useEffect(() => {
        const pathLang = location.pathname.split('/')[1]; // Get language from the URL (e.g., /kh or /en)
        if (pathLang && pathLang !== currentLang) {
            i18next.changeLanguage(pathLang); // Change language if it matches the URL language
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedLanguage(pathLang); // Set the selected language in state
        }
    }, [location.pathname, currentLang]); // Run whenever the URL changes

    return (
        <div className="relative inline-block">
            {/* Button to toggle dropdown */}
            <button
                className="flex items-center gap-2 px-6 py-2  active:scale-95 transition-all rounded-full text-slate-800"
                onClick={toggleDropdown}
            >
                <img src={selectedLang.image} alt={selectedLang.label} className="w-5 h-5" />
                {selectedLang.label}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <ul className="space-y-2 p-2">
                        {languages.map((language) => (
                            <li
                                key={language.value}
                                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-green-100 rounded-md"
                                onClick={() => handleLanguageChange(language.value)}
                            >
                                <img src={language.image} alt={language.label} className="w-5 h-5" />
                                {language.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageDropDown;
