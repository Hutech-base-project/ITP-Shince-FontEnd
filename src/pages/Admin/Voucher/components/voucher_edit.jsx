import React, { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { validate } from 'validate.js';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { selectListVoucher, selectStatusVoucher } from '../../../../redux/Voucher/voucher_page_selecter';
import { put_voucher } from '../../../../redux/Voucher/voucher_page_thunk';
import { VoucherPageValidatePut } from '../../../../utils/validate';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { addDays } from '@syncfusion/ej2-react-schedule';
import moment from 'moment/moment';
/* eslint-disable */
const VoucherEdit = (props) => {
    const [checkDupliVoucherPut, setCheckDupliVoucherPut] = useState(false);
    const dataListVoucher = useSelector(selectListVoucher);
    const [dataPut, setDataPut] = useState({});
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusVoucher);
    const [statusEnd, setStatusEnd] = useState(null);
    const [errorEnd, setErrorEnd] = useState(false);
    const [errorEndMessage, setErrorEndMessage] = useState(null);
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
        setDataPut(props.voucher);
        setDataPut((pre) => ({
            ...pre,
            createdAt: moment(props.voucher.createdAt).format('l'),
            expirationDate: moment(props.voucher.expirationDate).format('l'),
        }));
    }, [props])

    const [validationPut, setValidationPut] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPut, VoucherPageValidatePut);
        setValidationPut((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPut]);

    const hasErrorPut = (field) => {
        return validationPut.touched[field] && validationPut.errors[field]
            ? true
            : false;
    };

    useEffect(() => {
        if (dataListVoucher.length !== 0) {
            if (
                dataListVoucher.responseData.some((ser) => ser.voId !== dataPut?.voId && ser?.voName === dataPut?.voName) === true
            ) {
                setCheckDupliVoucherPut(true);
            } else {
                setCheckDupliVoucherPut(false);
            }
        }
    }, [dataListVoucher, dataPut?.voId, dataPut?.voName]);

    const hanldeChangePut = (e) => {
        setDataPut((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    const hanldeVoucherPut = () => {
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                voName: true,
                voDescription: true,
                voPrice: true,
                voCount: true,
            },
        }));

        if (dataPut.expirationDate === null) {
            setErrorEnd(true);
            setStatusEnd("invalidDate");
        }
        if (validationPut.isvalid === true && checkDupliVoucherPut === false && errorEnd === false) {
            setValidationPut((pre) => ({
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

            dispatch(put_voucher(dataPut)).then((res) => {
                if (!res.error) {
                    toast.success('Update voucher success !', {
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
                        Edit Voucher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="VoucherName">
                            <Form.Label>Voucher name</Form.Label>
                            <Form.Control
                                type="text"
                                name="voName"
                                defaultValue={props.voucher.voName}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("voName") || checkDupliVoucherPut}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("voName") ? validationPut.errors.voName?.[0] : null
                                    || checkDupliVoucherPut === true ? "Genre name already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherDescription">
                            <Form.Label>Voucher description</Form.Label>
                            <Form.Control
                                type="text"
                                name="voDescription"
                                defaultValue={props.voucher.voDescription}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("voDescription")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("voDescription") ? validationPut.errors.voDescription?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherPrice">
                            <Form.Label>Voucher price</Form.Label>
                            <Form.Control
                                type="number"
                                name="voPrice"
                                defaultValue={parseFloat(props?.voucher.voPrice).toFixed(2)}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("voPrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("voPrice") ? validationPut.errors.voPrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="VoucherCount">
                            <Form.Label>Voucher count</Form.Label>
                            <Form.Control
                                type="number"
                                name="voCount"
                                defaultValue={props.voucher.voCount}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("voCount")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("voCount") ? validationPut.errors.voCount?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem label="Start">
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        defaultValue={dayjs(props.voucher.createdAt)}
                                        disabled
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                                <DemoItem label="Expiration Date">
                                    <DatePicker
                                        minDate={dayjs(minDateFormat)}
                                        maxDate={dayjs(maxDateFormat)}
                                        format="DD/MM/YYYY"
                                        defaultValue={dayjs(props.voucher.expirationDate)}
                                        onError={(newError) => setStatusEnd(newError)}
                                        onChange={(newValue) => {
                                            setDataPut((preState) => ({
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="success" onClick={hanldeVoucherPut}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VoucherEdit