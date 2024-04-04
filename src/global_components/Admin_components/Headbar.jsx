import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../../assets/scss/Admin/Headbar.scss"
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Auth/auth_page_thunk';

const Headbar = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(sessionStorage.getItem("id"))).then((res) => {
        if (!res.error) {
            sessionStorage.removeItem("id");
            window.location = "/";
        }
    });
};
  return (
    <>
      <>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>
          <ul className="navbar-nav ml-auto">
            <div className="topbar-divider d-none d-sm-block" />
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="!#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {props.data?.usUserName}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src={props.data.usImage}
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <a className="dropdown-item" href="!#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </a>
                <div className="dropdown-divider" />
                <a
                style={{color:'red'}}
                  className="dropdown-item"
                  href="!#"
                  onClick={handleLogout}
                  data-toggle="modal"
                  data-target="!#logoutModal"
                >
                  <FontAwesomeIcon className="drop-down-icon" icon={['fa', 'sign-out-alt']} size='lg' /> Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </>
    </>
  )
}

export default Headbar
