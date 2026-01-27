import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import LinkComponent from '../LinkWithLang/LInkRoute'
import LanguageDropDown from '../home/LanguageDropDown'

const Header = () => {
    const { user } = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = useState(false)
    const { t, } = useTranslation();
    return (
        <div>
            {/* Navbar */}
            <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                <a href="https://prebuiltui.com">
                    <img src='/logo.svg' alt='logo' />
                </a>

                <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                    <a href="#" className="hover:text-green-600 transition">{t('Home')}</a>
                    <a href="#features" className="hover:text-green-600 transition">{t("Feature")}</a>
                    <a href="#testimonials" className="hover:text-green-600 transition">{t("Testimonial")}</a>
                    <a href="#cta" className="hover:text-green-600 transition">{t("Contact")}</a>
                </div>

                <div className="flex gap-2">
                    <LinkComponent to={'/app?state=register'} className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden={user}>
                        {t("GetStart")}
                    </LinkComponent>
                    <LinkComponent hidden={user} to={'/app?state=login'} className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900" >
                        {t("Login")}
                    </LinkComponent>
                    <LinkComponent
                        hidden={!user}
                        to={'/app'}
                        className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
                    >
                        {t('Dashboard')}
                    </LinkComponent>

                    <LanguageDropDown />
                </div>

                <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                        <path d="M4 5h16M4 12h16M4 19h16" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                <a href="/" className="text-white"></a>
                <a href="#features" className="text-white">{t('Feature')}</a>
                <a href="#testimonals" className="text-white">{t('Testimonial')}</a>
                <a href="#contact" className="text-white">{t("Contact")}</a>
                <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex" >
                    X
                </button>
            </div>
        </div>
    )
}

export default Header