import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Book from "./pages/Book";
import AddBook from "./pages/AddBook"
import Categories from "./pages/Categories";
import AddCategories from "./pages/AddCategories";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import CartPage from "./pages/CartPage";
import UpdateProfile from "./pages/UpdateProfile";

function App(){
  return(
    <>
      <div className="main">
        <BrowserRouter>
          <AuthWrapper>
            <ToastContainer />
            <Header />
            <SearchBar />
            <Routes>
              <Route path="/" Component={Login}></Route>
              <Route path="/register" Component={Register}></Route>
              <Route path="/productlist" Component={ProductList}></Route>
              <Route path="/login" Component={Login}></Route>
              <Route path="/book" Component={Book}></Route>
              <Route path="/add-book" Component={AddBook}></Route>
              <Route path="/add-book/:id" Component={AddBook}></Route>
              <Route path="/categories" Component={Categories}></Route>
              <Route path="/add-category" Component={AddCategories}></Route>
              <Route path="/add-category/:id" Component={AddCategories}></Route>
              <Route path="/user" Component={User}></Route>
              <Route path="/edit-user/:id" Component={EditUser}></Route>
              <Route path="/cart-page" Component={CartPage}></Route>
              <Route path="/update-profile" Component={UpdateProfile}></Route>
            </Routes>
            <Footer />
          </AuthWrapper>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;