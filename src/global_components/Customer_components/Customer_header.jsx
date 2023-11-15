import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Col, Container, Form, Modal, Nav, Navbar, Spinner, Row, Tab, Tabs, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validate } from 'validate.js';
import { LoginPageValidate, RegisterPageValidate } from '../../utils/validate';
import { check_login, check_register, get_session, login, register } from "../../redux/Auth/auth_page_thunk";
import { selectError, selectErrorLogin, selectErrorRegister, selectLoading } from '../../redux/Auth/auth_page_selecter';
import OTPInput from 'react-otp-input';
import { generate_otp, validate_otp } from '../../redux/Otp/otp_page_thunk';
import { selectErrorOtp } from '../../redux/Otp/otp_page_selecter';
import { ToastContainer, toast } from 'react-toastify';
import { selectCartPro } from '../../redux/Cart/cart_page_selecter';
import { get_all_products } from '../../redux/Product/product_page_thunk';
import { removeCart } from '../../redux/Cart/cart_page_reducer';
import { OnChekOut } from '../../redux/Storage/storage_page_reducer';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

// /* eslint-disable */ 
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
            dispatch(get_session({ id: sessionStorage.getItem("id") })).then((res) => {
                if (!res.error) {
                    setUser(res.payload.responseData);
                }
            });
        }
        dispatch(get_all_products()).then((res) => {
            setDataListPro(res.payload.responseData);
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

    window.addEventListener('click', function click(e) {
        // if (!e.target.matches("#navbar")) {
        //     document.getElementById("responsive-navbar-nav").classList.remove("show")
        //     setCollapse(false);
        // }
    })

    window.addEventListener("scroll", function () {
        if (this.window.scrollY > 100) {
            this.document.getElementById("navbar").classList.add("sticky")
        } else {
            this.document.getElementById("navbar").classList.remove("sticky")
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
    const hanldeCheckOut = () =>  dispatch(OnChekOut());
    return (
        <>
            {/* <!-- Header --> */}
            <header className="header">
                <div className="middle-inner" id="middle">
                    <Container>
                        <Row>
                            <Col lg={2} md={2} xs={12}>
                                {/* Logo */}
                                <div className="logo">
                                    <a href="/"><img src={require("../../assets/template/images/logo.png")} alt="logo" /></a>
                                </div>
                            </Col>
                            <Col xs={12} md={7} lg={8}>
                                <div className="search-bar-top">
                                    <div className="search-bar">
                                        <Row>
                                            <Col md={3} className='search-bar-select' >
                                                <div className="nice-select" >
                                                    <button className="current" onClick={handleNiceSelect}>
                                                        <span className='title-select'>All Category</span>
                                                        <span className='icon'>
                                                            {niceSelcet === false ?
                                                                <FontAwesomeIcon icon={['fas', 'chevron-up']} />
                                                                :
                                                                <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                                                            }
                                                        </span>
                                                    </button>
                                                    <ul id="nice-select-list" className="list" >
                                                        <li data-value="watch" className="option">watch</li>
                                                        <li data-value="mobile" className="option">mobile</li>
                                                        <li data-value="kid’s item" className="option">kid’s item</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={9} className='search-bar-input'>
                                                <input name="search" placeholder="Search Products Here....." type="text" />
                                                <button className="btnn">
                                                    <FontAwesomeIcon icon={['fas', 'search']} size='lg' />
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={3} lg={2}>
                                <div className="right-bar">
                                    <Row>
                                        {/* <!-- Search Form --> */}
                                        <div className="sinlge-bar">
                                            <a hrefLang='!#' className="single-icon">
                                                <FontAwesomeIcon icon={['fas', 'heart']} size='lg' />
                                            </a>
                                        </div>
                                        <div className="sinlge-bar shopping">
                                            <a hrefLang='!#' className="single-icon">
                                                <FontAwesomeIcon icon={['fa', 'shopping-bag']} size='lg' />
                                                <span className="total-count">{cartList.length}</span>
                                            </a>
                                            {/* <!-- Shopping Item --> */}
                                            <div className="shopping-item">
                                                <div className="dropdown-cart-header">
                                                    <span>{cartList.length} Items</span>
                                                </div>

                                                <ul className="shopping-list" style={{ height: cartList.length * 170, overflow: 'auto',maxHeight:400 }}>
                                                    {cartList.length > 0 ?
                                                        React.Children.toArray(dataListPro?.map((item) => {
                                                            return (
                                                                React.Children.toArray(cartList?.map((cart) => {
                                                                    if (cart?.productId === item?.proId) {
                                                                        return (
                                                                            <>
                                                                                <li style={{marginLeft:10,marginRight:10}}>
                                                                                    <a hrefLang='!#' className="remove" title="Remove this item" onClick={()=>hanldeRemoveItem(cart?.productId)}><FontAwesomeIcon icon={['far', 'trash-alt']} /></a>
                                                                                    <a className="cart-img" hrefLang='!#'><img src={process.env.REACT_APP_API_URL + "/image/product/" + item.featureImgPath} alt="!#" /></a>
                                                                                    <h4><a hrefLang='!#'>{item.proName}</a></h4>
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
                                                            <NavDropdown.Item href="#action/3.4" style={{ color: 'red' }}>
                                                                <FontAwesomeIcon className="drop-down-icon" icon={['fa', 'sign-out-alt']} size='lg' /> Logout
                                                            </NavDropdown.Item>
                                                        </NavDropdown>
                                                    </div>
                                                )
                                                // <h1>{user.userName}</h1>
                                                :
                                                <a role='button' className="single-icon" onClick={handleShow} hrefLang='!#' title='login'>
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
                {/* <!-- Header Inner --> */}
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
                {/* <!--/ End Header Inner --> */}
            </header>
            {/* <!--/ End Header --> */}

            {/*Login */}
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size='xl'
                centered
                show={show} onHide={handleClose}>
                <Container className='register'>
                    <Modal.Header className='btnClose' color='#fff' closeButton>
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
    /*Login Form*/
    function Login() {
        const [otp, setOtp] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const loading = useSelector(selectLoading);
        const errorLogin = useSelector(selectErrorLogin);
        const errorOtp = useSelector(selectErrorOtp);
        const [errorLoginCount, setErrorLoginCount] = useState(false);
        const [errorCountOtp, setErrorCountOtp] = useState(false);
        const [timeOtp, setTimeOtp] = useState(300);
        const [checkAccount, setCheckAccount] = useState(false);
        const [openSubmit, setOpenSubmit] = useState(true);
        const [message, setMessage] = useState("");
        const countRef = useRef(null);
        const [dataLogin, setDataLogin] = useState({
            phoneNumber: "",
            password: "",
        });
        const [validationLogin, setValidationLogin] = useState({
            touched: {},
            errors: {},
            isvalid: false,
        });

        // useEffect(() => {
        //     dispatch(turnOffError())
        // }, [dispatch])
        useEffect(() => {
            if (otp.length === 5) {
                setOpenSubmit(false);
            } else {
                setOpenSubmit(true);
            }
        }, [otp])


        useEffect(() => {
            const errors = validate.validate({ phoneNumber: dataLogin.phoneNumber, password: dataLogin.password }, LoginPageValidate);
            setValidationLogin((pre) => ({
                ...pre,
                isvalid: errors ? false : true,
                errors: errors || {},
            }));
        }, [dataLogin]);

        const hasErrorLogin = (field) => {
            return validationLogin.touched[field] && validationLogin.errors[field] ? true : false;
        };

        const handleChangeLogin = (event) => {
            setDataLogin((preState) => ({
                ...preState,
                [event.target.name]: event.target.value,
            }));
            setValidationLogin((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    [event.target.name]: true,
                },
            }));
        };

        const handleCheckLogin = () => {
            setValidationLogin((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    password: true,
                    email: true,
                },
            }));
            if (validationLogin.isvalid === true) {
                dispatch(check_login({ dataLogin }))
                    .then((res) => {
                        if (!res.error) {
                            dispatch(generate_otp({ phoneNumber: dataLogin.phoneNumber })).then((res) => {
                                if (!res.error) {
                                    setTimeOtp(300);
                                    countRef.current = setInterval(() => {
                                        setTimeOtp((timer) => timer - 1)
                                    }, 1000)
                                    setCheckAccount(true);
                                } else {
                                    setErrorLoginCount(true);
                                }
                            });

                        }else{
                            console.log(res)
                            setMessage(res.payload);
                        }
                    })
            }
        };

        const handleCheckOtp = () => {
            if (openSubmit === false) {
                let dataOtp = {
                    otp: otp,
                    phoneNumber: dataLogin.phoneNumber
                }
                dispatch(validate_otp({ dataOtp }))
                    .then((res) => {
                        if (!res.error) {
                            let data = {
                                phoneNumber: dataLogin.phoneNumber,
                                password: dataLogin.password,
                                otp: otp,
                            }
                            dispatch(login({ data })).then((ress) => {
                                if (!ress.error) {
                                    sessionStorage.setItem("id", ress.payload.responseData.id + ress.payload.responseData.userName);
                                    if (ress.payload.responseData.roles.some((rol) => rol !== "ROLE_USER") === false) {
                                        navigate(0);
                                    } else {
                                        window.location = '/system_itp_shine';
                                    }
                                }
                            });
                        }
                    })
            }
        }

        const handleSentOtp = () => {
            errorOtp = false;
            if (timeOtp <= 0) {
                dispatch(generate_otp({ phoneNumber: dataLogin.phoneNumber })).then((res) => {
                    if (!res.error) {
                        setTimeOtp(3000);
                        countRef.current = setInterval(() => {
                            setTimeOtp((timer) => timer - 1)
                        }, 1000)
                    } else {
                        setErrorCountOtp(true);
                    }
                });
            }
        }

        const handleBack = () => {
            setCheckAccount(false);
            setOtp("");
        }
        return (
            <>
                {!checkAccount ?
                    <Col sx={12} sm={12} md={12}>
                        <h3 className="register-heading">Login</h3>
                        <Row className='register-form'>
                            {errorLogin === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    {message} !
                                </Alert>
                            ) : null}
                            {errorLoginCount === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    You have logged in multiple times, please try again later!
                                </Alert>
                            ) : null}
                            <Form as={Col}>
                                <Form.Group className="mb-3" controlId="formLoginUserName">
                                    <Form.Control
                                        className='form-control input-form'
                                        type="text"
                                        placeholder="Phone number"
                                        name="phoneNumber"
                                        value={dataLogin.phoneNumber === null ? null : dataLogin.phoneNumber}
                                        onChange={handleChangeLogin}
                                        isInvalid={hasErrorLogin("phoneNumber")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorLogin("phoneNumber") ? validationLogin.errors.phoneNumber?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLoginformPassword">
                                    <Form.Control
                                        className='input-form'
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={dataLogin.password === null ? null : dataLogin.password}
                                        onChange={handleChangeLogin}
                                        isInvalid={hasErrorLogin("password")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorLogin("password") ? validationLogin.errors.password?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    {loading === true ? (
                                        <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : <Form.Control
                                        className="btnRegister"
                                        type="submit"
                                        value="Login"
                                        onClick={handleCheckLogin}
                                    />}
                                </Form.Group>
                            </Form>
                        </Row>
                    </Col>
                    :
                    <Col sx={12} sm={12} md={12}>
                        <h3 className="register-heading">Verify Your Account</h3>
                        <h6 className="register-span">Sent to: {dataLogin.phoneNumber.toString()}</h6>
                        <Row className='register-form'>
                            {errorOtp === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    Otp is incorrect or expired!
                                </Alert>
                            ) : null}
                            {errorCountOtp === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    You have requested to resend otp multiple times, please try again later!
                                </Alert>
                            ) : null}
                            <Form as={Col}>
                                <Form.Group className="mb-3" controlId="formLoginUserName">
                                    <Container>
                                        <OTPInput
                                            containerStyle={'otp'}
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={5}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                        <h6>Resend the otp code: <span className='otp-time'>{timeOtp > 0 ? timeOtp : <a hrefLang="#!" type='button' onClick={handleSentOtp}>Sent again?</a>}</span></h6>
                                    </Container>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    {loading === true ? (
                                        <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : <Form.Control
                                        className="btnRegister"
                                        type="submit"
                                        onClick={handleCheckOtp}
                                        disabled={openSubmit ? true : false}
                                    />}
                                </Form.Group>
                            </Form>

                            <a hrefLang="#!" className="btn-back" type='button' onClick={handleBack}>Back</a>
                        </Row>
                    </Col>
                }
            </>
        )
    }
    /*Register Form*/
    function Register() {
        const [otp, setOtp] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const loading = useSelector(selectLoading);
        const errorOtp = useSelector(selectErrorOtp);
        const [errorCountOtp, setErrorCountOtp] = useState(false);
        const [timeOtp, setTimeOtp] = useState(300);
        const [checkAccount, setCheckAccount] = useState(false);
        const [errorResgisterCount, setErrorResgisterCount] = useState(false);
        const [openSubmit, setOpenSubmit] = useState(true);
        const countRef = useRef(null);
        const errorRegister = useSelector(selectErrorRegister);
        const [dataRegister, setDataRegister] = useState({
            userName: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
        });
        const [validationRegister, setValidationRegister] = useState({
            touched: {},
            errors: {},
            isvalid: false,
        });

        // useEffect(() => {
        //     dispatch(turnOffError())
        // }, [dispatch])
        useEffect(() => {
            if (otp.length === 5) {
                setOpenSubmit(false);
            } else {
                setOpenSubmit(true);
            }
        }, [otp])
        useEffect(() => {
            const errors = validate.validate({ userName: dataRegister.userName, password: dataRegister.password, confirmPassword: dataRegister.confirmPassword, phoneNumber: dataRegister.phoneNumber }, RegisterPageValidate);
            setValidationRegister((pre) => ({
                ...pre,
                isvalid: errors ? false : true,
                errors: errors || {},
            }));
        }, [dataRegister]);

        const hasErrorRegister = (field) => {
            return validationRegister.touched[field] && validationRegister.errors[field] ? true : false;
        };

        const handleChangeRegister = (event) => {
            setDataRegister((preState) => ({
                ...preState,
                [event.target.name]: event.target.value,
            }));
            setValidationRegister((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    [event.target.name]: true,
                },
            }));
        };

        const handleRegister = async () => {
            setValidationRegister((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    password: true,
                    email: true,
                },
            }));
            if (validationRegister.isvalid === true) {
                dispatch(check_register({ phoneNumber: dataRegister.phoneNumber }))
                    .then(async (res) => {
                        if (!res.error) {
                            dispatch(generate_otp({ phoneNumber: dataRegister.phoneNumber })).then((res) => {
                                if (!res.error) {
                                    setTimeOtp(300);
                                    countRef.current = setInterval(() => {
                                        setTimeOtp((timer) => timer - 1)
                                    }, 1000)
                                    setCheckAccount(true);
                                } else {
                                    setErrorResgisterCount(true);
                                }
                            });
                        }
                    })
            }
        };


        const handleCheckOtp = () => {
            if (openSubmit === false) {
                let dataOtp = {
                    otp: otp,
                    phoneNumber: dataRegister.phoneNumber
                }
                dispatch(validate_otp({ dataOtp }))
                    .then((res) => {
                        if (!res.error) {
                            let data = {
                                userName: dataRegister.userName,
                                phoneNumber: dataRegister.phoneNumber,
                                password: dataRegister.password,
                                otp: otp,
                            }
                            dispatch(register({ data })).then(async (ress) => {
                                if (!ress.error) {
                                    toast.success('Resgister success !', {
                                        position: toast.POSITION.TOP_RIGHT
                                    });
                                    await delay(700)
                                    navigate(0);
                                }
                            });
                        }
                    })
            }
        }

        const handleSentOtp = () => {
            errorOtp = false;
            if (timeOtp <= 0) {
                dispatch(generate_otp({ phoneNumber: dataRegister.phoneNumber })).then((res) => {
                    if (!res.error) {
                        setTimeOtp(3000);
                        countRef.current = setInterval(() => {
                            setTimeOtp((timer) => timer - 1)
                        }, 1000)
                    } else {
                        setErrorCountOtp(true);
                    }
                });
            }
        }

        const handleBack = () => {
            setCheckAccount(false);
            setOtp("");
        }
        return (
            <>
                {!checkAccount ?
                    <Col sx={12} sm={12} md={12}>
                        <h3 className="register-heading">Register</h3>
                        <Row className='register-form'>
                            {errorRegister === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    Phone number has been registered!
                                </Alert>
                            ) : null}
                            {errorResgisterCount === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    You have logged in multiple times, please try again later!
                                </Alert>
                            ) : null}
                            <Form as={Col}>
                                <Form.Group className="mb-3" controlId="formRegisterUserName">
                                    <Form.Control
                                        className='input-form'
                                        type="text"
                                        name="userName"
                                        placeholder="Enter user name"
                                        value={dataRegister.userName === null ? null : dataRegister.userName}
                                        onChange={handleChangeRegister}
                                        isInvalid={hasErrorRegister("userName")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorRegister("userName") ? validationRegister.errors.userName?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formRegisterPhoneNumber">
                                    <Form.Control
                                        className='input-form'
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter phone number"
                                        value={dataRegister.phoneNumber === null ? null : dataRegister.phoneNumber}
                                        onChange={handleChangeRegister}
                                        isInvalid={hasErrorRegister("phoneNumber")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorRegister("phoneNumber") ? validationRegister.errors.phoneNumber?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formRegisterformPassword">
                                    <Form.Control
                                        className='input-form'
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={dataRegister.password === null ? null : dataRegister.password}
                                        onChange={handleChangeRegister}
                                        isInvalid={hasErrorRegister("password")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorRegister("password") ? validationRegister.errors.password?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Control
                                        className='input-form'
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Enter confirm password"
                                        value={dataRegister.confirmPassword === null ? null : dataRegister.confirmPassword}
                                        onChange={handleChangeRegister}
                                        isInvalid={hasErrorRegister("confirmPassword")}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {hasErrorRegister("confirmPassword") ? validationRegister.errors.confirmPassword?.[0] : null}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    {loading === true ? (
                                        <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) :
                                        <Form.Control
                                            className="btnRegister"
                                            type="submit"
                                            value="Register"
                                            onClick={handleRegister}
                                        />
                                    }
                                </Form.Group>
                            </Form>
                        </Row>
                    </Col>
                    :
                    <Col sx={12} sm={12} md={12}>
                        <h3 className="register-heading">Verify Your Account</h3>
                        <h6 className="register-span">Sent to: {dataRegister.phoneNumber.toString()}</h6>
                        <Row className='register-form'>
                            {errorOtp === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    Otp is incorrect or expired!
                                </Alert>
                            ) : null}
                            {errorCountOtp === true ? (
                                <Alert key={'warning'} variant={'warning'}>
                                    You have requested to resend otp multiple times, please try again later!
                                </Alert>
                            ) : null}
                            <Form as={Col}>
                                <Form.Group className="mb-3" controlId="formLoginUserName">
                                    <Container>
                                        <OTPInput
                                            containerStyle={'otp'}
                                            value={otp}
                                            onChange={setOtp}
                                            numInputs={5}
                                            renderSeparator={<span>-</span>}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                        <h6>Resend the otp code: <span className='otp-time'>{timeOtp > 0 ? timeOtp : <a hrefLang="#!" type='button' onClick={handleSentOtp}>Sent again?</a>}</span></h6>
                                    </Container>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    {loading === true ? (
                                        <Spinner animation="border" role="status" style={{ marginLeft: "48%" }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    ) : <Form.Control
                                        className="btnRegister"
                                        type="submit"
                                        onClick={handleCheckOtp}
                                        disabled={openSubmit ? true : false}
                                    />}
                                </Form.Group>
                            </Form>

                            <a hrefLang="#!" className="btn-back" type='button' onClick={handleBack}>Back</a>
                        </Row>

                    </Col>
                }
            </>
        )
    }
}

export default CustomerHeader