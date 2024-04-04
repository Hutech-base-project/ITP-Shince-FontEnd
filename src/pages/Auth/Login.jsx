import React, { useEffect, useRef, useState } from 'react';
import { Alert, Col, Container, Form,Spinner, Row,} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validate } from 'validate.js';
import { LoginPageValidate} from '../../utils/validate';
import { check_login, login,} from "../../redux/Auth/auth_page_thunk";
import { selectErrorLogin, selectLoading } from '../../redux/Auth/auth_page_selecter';
import OTPInput from 'react-otp-input';
import { generate_otp, validate_otp } from '../../redux/Otp/otp_page_thunk';
import { selectErrorOtp } from '../../redux/Otp/otp_page_selecter';
/* eslint-disable */ 
const Login =() => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectLoading);
    const errorLogin = useSelector(selectErrorLogin);
    const errorOtp = useSelector(selectErrorOtp);
    const [errorLoginCount, setErrorLoginCount] = useState(false);
    const [timeOtp, setTimeOtp] = useState(300);
    const [checkAccount, setCheckAccount] = useState(false);
    const [openSubmit, setOpenSubmit] = useState(true);
    const [messageOTP, setMessageOTP] = useState("");
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
                                sessionStorage.setItem("id", ress.payload.responseData.id + ress.payload.responseData.phoneNumber);
                                if (ress.payload.responseData.roles.some((rol) => rol !== "ROLE_USER") === false) {
                                    navigate(0);
                                } else {
                                    window.location = '/system_itp_shine';
                                }
                            }
                        });
                    }else{
                        setMessageOTP(res.payload);
                    }
                })
        }
    }

    const handleSentOtp = () => {
        if (timeOtp <= 0) {
            dispatch(generate_otp({ phoneNumber: dataLogin.phoneNumber })).then((res) => {
                if (!res.error) {
                    setTimeOtp(3000);
                    countRef.current = setInterval(() => {
                        setTimeOtp((timer) => timer - 1)
                    }, 1000)
                } else {
                    setMessageOTP(res.payload);
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
                                {messageOTP}
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

export default Login