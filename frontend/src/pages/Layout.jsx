import Header from '@/components/header/Header';
import React from 'react';
import Footer from '@/components/footer/Footer';
import { Outlet } from 'react-router-dom';
export default function Layout() {
    return(
        <>
        <Header/>
        <div className='dark:custom-background w-full h-full'>
<Outlet/>
        </div>
    
        <Footer />
        </>
    )
}