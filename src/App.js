import "./App.css";
// React Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Font Awesome
import "./fontawesome.js";
// ReactToastify
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/Admin/Admin.scss";
import './assets/scss/Customer/Header_customer.scss';
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
import { getSession } from "./redux/Auth/auth_page_thunk.js";
import Page404 from './pages/Error/404.jsx';


function App() {
  const dispatch = useDispatch();
  const [role,setRole] = useState([]);
  useEffect(() => {
    if(sessionStorage.getItem("id") != null){
      let id = sessionStorage.getItem("id");
      dispatch(getSession({id:id})).then((res) => {
        if(!res.error){
          setRole(res.payload.responseData.roles);
        }
      });
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
           role?.some((rol)=>rol !=="ROLE_USER") === false ?
              <HomeIndex /> :<Page404 path={"/system_itp_shine"}/>
        } />
        <Route path="/product" element={
           role.some((rol)=>rol !=="ROLE_USER") === false ?
           <ProductIndex/>:<Page404 path={"/"}/>
        }/>
        <Route path="/profile" element={
            role.some((rol)=>rol ==="ROLE_USER") === true ?
            <ProfileIndex/>:<Page404 path={"/"}/>
        }/>
        <Route path="/service" element={
            role.some((rol)=>rol !=="ROLE_USER") === false ?
            <ServiceIndex/>:<Page404 path={"/"}/>
        }/>
        {/* <Route path="/system_itp_shine" element={
           role?.some((rol)=>rol !=="ROLE_USER") === true ?
            <AdminIndex/>:<Page404 path={"/"}/>
        }/> */}
        <Route path="/system_itp_shine" element={
            <AdminIndex/>}/>
        <Route path="/checkout" element={
          role?.some((rol)=>rol !=="ROLE_USER") === null ?
          <CheckoutIndex/>:<Page404 path={"/"}/>
          }/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
