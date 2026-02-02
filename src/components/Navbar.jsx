import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/authSlice'
import i18next from 'i18next'
import LinkComponent from './LinkWithLang/LInkRoute'



const Navbar = () => {
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const lang = i18next.language

    const logoutUser = () => {

        dispatch(logout())
        // FULL ROUTE RESET (leave nested layouts)
        window.location.replace(`/${lang}`);
    }
    return (
        <div className='shadow bg-white'>
            <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
                <LinkComponent to='/'>
                    <img src='/logo.svg' alt='logo' className='h-11 w-auto' />
                </LinkComponent>
                <div className='flex items-center gap-12'>
                    <p>Hi, {user?.name}</p>
                    <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar