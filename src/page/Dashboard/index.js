import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../Component/Footer'
import Header from '../Component/Header/Header'
import Home from './Home'
import Content from './Content'
import Transaction from './Transection'
import AccountData from './AccountData/AccountData'
import Register from '../Authentication/register'
import Login from '../Authentication/login'


const index = () => {
  return (
    <>
      <Header />
      <main>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/accounts' element={<Content />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='/accountdata' element={<AccountData />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default index