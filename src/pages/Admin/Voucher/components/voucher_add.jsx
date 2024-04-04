import React from 'react'
import { selectStatusSer } from '../../../../redux/Service/service_page_selecter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { VoucherPageValidatePost } from '../../../../utils/validate';
import { validate } from 'validate.js';
import { toast } from 'react-toastify';
import { selectListVoucher } from '../../../../redux/Voucher/voucher_page_selecter';
import { post_voucher } from '../../../../redux/Voucher/voucher_page_thunk';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { addDays } from '@syncfusion/ej2-react-schedule';
import moment from 'moment';

const VoucherAdd = (props) => {
    const [checkDupliVocherPost, setCheckDupliVoucherPost] = useState(false);
    const dataListVoucher = useSelector(selectListVoucher);
    const isLoading = useSelector(selectStatusSer);
    const [statusStart, setStatusStart] = useState(null);
    const [statusEnd, setStatusEnd] = useState(null);
    const [errorStart, setErrorStart] = useState(true);
    const [errorEnd, setErrorEnd] = useState(true);
    const [errorStartMessage, setErrorStartMessage] = useState(null);
    const [errorEndMessage, setErrorEndMessage] = useState(null);
    const [dataPost, setDataPost] = useState({
        createdAt: null,
        expirationDate: null,
        voCount: "",
        voDescription: "",
        voName: "",
        voPrice: 0,
        voProduct: true,
        voService: true,
        voTypeAuto: false
    });

    const currentDate = new Date();
    const minDate = currentDate; // Current date
    const maxDate = addDays(currentDate, 60); // max date (30+ days)

    const dateObj = new Date(minDate);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    const minDateFormat = `${year}-${month}-${day}`;

    const dateObj1 = new Date(maxDate);

    const year1 = dateObj1.getFullYear();
    const month1 = String(dateObj1.getMonth() + 1).padStart(2, "0");
    const day1 = String(dateObj1.getDate()).padStart(2, "0");

    const maxDateFormat = `${year1}-${month1}-${day1}`;

    const dispatch = useDispatch();

    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        switch (statusStart) {
            case 'maxDate':
            case 'minDate': {
                setErrorStart(true);
                setErrorStartMessage('Please select a date in the first quarter of ' + year);
                break;
            }

            case 'invalidDate': {
                setErrorStart(true);
                setErrorStartMessage('Your date is not valid');
                break;
            }

            default: {
                setErrorStart(false);
                setErrorStartMessage(null);
                break;
            }
        }
    }, [statusStart, year, errorStart]);

    useEffect(() => {
        switch (statusEnd) {
            case 'maxDate':
            case 'minDate': {
                setErrorEnd(true);
                setErrorEndMessage('Please select a date in the first quarter of ' + year);
                break;
            }

            case 'invalidDate': {
                setErrorEnd(true);
                setErrorEndMessage('Your date is not valid');
                break;
            }

            case null: {
                setErrorEnd(false);
                setErrorEndMessage(null);
                break;
            }

            default: {
                break;
            }
        }
    }, [statusEnd, year, errorEnd]);

    useEffect(() => {
        const errors = validate.validate(dataPost, VoucherPageValidatePost);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));

    }, [dataPost]);

    useEffect(() => {
        if (dataListVoucher.length !== 0) {
            if (
                dataListVoucher.responseData.some((ser) => ser?.voName === dataPost?.voName.trim()) === true
            ) {
                setCheckDupliVoucherPost(true);
            } else {
                setCheckDupliVoucherPost(false);
            }
        }
    }, [dataListVoucher, dataPost?.voName]);

    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
    };

    const handleSelectProduct = (e) => {
        setDataPost((preState) => ({
            ...preState,
            voProduct: e.target.value === "true" ? true : false,
        }));
    };

    const handleSelectService = (e) => {
        setDataPost((preState) => ({
            ...preState,
            voService: e.target.value === "true" ? true : false,
        }));
    };

    const hanldeChangePost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    };

    const hanldePostVoucher = (e) => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                voName: true,
                voDescription: true,
                voPrice: true,
                voCount: true,
            },
        }));

        if (dataPost.createdAt === null || errorStart === true) {
            setErrorStart(true);
            setStatusStart("invalidDate");
        }
        if (dataPost.expirationDate === null || errorEnd === true) {
            setErrorEnd(true);
            setStatusEnd("invalidDate");
        }
        if (validationPost.isvalid === true && checkDupliVocherPost === false && errorStart === false && errorEnd === false) {         
            setValidationPost((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    voName: false,
                    voDescription: false,
                    voPrice: false,
                    voCount: false,
                    createdAt: false,
                    expirationDate: false,
                },
            }));
            dispatch(post_voucher(dataPost)).then((res) => {
                if (!res.error) {
                    setCheckDupliVoucherPost(false);
                    toast.success('Create voucher success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error(res.payload, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 1000
                    });
                    props.onHide();
                }
            });
        }
    };
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Service
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="VoucherName">
                            <Form.Label>Voucher name</Form.Label>
                            <Form.Control
                                type="text"
                                name="voName"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("voName") || checkDupliVocherPost}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("voName") ? validationPost.errors.voName?.[0] : null
                                    || checkDupliVocherPost === true ? "Genre name already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherDescription">
                            <Form.Label>Voucher description</Form.Label>
                            <Form.Control
                                type="text"
                                name="voDescription"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("voDescription")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("voDescription") ? validationPost.errors.voDescription?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherPrice">
                            <Form.Label>Voucher price</Form.Label>
                            <Form.Control
                                type="number"
                                name="voPrice"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("voPrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("voPrice") ? validationPost.errors.voPrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherCount">
                            <Form.Label>Voucher count</Form.Label>
                            <Form.Control
                                type="number"
                                name="voCount"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("voCount")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("voCount") ? validationPost.errors.voCount?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem label="Start">
                                    <DatePicker
                                        minDate={dayjs(minDateFormat)}
                                        maxDate={dayjs(maxDateFormat)}
                                        format='DD/MM/YYYY'
                                        onError={(newError) => setStatusStart(newError)}
                                        onChange={(newValue) => {
                                            setDataPost((preState) => ({
                                                ...preState,
                                                createdAt: moment(newValue).format('l'),
                                            }));
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                        {errorStart === true && statusStart !== null ? (
                            <div className="invalid-feedback" style={{ display: 'block' }}>{errorStartMessage}</div>
                        ) : null}

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem label="Expiration Date">
                                    <DatePicker
                                        minDate={dayjs(minDateFormat)}
                                        maxDate={dayjs(maxDateFormat)}
                                        format='DD/MM/YYYY'
                                        onError={(newError) => setStatusEnd(newError)}
                                        onChange={(newValue) => {
                                            setDataPost((preState) => ({
                                                ...preState,
                                                expirationDate: moment(newValue).format('l'),
                                            }));
                                        }}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                        {errorEnd === true && statusEnd !== null ? (
                            <div className="invalid-feedback" style={{ display: 'block' }}>{errorEndMessage}</div>
                        ) : null}
                        <Form.Group className="mb-3">
                            <Form.Label>Product</Form.Label>
                            <Form.Check
                                label="Yes"
                                name="voProduct"
                                onClick={handleSelectProduct}
                                type="radio"
                                id="voProduct"
                                value={true}
                                defaultChecked
                            />
                            <Form.Check
                                label="No"
                                name="voProduct"
                                onClick={handleSelectProduct}
                                type="radio"
                                id="voProduct"
                                value={false}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Service</Form.Label>
                            <Form.Check
                                label="Yes"
                                name="voService"
                                onClick={handleSelectService}
                                type="radio"
                                id="voService"
                                value={true}
                                defaultChecked
                            />
                            <Form.Check
                                label="No"
                                name="voService"
                                onClick={handleSelectService}
                                type="radio"
                                id="voService"
                                value={false}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanldePostVoucher}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VoucherAdd
