import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

export default function Index() {
    return (

        <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<Dashboard />} />
                </Routes>
        </BrowserRouter>

    )
}
