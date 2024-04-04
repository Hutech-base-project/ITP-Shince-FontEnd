import React from 'react'
import moment from 'moment'
import momentTimezone from 'moment-timezone'
import { useState } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { get_all_booking, put_booking } from '../../../redux/Booking/booking_page_thunk'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify'
import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { get_all_employees } from '../../../redux/Account/account_page_thunk'
import { post_voucher_auto } from '../../../redux/Voucher/voucher_page_thunk'

const localizer = momentLocalizer(moment)
const BookingPage = (props) => {
    const [listBooking, setListBooking] = useState([]);
    const [listEvent, setListEvent] = useState([]);
    const [detailsShow, setDetailsShow] = useState(false);
    const [dataUser, setDataUser] = useState(undefined)
    const [employees, setEmployees] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_all_employees()).then((res) => {
            if (!res.error) {
                setEmployees(res.payload);
            }
        });
        dispatch(get_all_booking()).then((res) => {
            if (!res.error) {
                setListBooking(res.payload.responseData);
            }
        });
    }, [dispatch, detailsShow]);

    useEffect(() => {
        let event = [];
        listBooking?.forEach((emp) => {
            var colorEvento = '';
            var color = '';
            if (emp.boStatus === "Waiting") {
                colorEvento = '#3174ad';
                color = 'white'
            } else if (emp.boStatus === "Cancelled") {
                colorEvento = 'red';
                color = 'white'
            } else if (emp.boStatus === "Completed") {
                colorEvento = 'green';
                color = 'white'
            } else {
                colorEvento = 'yellow';
                color = 'black'
            }
            var start = new Date(moment(emp.boStartTime).subtract({ hour: 7, minute: 0 }));
            var end = new Date(moment(emp.boEndTime).subtract({ hour: 7, minute: 0 }));
            const obj = {
                listBooking: listBooking,
                employees: employees,
                booking: emp,
                title: emp.boId.toString(),
                start: start,
                end: end,
                colorEvento: colorEvento,
                color: color
            };
            event.push(obj)
        })
        setListEvent(event);
    }, [listBooking, employees]);

    let allViews = Object.keys(Views).map((k) => Views[k])
    return (
        <>
            <div>
                <Calendar
                    localizer={localizer}
                    defaultView={Views.MONTH}
                    events={listEvent}
                    showMultiDayTimes
                    step={30}
                    views={allViews}
                    style={{ height: 800 }}
                    onSelectEvent={(slotInfo)=>{
                        if(props.dodertor){
                            setDetailsShow(true);
                            setDataUser(slotInfo);
                        }
                    }}
                    eventPropGetter={(myEventsList) => {
                        const backgroundColor = myEventsList.colorEvento;
                        const color = myEventsList.color;
                        return { style: { backgroundColor, color, marginBottom: 5 } }
                    }}
                />
            </div>
            <div className="show-details">
                <BookingDetails
                    show={detailsShow}
                    data={dataUser}
                    onHide={() => {
                        setDetailsShow(false)
                        setDataUser(null)
                    }}
                />
            </div>
            <ToastContainer />
        </>
    )
}

