import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthWrapper } from "./context/auth";
import SearchBar from "./components/SearchBar";

function App(){
  const Backward = <Navigate to={"/login"} />;
  const Forward = <Navigate to={"/productlist"} />;
  const x = JSON.parse(localStorage.getItem("user"));
  console.log(x.id);

  return(
    <>
      <div className="main">
        <BrowserRouter>
          <AuthWrapper>
            <ToastContainer />
            <Header />
            <SearchBar />
            <Routes>
              <Route path="/" Component={Register}></Route>
              <Route path="/register" Component={Register}></Route>
              <Route path="/productlist" element={x.id ? Forward : Backward}></Route>
              <Route path="/login" Component={Login}></Route>
            </Routes>
            <Footer />
          </AuthWrapper>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
