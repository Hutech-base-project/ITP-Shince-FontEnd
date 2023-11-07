import React from 'react'
import '../../assets/scss/Admin/Sidebar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Sidebar = () => {
  return (
    <>
      <>
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
          <li className="nav-item active">
            <a className="nav-link" href="index.html">
              <span>Dashboard</span>
              <FontAwesomeIcon icon={['fas', 'gauge']} size='lg' />
            </a>
          </li>
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item ">
            <a className="nav-link" href="/category">
              <span>Categories</span>
              <FontAwesomeIcon icon={['fas', 'list']} size='lg' />
            </a>
          </li>
           {/* Divider */}
           <hr className="sidebar-divider my-0" />
          {/* Nav Item - Utilities Collapse Menu */}
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <span>Products</span>
              <FontAwesomeIcon icon={['fas', 'gift']} size='lg' />
            </a>
          </li>
      
          {/* Nav Item - Pages Collapse Menu */}
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <span>Orders</span>
              <FontAwesomeIcon icon={['fas', 'user']} size='lg' />
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <span>Services</span>
              <FontAwesomeIcon icon={['fas', 'bell-concierge']} size='lg' />
            </a>
          </li>
           {/* Divider */}
           <hr className="sidebar-divider my-0" />
          {/* Nav Item - Charts */}
          <li className="nav-item">
            <a className="nav-link" href="charts.html">          
              <span>Charts</span>
              <FontAwesomeIcon icon={['fas', 'chart-simple']} size='lg' />
            </a>
          </li>
           {/* Divider */}
           <hr className="sidebar-divider my-0" />
          {/* Nav Item - Tables */}
          <li className="nav-item">
            <a className="nav-link" href="charts.html">
              <span>Statistic</span>
              <FontAwesomeIcon icon={['fas', 'chart-line']} size='lg' />
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="index.html">
              <span>Accounts</span>
              <FontAwesomeIcon icon={['fas', 'a']} size='lg' />
            </a>
          </li>
          {/* Divider */}
          <hr className="sidebar-divider d-none d-md-block" />
          {/* Sidebar Toggler (Sidebar) */}
        </ul>
        {/* End of Sidebar */}
      </>

    </>
  )
}

export default Sidebar
