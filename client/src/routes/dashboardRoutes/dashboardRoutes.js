import React from 'react'
import { Routes, Route } from "react-router-dom"
import Dashboard from '../../components/dashboardCompo/Dashboard'
import NotFound from '../../pages/error/notFoundPage'
import Products from '../../components/dashboardCompo/products/ShowAllProducts'

const dashboaedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/products' element={<Products />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default dashboaedRoutes