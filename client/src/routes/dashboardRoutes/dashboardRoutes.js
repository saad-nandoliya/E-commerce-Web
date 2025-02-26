import React from 'react'
import { Routes, Route } from "react-router-dom"
import AdminLogin from "../../pages/admin/auth/AdminLogin"
import Dashboard from '../../pages/admin/dashboard/Dashboard'
import NotFound from '../../pages/error/notFoundPage'
import ShowAllProducts from '../../pages/admin/products/ShowAllProducts'
import AddProduct from '../../pages/admin/products/AddProduct'
import UpdateProducts from '../../pages/admin/products/UpdateProducts'
import ShowAllCategories from '../../pages/admin/categories/ShowAllCategories'
import AddCategory from '../../pages/admin/categories/AddCategory'
import UpdateCategory from '../../pages/admin/categories/UpdateCategory'
import ScrollToTop from '../../components/ScrollToTop'
import AllAdminUsers from '../../pages/admin/adminUsers/AllAdminUsers'
import AddAdminUser from '../../pages/admin/adminUsers/AddAdminUser'
import UpdateAdminUser from "../../pages/admin/adminUsers/UpdateAdminUser"
import ProtectedRoute from '../../pages/admin/auth/ProtectedRoute'


const dashboaedRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {/* dashbord access admins */}
                <Route path='/login' element={<AdminLogin />} />


                {/* protected Routes */}
                <Route element={<ProtectedRoute />}>

                    {/* dashboard route */}
                    <Route path='/dashboard' element={<Dashboard />} />

                    {/* products route */}
                    <Route path='/allproducts' element={<ShowAllProducts />} />
                    <Route path='/addproduct' element={<AddProduct />} />
                    <Route path='/updateproduct/:id' element={<UpdateProducts />} />

                    {/* categories route */}
                    <Route path='/allcategories' element={<ShowAllCategories />} />
                    <Route path='/addcategory' element={<AddCategory />} />
                    <Route path='/updatecategory/:id' element={<UpdateCategory />} />

                    {/* admin user route */}
                    <Route path='/alladminusers' element={<AllAdminUsers />} />
                    <Route path='/addadmin' element={<AddAdminUser />} />
                    <Route path='/updateadmin/:id' element={<UpdateAdminUser />} />
                </Route>

                {/* 404 route */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    )
}

export default dashboaedRoutes