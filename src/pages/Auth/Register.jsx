import React, { useEffect, useRef, useState } from 'react';
import { Alert, Col, Container, Form, Spinner, Row,} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { validate } from 'validate.js';
import { RegisterPageValidate } from '../../utils/validate';
import {  check_register, register } from "../../redux/Auth/auth_page_thunk";
import {  selectErrorRegister, selectLoading } from '../../redux/Auth/auth_page_selecter';
import OTPInput from 'react-otp-input';
import { generate_otp, validate_otp } from '../../redux/Otp/otp_page_thunk';
import { selectErrorOtp } from '../../redux/Otp/otp_page_selecter';
import {  toast } from 'react-toastify';

const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);
const Register = ()=> {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectLoading);
    const errorOtp = useSelector(selectErrorOtp);
    const [messageOTP, setMessageOTP] = useState("");
    const [timeOtp, setTimeOtp] = useState(300);
    const [checkAccount, setCheckAccount] = useState(false);
    const [message, setMessage] = useState("");
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
                    }else{
                        setMessageOTP(res.payload);
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
                    <h3 className="register-heading">Register</h3>
                    <Row className='register-form'>
                        {errorRegister === true ? (
                            <Alert key={'warning'} variant={'warning'}>
                                {message}!
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

export default Register