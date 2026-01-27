import React from 'react'
import Header from '../components/homeLayout/Header'
import { Outlet } from 'react-router-dom'
import Banner from '../components/home/Banner'

const HomeLayout = () => {
    return (
        <div className='min-h-screen'>
            <Banner />
            <Header />
            <Outlet />
        </div>
    )
}

export default HomeLayout