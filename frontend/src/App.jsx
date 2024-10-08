import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Home from "./pages/home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./globals/navbar/Navbar";
import Card from "./globals/card/Card";
import SingleProduct from "./pages/product/SingleProduct";
import Cart from "./pages/cart/Cart";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/card" element={<Card/>} />
          <Route path="/product/:id" element={<SingleProduct/>}/>

        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
