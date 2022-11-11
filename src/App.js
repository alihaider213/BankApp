import React from 'react'
import Routes from "./page/Routes"
import './App.scss'
import './config/global'
import { ToastContainer } from 'react-toastify';
import "bootstrap/scss/bootstrap.scss"
import "bootstrap/dist/js/bootstrap"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


export default function App() {
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  )
}
