import React, { useEffect, useState } from 'react'
import '../../assets/scss/Admin/Sidebar.scss'
import Headbar from '../../global_components/Admin_components/Headbar'
import MainContent from './Dashboard/Main_content'
import Footer from '../../global_components/Admin_components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryPage from './Category/category_page'

import { Col } from 'react-bootstrap'
import AccountPage from './Account/account_page'
import ServicePage from './Service/service_page'
import BookingPage from './Booking/booking_page'
import ProductIndex from '../Customer/ProductPage/Product_index'
import ProductPage from './Product/product_page'
import OrderPage from './Order/order_page'
const AdminIndex = () => {
  const [Id, setId] = useState(1)
  const [title, setTitle] = useState("Dashboard")
  const [active, setActive] = useState("")
  const handleSelect = (id) => {
    let collapseOld = document.getElementById('item-' + Id);
    collapseOld.classList.remove('active');
    let collapse = document.getElementById('item-' + id);
    collapse.classList.add('active');
    setId(id);
  }

  useEffect(() => {
    if (Id === 1) {
      setTitle("Dashboard")
      
    }
    else if (Id === 2) {
      setTitle("Categories")
    } else if (Id === 3) {
      setTitle("Products")
    } else if (Id === 4) {
      setTitle("Services")
    } else if (Id === 5) {
      setTitle("Orders")
    } else if (Id === 6) {
      setTitle("Booking")
    } else {
      setTitle("Account")
    }
  }, [Id])
  return (
    <>
      <div id='wrapper'>
        <div className='side'>
          {/* Sidebar */}
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            {/* Sidebar - Brand */}
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html"
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
            {/* Nav Item - Dashboard */}
            <li className="nav-item">
              <a href='#!' className="nav-link active" id='item-1' onClick={() => handleSelect(1)}>
                <span>Dashboard</span>
                <FontAwesomeIcon icon={['fas', 'gauge']} size='lg' />
              </a>
            </li>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-2' onClick={() => handleSelect(2)}>
                <span>Categories</span>
                <FontAwesomeIcon icon={['fas', 'list']} size='lg' />
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Utilities Collapse Menu */}
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-3' onClick={() => handleSelect(3)}>
                <span>Products</span>
                <FontAwesomeIcon icon={['fas', 'gift']} size='lg' />
              </a>
            </li>

            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-4' onClick={() => handleSelect(4)}>
                <span>Orders</span>
                <FontAwesomeIcon icon={['fas', 'user']} size='lg' />
              </a>
            </li>
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-5' onClick={() => handleSelect(5)}>
                <span>Services</span>
                <FontAwesomeIcon icon={['fas', 'bell-concierge']} size='lg' />
              </a>
            </li>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-6' onClick={() => handleSelect(6)}>
                <span>Booking</span>
                <FontAwesomeIcon icon={['far', 'calendar-alt']} size='lg' />
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Charts */}
            <li className="nav-item">
              <a href='#!' className="nav-link">
                <span>Charts</span>
                <FontAwesomeIcon icon={['fas', 'chart-simple']} size='lg' />
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Tables */}
            <li className="nav-item">
              <a href='#!'  className="nav-link">
                <span>Statistic</span>
                <FontAwesomeIcon icon={['fas', 'chart-line']} size='lg' />
              </a>
            </li>
            <li className="nav-item ">
              <a href='#!' className="nav-link" id='item-8' onClick={() => handleSelect(8)}>
                <span>Accounts</span>
                <FontAwesomeIcon icon={['fas', 'user']} size='lg' />
              </a>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
          </ul>
          {/* End of Sidebar */}
        </div>
        <div id='content'>
          <Headbar />
          {Id === 1 ? <MainContent /> : ''}
          {Id === 2 ? <CategoryPage /> : ''}
          {Id === 3 ? <ProductPage /> : ''}
          {Id === 4 ? <OrderPage /> : ''}
          {Id === 5 ? <ServicePage /> : ''}
          {Id === 6 ? <BookingPage /> : ''}
          {Id === 8 ? <AccountPage/> : ''}

          <Footer />
        </div>
      </div>
    </>
  )
}

export default AdminIndex
