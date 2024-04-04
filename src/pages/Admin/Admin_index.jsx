import React, { useEffect, useState } from 'react'
import '../../assets/scss/Admin/Sidebar.scss'
import Headbar from '../../global_components/Admin_components/Headbar'
import DashboardPage from './Dashboard/dashboard_page'
import Footer from '../../global_components/Admin_components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryPage from './Category/category_page'

import AccountPage from './Account/account_page'
import ServicePage from './Service/service_page'
import BookingPage from './Booking/booking_page'
import ProductPage from './Product/product_page'
import OrderPage from './Order/order_page'
import VoucherPage from './Voucher/voucher_page'
import { useDispatch } from 'react-redux'
import { get_session } from '../../redux/Auth/auth_page_thunk'
import { get_user_by_id } from '../../redux/Account/account_page_thunk'

/* eslint-disable */
const AdminIndex = () => {
  const [Id, setId] = useState(1)
  const dispatch = useDispatch();
  const [user,setUser] = useState([])
  const [role, setRole] = useState({ "isAdmin": false, "roles": [] });
  useEffect(() => {
    if (sessionStorage.getItem("id") != null) {
      let id = sessionStorage.getItem("id");
      dispatch(get_session(id)).then((res) => {
        if (!res.error) {
          let user_id = res.payload.responseData.id;
          if (id !== undefined) {
            dispatch(get_user_by_id(user_id)).then((res1) => {
              if (!res1.error) {
                setUser(res1.payload)
              };
            })
          }
          setRole(res.payload.responseData);
        }
      });

    }
  }, [dispatch]);

  const handleSelect = (id) => {
    let collapseOld = document.getElementById('item-' + Id);
    collapseOld.classList.remove('active');
    let collapse = document.getElementById('item-' + id);
    collapse.classList.add('active');
    setId(id);
  }

  return (
    <>
      <div id='wrapper'>
        <div className='side'>

          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >

            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/system_itp_shine"
            >
              <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
              </div>
              <div className="sidebar-brand-text mx-3">
                ITP Shine
              </div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />

            {role?.roles.some((rol) => rol === "ROLE_ADMIN") === true ?
              <li className="nav-item">
                <a hrefLang='#!' type='button' className="nav-link active" id='item-1' onClick={() => handleSelect(1)}>
                  <span>Dashboard</span>
                  <FontAwesomeIcon icon={['fas', 'gauge']} size='lg' />
                </a>
              </li>
              :
              null
            } 
            {role?.roles.some((rol) => rol === "ROLE_CATEGORY" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-2' onClick={() => handleSelect(2)}>
                  <span>Categories</span>
                  <FontAwesomeIcon icon={['fas', 'list']} size='lg' />
                </a>
              </li>
             :
              null
            } 

            <hr className="sidebar-divider my-0" />

            {role?.roles.some((rol) => rol === "ROLE_PRODUCT" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-3' onClick={() => handleSelect(3)}>
                  <span>Products</span>
                  <FontAwesomeIcon icon={['fas', 'gift']} size='lg' />
                </a>
              </li>
              :
              null
            }

            {role?.roles.some((rol) => rol === "ROLE_ORDER_PRODUCT" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-4' onClick={() => handleSelect(4)}>
                  <span>Orders</span>
                  <FontAwesomeIcon icon={['fas', 'user']} size='lg' />
                </a>
              </li>
              :
              null
            }
            {role?.roles.some((rol) => rol === "ROLE_SERVICE" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-5' onClick={() => handleSelect(5)}>
                  <span>Services</span>
                  <FontAwesomeIcon icon={['fas', 'bell-concierge']} size='lg' />
                </a>
              </li>
              :
              null
            }
            <hr className="sidebar-divider my-0" />
            {role?.roles.some((rol) => rol === "ROLE_ORDER_SERVICE" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-6' onClick={() => handleSelect(6)}>
                  <span>Booking</span>
                  <FontAwesomeIcon icon={['far', 'calendar-alt']} size='lg' />
                </a>
              </li>
         :
              null
            } 
            {/* <hr className="sidebar-divider my-0" />

            <li className="nav-item">
              <a hrefLang='#!' type='button' className="nav-link">
                <span>Charts</span>
                <FontAwesomeIcon icon={['fas', 'chart-simple']} size='lg' />
              </a>
            </li> */}

            <hr className="sidebar-divider my-0" />
            {role?.roles.some((rol) => rol === "ROLE_VOUCHER" || rol === "ROLE_ADMIN") === true ?
              <li className="nav-item">
                <a hrefLang='#!' type='button' className="nav-link" id='item-7' onClick={() => handleSelect(7)}>
                  <span>Voucher</span>
                  <FontAwesomeIcon icon={['fas', 'chart-line']} size='lg' />
                </a>
              </li>
              :
              null
            }
            {role?.roles.some((rol) => rol === "ROLE_ACCOUNT" || rol === "ROLE_ADMIN") === true ? 
              <li className="nav-item ">
                <a hrefLang='#!' type='button' className="nav-link" id='item-8' onClick={() => handleSelect(8)}>
                  <span>Accounts</span>
                  <FontAwesomeIcon icon={['fas', 'user']} size='lg' />
                </a>
              </li>
              :
              null
            } 
            <hr className="sidebar-divider d-none d-md-block" />

          </ul>

        </div>
        <div id='content'>
          <Headbar data={user}/>
          {Id === 1 ? <DashboardPage  /> : ''}
          {Id === 2 ? <CategoryPage dodertor={role?.roles.some((rol) => (rol === "ROLE_CATEGORY" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 3 ? <ProductPage dodertor={role?.roles.some((rol) => (rol === "ROLE_PRODUCT" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 4 ? <OrderPage dodertor={role?.roles.some((rol) => (rol === "ROLE_ORDER_PRODUCT" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 5 ? <ServicePage dodertor={role?.roles.some((rol) => (rol === "ROLE_SERVICE" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 6 ? <BookingPage dodertor={role?.roles.some((rol) => (rol === "ROLE_ORDER_SERVICE" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 7 ? <VoucherPage dodertor={role?.roles.some((rol) => (rol === "ROLE_VOUCHER" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          {Id === 8 ? <AccountPage dodertor={role?.roles.some((rol) => (rol === "ROLE_ACCOUNT" && rol === "ROLE_MODERATOR") || rol === "ROLE_ADMIN") === true ?true:false}/> : ''}
          <Footer />
        </div>
      </div>
    </>
  )
}

export default AdminIndex
