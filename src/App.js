import "./App.css";
// React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Font Awesome
import "./fontawesome.js";
// ReactToastify
import 'react-toastify/dist/ReactToastify.css';
//
import "./assets/scss/Admin/Admin.scss";
import './assets/scss/Customer/Header_customer.scss';
import './assets/scss/Customer/CartPage/cart_body.scss';
import './assets/scss/Admin/Order/OrderPage.scss';
import './assets/scss/Admin/Service/ServicePage.scss';
import './assets/scss/Admin/Booking/BookingPage.scss';
import './assets/scss/Customer/BookingPage/booking_employee.scss';
import './assets/scss/Customer/BookingPage/booking_page.scss';
import './assets/scss/Customer/BookingPage/booking_phone.scss';
import './assets/scss/Customer/BookingPage/booking_services.scss';
import './assets/scss/Customer/BookingPage/booking_time.scss';
import './assets/scss/Customer/Profile/ProfileVoucher.scss';
import "./assets/scss/Customer/Profile/Password_customer.scss"
import './assets/scss/Customer/WishlistPage/WishlistPage.scss'
import './assets/scss/Customer/Carousel_customer.scss'
import "react-big-calendar/lib/css/react-big-calendar.css";
import HomeIndex from "./pages/Customer/HomePage/Home_index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductIndex from "./pages/Customer/ProductPage/Product_index";
import AdminIndex from "./pages/Admin/Admin_index";
import ServiceIndex from "./pages/Customer/ServicePage/Service_index";
import CheckoutIndex from "./pages/Customer/CheckoutPage/Checkout_index";
import ProfileIndex from "./pages/Customer/ProfilePage/Profile_index";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {get_session } from "./redux/Auth/auth_page_thunk.js";
import Page404 from './pages/Error/404.jsx';
import CartIndex from "./pages/Customer/CartPage/cart_index.jsx";
import BookingIndex from "./pages/Customer/BookingPage/booking_index.jsx";
import { get_user_by_id } from "./redux/Account/account_page_thunk.js";
import WishlistIndex from "./pages/Customer/WhishList/wishlist_index.jsx";


function App() {

  const dispatch = useDispatch();
  const [role,setRole] = useState({"isAdmin":false, "roles" : []});
  useEffect(() => {
    if(sessionStorage.getItem("id") != null){
      let id = sessionStorage.getItem("id");
      dispatch(get_session(id)).then((res) => {
        if(!res.error){
          let user_id = res.payload.responseData.id;
          if(id !== undefined){
            dispatch(get_user_by_id(user_id));
          }
          setRole(res.payload.responseData);
        }
      });

    }
  }, [dispatch]);
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={
           role?.isAdmin === false ?
              <HomeIndex /> :<Page404 path={"/system_itp_shine"}/>
        } />
        <Route path="/product" element={
           role?.isAdmin === false?
           <ProductIndex/>:<Page404 path={"/system_itp_shine"}/>
        }/>
        <Route path="/profile" element={
            role?.isAdmin === false &&  role?.roles.some((rol)=>rol ==="ROLE_USER") === true?
            <ProfileIndex/>:<Page404 path={"/"}/>
        }/>
        <Route path="/whish-list" element={
            role?.isAdmin === false &&  role?.roles.some((rol)=>rol ==="ROLE_USER") === true?
            <WishlistIndex/>:<Page404 path={"/"}/>
        }/>
        <Route path="/service" element={
             role?.isAdmin === false ?
            <ServiceIndex/>:<Page404 path={"/system_itp_shine"}/>
        }/>
        <Route path="/system_itp_shine" element={
            role?.isAdmin === true ?
            <AdminIndex/>:<Page404 path={"/"}/>
        }/>
        {/* <Route path="/system_itp_shine" element={
            <AdminIndex/>}/> */}
        <Route path="/checkout" element={
          role?.isAdmin === false ?
          <CheckoutIndex/>:<Page404 path={"/system_itp_shine"}/>
          }/>
           <Route path="/cart" element={<CartIndex/>}/>
           <Route path="/booking" element={<BookingIndex/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
