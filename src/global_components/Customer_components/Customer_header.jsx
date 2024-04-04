import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Nav, Navbar, Row, Tab, Tabs, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get_session, logout } from "../../redux/Auth/auth_page_thunk";
import { ToastContainer } from 'react-toastify';
import { selectCartPro } from '../../redux/Cart/cart_page_selecter';
import { get_all_products } from '../../redux/Product/product_page_thunk';
import { removeCart } from '../../redux/Cart/cart_page_reducer';
import Login from '../../pages/Auth/Login';
import Register from '../../pages/Auth/Register';

 /* eslint-disable */ 
const CustomerHeader = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(selectCartPro);
    const [niceSelcet, setNiceSelect] = useState(false);
    const [sizeScreen, setSizeScreen] = useState(window.innerWidth);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState([]);
    const [dataListPro, setDataListPro] = useState([]);

    function handleNiceSelect() {
        if (niceSelcet === false) {
            document.getElementById("nice-select-list").classList.add('open');

            setNiceSelect(true);
        } else {
            document.getElementById("nice-select-list").classList.remove('open');
            setNiceSelect(false);
        }
    }


    useEffect(() => {
        if (sessionStorage.getItem("id") !== null) {
            dispatch(get_session(sessionStorage.getItem("id"))).then((res) => {
                if (!res.error) {
                    setUser(res.payload.responseData);
                }
            });
        }
        dispatch(get_all_products()).then((res) => {
            setDataListPro(res.payload?.responseData);
        });
    }, [dispatch]);
    useEffect(() => {
        if (sizeScreen <= 991) {
            document.getElementById('middle').style.display = 'none'
        } else {
            document.getElementById('middle').style.display = 'block'
        }
    }, [sizeScreen])

    window.addEventListener("resize", function (e) {
        setSizeScreen(this.window.innerWidth)
    });

    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 100) {
            this.document.getElementById("navbar").classList.add("sticky")
        } else {
            if(this.document.getElementById("navbar").classList.contains("sticky")){
                this.document.getElementById("navbar").classList.remove("sticky")
            }
            
        }
    });
    const totalPrice = () => {
        let total = 0;
        cartList?.forEach(cart => {
            total = total + (cart.proProductPrice * cart.proQuantity)
        });
        return total.toFixed(2);
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const hanldeRemoveItem = (e) => dispatch(removeCart(e));

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
            <header className="header">
                <div className="middle-inner" id="middle">
                    <Container>
                        <Row>
                            <Col lg={2} md={2} xs={12}>
                                <div className="logo">
                                    <a href="/"><img src={require("../../assets/template/images/logo.png")} alt="logo" /></a>
                                </div>
                            </Col>
                            <Col xs={12} md={7} lg={8}></Col>
                            <Col xs={12} md={3} lg={2}>
                                <div className="right-bar">
                                    <Row>
                                        <div className="sinlge-bar">
                                            {user.length !== 0 ?
                                                <a href='/whish-list' className="single-icon">
                                                    <FontAwesomeIcon icon={['fas', 'heart']} size='lg' />
                                                </a>
                                                :
                                                null
                                            }
                                        </div>
                                        <div className="sinlge-bar shopping">
                                            <a hrefLang="!#"  type="button" className="single-icon">
                                                <FontAwesomeIcon icon={['fa', 'shopping-bag']} size='lg' />
                                                <span className="total-count">{cartList.length}</span>
                                            </a>
                                            <div className="shopping-item">
                                                <div className="dropdown-cart-header">
                                                    <span>{cartList.length} Items</span>
                                                </div>

                                                <ul className="shopping-list" style={{ height: cartList.length * 170, overflow: 'auto', maxHeight: 400 }}>
                                                    {cartList.length > 0 ?
                                                        React.Children.toArray(dataListPro?.map((item) => {
                                                            return (
                                                                React.Children.toArray(cartList?.map((cart) => {
                                                                    if (cart?.productId === item?.proId) {
                                                                        return (
                                                                            <>
                                                                                <li style={{ marginLeft: 10, marginRight: 10 }}>
                                                                                    <a hrefLang="!#"  type="button" className="remove" title="Remove this item" onClick={() => hanldeRemoveItem(cart?.productId)}><FontAwesomeIcon icon={['far', 'trash-alt']} /></a>
                                                                                    <a className="cart-img" hrefLang="!#"  type="button"><img src={process.env.REACT_APP_API_URL + "/image/product/" + item.featureImgPath} alt="!#" /></a>
                                                                                    <h4><a hrefLang="!#"  type="button">{item.proName}</a></h4>
                                                                                    <p className="quantity">{cart.proQuantity}x - <span className="amount">{item.proPrice}</span></p>
                                                                                </li>
                                                                            </>)
                                                                    }
                                                                    return null;
                                                                }))
                                                            )
                                                        })) :
                                                        <Col className='mess'>
                                                            <span >You have no products in your cart</span>
                                                        </Col>
                                                    }
                                                </ul>
                                                <div className="bottom">
                                                    <div className="total">
                                                        <span>Total</span>
                                                        <span className="total-amount">{totalPrice()}</span>
                                                    </div>
                                                    <a href='/cart' className="btn animate">View Cart</a>
                                                </div>
                                            </div>
                                            {/* <!--/ End Shopping Item --> */}
                                        </div>
                                        <div className="sinlge-bar">
                                            {user.length !== 0 ?
                                                (
                                                    <div className="drop-down">
                                                        <NavDropdown title={user.userName} id="basic-nav-dropdown">
                                                            <NavDropdown.Item href="/profile">
                                                                <FontAwesomeIcon className="drop-down-icon" icon={['fa', 'id-card']} size='lg' /> Profile
                                                            </NavDropdown.Item>
                                                            <NavDropdown.Item href="#action/3.2">
                                                                Another action
                                                            </NavDropdown.Item>
                                                            <NavDropdown.Divider />
                                                            <NavDropdown.Item hrefLang="!#" style={{ color: 'red' }} onClick={handleLogout}>
                                                                <FontAwesomeIcon className="drop-down-icon" icon={['fa', 'sign-out-alt']} size='lg' /> Logout
                                                            </NavDropdown.Item>
                                                        </NavDropdown>
                                                    </div>
                                                )
                                                // <h1>{user.userName}</h1>
                                                :
                                                <a role='button' className="single-icon" onClick={handleShow} hrefLang="!#"  type="button" title='login'>
                                                    <FontAwesomeIcon icon={['fa', 'user']} size='lg' />
                                                </a>
                                            }
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <ToastContainer />
                    </Container>
                </div>
                <div className="header-inner" id="navbar">
                    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg={sizeScreen > 991 ? "dark" : "light"} data-bs-theme={sizeScreen > 991 ? "dark" : "light"}>
                        <Container fluid={sizeScreen <= 991 ? true : false}>
                            {sizeScreen <= 991 ? <Navbar.Brand href={undefined}><img src={require("../../assets/template/images/logo.png")} alt="logo" /></Navbar.Brand> : ''}
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/product">Product</Nav.Link>
                                    <Nav.Link href="/service">Service</Nav.Link>
                                    <Nav.Link href="/booking">Booking</Nav.Link>
                                    <Nav.Link href="#pricing">About us</Nav.Link>
                                    <Nav.Link href="#pricing">Contact</Nav.Link>
                                </Nav>
                                {sizeScreen <= 991 ? <Nav>
                                    <Nav.Link href="#deets">More deets</Nav.Link>
                                    <Nav.Link eventKey={2} href="#memes">
                                        Dank memes
                                    </Nav.Link>
                                </Nav> : ''}

                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </header>

            {/*Login */}
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size='xl'
                show={show} onHide={handleClose}>
                <Container className='register'>
                    <Modal.Header className='btnClose' closeVariant={'white'} closeButton>
                    </Modal.Header>
                    <Row>
                        <Col className='register-left' md={3}>
                            <img src={require('../../assets/images/_JsH_ ALL YASHIRO  - Nene Nene Nene.jpg')} alt="" />
                            <h3>Welcome</h3>
                        </Col>
                        <Col className='register-right' md={9}>
                            <Tabs
                                defaultActiveKey="login"
                                id="justify-tab-example"
                                centered='true'
                            >
                                <Tab eventKey="login" title="Login">
                                    <Login />
                                </Tab>
                                <Tab eventKey="register" title="Register">
                                    <Register />
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </Modal>
        </>
    )


}

export default CustomerHeader