/* eslint-disable */
const BookingDetails = (props) => {
    const dispatch = useDispatch();
    const [bookingDetail, setBookingDetail] = useState({});
    const [dataEmployees, setDataEmployees] = useState([]);
    const [employye, setEmployee] = useState(null);
    const [listEmployye, setListEmployye] = useState([]);
    const [listBooking, setListBooking] = useState([]);
    const [selectEmp, setSelectEmp] = useState('');
    const [checkStatus, setCheckStatus] = useState(true);
    const [checkEmployye, setCheckEmployye] = useState(true);
    const listPrice = [5, 10, 15, 20, 25, 30, 35, 40, 50];
    const [priceActive, setPriceActive] = useState(null);
    const [dateNow] = useState(momentTimezone().utc().tz("Asia/Saigon"));

    const [voucherAuto, setVoucherAuto] = useState({
        createdAt: moment(new Date(dateNow)).format('l'),
        expirationDate: moment(new Date(dateNow)).add(30, 'days').format('l'),
        isDelete: true,
        phoneNumber: "",
        userId: "",
        voCount: 1,
        voDescription: "",
        voId: "",
        voName: "",
        voPrice: 0,
        voProduct: true,
        voService: false,
        voTypeAuto: true
    });
    useEffect(() => {
        setBookingDetail({})
        setCheckStatus(true);
        setCheckEmployye(true);
        setSelectEmp('');
        setEmployee(null);
        setBookingDetail(() => ({
            ...props.data?.booking,
        }));
        setDataEmployees(props.data?.employees);
        setListBooking(props.data?.listBooking);

        if (props.data?.booking.boPhoneNo !== null) {
            setVoucherAuto((preState) => ({
                ...preState,
                phoneNumber: props.data?.booking.boPhoneNo,
            }));
        }
    }, [props]);

    useEffect(() => {
        let empFil = [];
        dataEmployees?.forEach(element => {
            if (listBooking?.some((bo) => bo.boStartTime === bookingDetail.boStartTime && props.data?.booking.employeeId === element.usId) === false) {
                empFil.push(element);
            }
        });
        setListEmployye(empFil);
    }, [dataEmployees]);

    useEffect(() => {
        if (props.data?.booking !== undefined) {
            if (props.data?.booking.employeeId !== null) {
                dataEmployees?.forEach(element => {
                    if (element.usId === props.data?.booking.employeeId) {
                        setEmployee(element);
                        setCheckEmployye(false);
                    }
                });
            }
        }
    }, [dataEmployees, props, bookingDetail, listBooking]);

    const handleChangeSelect = (event) => {
        setBookingDetail((preState) => ({
            ...preState,
            employeeId: event.target.value,
        }));
        setSelectEmp(event.target.value);
        setCheckEmployye(false);
    };

    const hanldeChange = (e) => {
        setBookingDetail((preState) => ({
            ...preState,
            boStatus: e.target.value,
        }));
        setCheckStatus(false);
    }

    const handelUpdate = () => {
        if (priceActive !== null) {
            if (checkStatus === false && checkEmployye === false) {
                dispatch(post_voucher_auto(voucherAuto)).then((res) => {
                    if (!res.error) {
                        dispatch(put_booking(bookingDetail)).then((res1) => {
                            if (!res1.error) {
                                toast.success('Update order service success !', {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 600
                                });
                                props.onHide();
                            } else {
                                toast.error(res1.payload, {
                                    position: toast.POSITION.TOP_RIGHT,
                                    autoClose: 600
                                });
                                props.onHide();
                            }
                        });
                    } else {
                        toast.error(res.payload, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 600
                        });
                    }
                });
                
            }
        } else {
            if (checkStatus === false && checkEmployye === false) {
            dispatch(put_booking(bookingDetail)).then((res1) => {
                if (!res1.error) {
                    toast.success('Update order service success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error(res1.payload, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                }
            });
        }
        }
        
    };

    return (
        <Modal
            {...props}
            size="lg"
            className="modal-detail"
        >
            <Modal.Header className="modal-detail-header" closeButton >
            </Modal.Header>
            <Modal.Body className="modal-detail-body">
                <Form>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Booking code</span>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control className="modal-detail-input" type="text" defaultValue={bookingDetail?.boId} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Customer code</span>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control className="modal-detail-input" type="text" defaultValue={bookingDetail?.userId !== null ? bookingDetail?.userId : "Passers"} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Phone number</span>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control className="modal-detail-input" type="text" defaultValue={bookingDetail?.boPhoneNo} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Time</span>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control className="modal-detail-input" type="text" defaultValue={moment(bookingDetail?.boStartTime).subtract({ hour: 7, minute: 0 }).format("DD/MM/yyyy HH:mm")} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Select stylist</span>
                        </Col>
                        <Col xs={9} className='modal-detail-select'>
                            {employye !== null ?
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select stylist</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={bookingDetail?.employeeId}
                                        label="Select stylist"
                                        style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                                        onChange={handleChangeSelect}
                                        disabled
                                    >
                                        <MenuItem value={employye.usId} selected>
                                            <Grid container spacing={2}>
                                                <Grid item xs={2} className="emp-avatar" >
                                                    <Avatar alt="Remy Sharp" src={employye.usImage} style={{ marginRight: 10 }} />
                                                </Grid>
                                                <Grid item xs={4} className="emp-name" >
                                                    {employye.usUserName}
                                                </Grid>
                                            </Grid>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                :
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select stylist</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectEmp}
                                        label="Select stylist"
                                        style={{ width: '100%', height: 'auto', marginBottom: 20 }}
                                        onChange={handleChangeSelect}
                                    >
                                        {listEmployye?.map((emp) => {
                                            return (
                                                <MenuItem value={emp.usId} key={emp.usId}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2} className="emp-avatar" >
                                                            <Avatar alt="Remy Sharp" src={emp.usImage} style={{ marginRight: 10 }} />
                                                        </Grid>
                                                        <Grid item xs={4} className="emp-name">
                                                            {emp.usUserName}
                                                        </Grid>
                                                    </Grid>
                                                </MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            }
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Status</span>
                        </Col>
                        <Col xs={9}>
                            <Form.Group className="mb-3 modal-detail-radio" controlId="exampleForm.ControlInput1">
                                <Form.Check
                                    inline
                                    label="Waiting"
                                    name="boStatus"
                                    value="Waiting"
                                    onChange={hanldeChange}
                                    type='radio'
                                    defaultChecked={props.data?.booking.boStatus !== undefined ? (props.data?.booking.boStatus === "Waiting" ? true : false) : false}
                                    disabled
                                />
                                <Form.Check
                                    inline
                                    label="In process"
                                    name="boStatus"
                                    value="In process"
                                    onChange={hanldeChange}
                                    type='radio'
                                    defaultChecked={props.data?.booking.boStatus === "In process" ? true : false}
                                    disabled={props.data?.booking.boStatus !== undefined ? (props.data?.booking.boStatus !== "Waiting" ? true : false) : false}
                                />
                                <Form.Check
                                    inline
                                    label="Completed"
                                    name="boStatus"
                                    value="Completed"
                                    onChange={hanldeChange}
                                    type='radio'
                                    defaultChecked={props.data?.booking.boStatus === "Completed" ? true : false}
                                    disabled={props.data?.booking.boStatus !== undefined ? (props.data?.booking.boStatus !== "In process" ? true : false) : false}
                                />
                                <Form.Check
                                    inline
                                    label="Cancelled"
                                    name="boStatus"
                                    value="Cancelled"
                                    onChange={hanldeChange}
                                    type='radio'
                                    defaultChecked={props.data?.booking.boStatus === "Cancelled" ? true : false}
                                    disabled={props.data?.booking.boStatus !== undefined ? (props.data?.booking.boStatus !== "Waiting" ? true : false) : false}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    {bookingDetail?.userId !== null && bookingDetail.boStatus === "Completed" ?
                        <Row>
                            <Col xs={3}>
                                <span className="modal-detail-label">Give away discount code</span>
                            </Col>
                            <Col xs={9} style={{ marginBottom: 50 }}>
                                <Row>
                                    {
                                        listPrice.map((ser) => {
                                            return (
                                                <Col xs={1} key={ser} className="btn-select">
                                                    <Button variant="secondary" className="btn-select-price"
                                                        id={'price-' + ser}
                                                        onClick={(e) => {
                                                            if (document.getElementById('price-' + ser).classList.contains("price-active")) {
                                                                document.getElementById('price-' + ser).classList.remove("price-active");
                                                                setPriceActive(null);
                                                                setVoucherAuto((preState) => ({
                                                                    ...preState,
                                                                    userId: bookingDetail?.userId,
                                                                    voName: "",
                                                                    voPrice: 0,
                                                                }));
                                                            } else {
                                                                if (priceActive !== null) {
                                                                    document.getElementById('price-' + priceActive).classList.remove("price-active");
                                                                }
                                                                document.getElementById('price-' + ser).classList.add("price-active");
                                                                setPriceActive(ser);
                                                                setVoucherAuto((preState) => ({
                                                                    ...preState,
                                                                    userId: bookingDetail?.userId,
                                                                    voName: "Coupon " + ser + "$",
                                                                    voPrice: ser,
                                                                }));
                                                            }
                                                        }}
                                                    >
                                                        {ser} <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                                                    </Button>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row> : null
                    }

                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Services</span>
                        </Col>
                        <Col xs={9}>
                            {bookingDetail?.listSer !== undefined ?
                                bookingDetail?.listSer.map((ser) => {
                                    return <p className="modal-detail-service " key={ser.bodServiceId}>{ser.bodServiceName}</p>;
                                }) : null
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <span className="modal-detail-label">Total</span>
                        </Col>
                        <Col xs={9}>
                            <p className="modal-detail-total">{bookingDetail?.boTotal} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></p>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="modal-detail-footer">
                {props.data?.booking.boStatus === "Cancelled" || props.data?.booking.boStatus === "Completed" ?
                    <Button variant="secondary" className="btn-closes" onClick={props.onHide}>
                        Close
                    </Button>
                    :
                    <Button variant="primary" className="btn-update" onClick={handelUpdate} disabled={checkStatus === false && checkEmployye === false ? false : true}>
                        Update
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}


export default BookingPage