import React from 'react'
import Header from '../page/header/header'
import Footer from '../page/footer/footer'
import { Outlet } from 'react-router-dom'
import styles from './styles/MainLayout.module.css'


function MainLayout (){


    return(
       
        <>

        <Header/>
        <main className={styles['main-content']}>
            <Outlet />
        </main>
        <Footer/>
        </>
    );
}
export default MainLayout