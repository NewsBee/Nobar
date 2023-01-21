import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'

const Home = () => {
  return (
    <>
        <Main/>
        <Outlet />
        <hr />
        <Footer/>
    </>
  )
}

export default Home
