import React from "react";
import { Routes, Route } from "react-router-dom"
import Layout from "../../components/clientCompo/layout";
import NotFound from "../../pages/error/notFoundPage";
import Home from "../../pages/client/home"
import SignUp from "../../pages/client/signUp";
import Login from "../../pages/client/login"
import Cart from "../../components/clientCompo/cart";
import CheckoutPage from "../../components/clientCompo/checkOutPage";
import OrderTracking from "../../components/clientCompo/orderTrackingPage";
import CategoryProduct from "../../components/clientCompo/categoryProduct";
import ProductDetail from "../../components/clientCompo/productsDetail";
import AllProducts from "../../components/clientCompo/allProduct";

const HomeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/categoryproduct" element={<CategoryProduct />} />
                <Route path="/productsdetail" element={<ProductDetail />} />
                <Route path="/allproduct" element={<AllProducts />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/ordertrack" element={<OrderTracking />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default HomeRoutes