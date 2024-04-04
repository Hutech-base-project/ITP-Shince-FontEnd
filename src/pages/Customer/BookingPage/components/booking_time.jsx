import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, selectIdActiveTime, selectTime } from '../../../../redux/Booking/booking_page_selecter';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Alert, Button, Col,Row } from 'react-bootstrap';
import momentTimezone from 'moment-timezone'
import moment from 'moment'
import { addDate, addEmployye, addIdTimeActive, addTime, clearEmployye, clearTime } from '../../../../redux/Booking/booking_page_reducer';
import dayjs from 'dayjs';
import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { get_booking_by_emloyee } from '../../../../redux/Booking/booking_page_thunk';

const BookingTime = (props) => {
    const [dateNow] = useState(momentTimezone().utc().tz("Asia/Saigon"));
    const [timeNow] = useState(moment(new Date(dateNow)).format("HH:mm"));
    const [bookingEmp, setBookingEmp] = useState([]);
    const idActive = useSelector(selectIdActiveTime);
    const timeSelect = useSelector(selectTime);
    const dateSelect = useSelector(selectDate);
    // const [checkDate, setCheckDate] = useState(moment(new Date(dateNow)).format("YYYY-MM-DD"));

    const [selectEmp, setSelectEmp] = useState('');


    const dispatch = useDispatch()
    const timeList = [
        {
            id: 1,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 8, minute: 0 })
            )
        },
        {
            id: 2,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 9, minute: 0 })
            )
        },
        {
            id: 3,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 10, minute: 0 })
            )
        },
        {
            id: 4,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 11, minute: 0 })
            )
        },
        {
            id: 5,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 12, minute: 0 })
            )
        },
        {
            id: 6,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 13, minute: 0 })
            )
        },
        {
            id: 7,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 14, minute: 0 })
            )
        },
        {
            id: 8,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 15, minute: 0 })
            )
        },
        {
            id: 9,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 16, minute: 0 })
            )
        },
        {
            id: 10,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 17, minute: 0 })
            )
        },
        {
            id: 11,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 18, minute: 0 })
            )
        },
        {
            id: 12,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 19, minute: 0 })
            )
        },
        {
            id: 13,
            time: new Date(
                momentTimezone().utc()
                    .tz("Asia/Ho_Chi_Minh")
                    .set({ hour: 20, minute: 0 })

            )
        },
    ]

    useEffect(() => {
        if (selectEmp !== '') {
            dispatch(get_booking_by_emloyee(selectEmp)).then((res) => {
                setBookingEmp(res.payload.responseData);
            });
        }
        if(dateSelect === ''){
            dispatch(addDate(moment(new Date(dateNow)).format("YYYY-MM-DD")));
        }      
    }, [dispatch, dateNow, selectEmp,dateSelect])
    const _handle_date = (e) => {
        dispatch(addDate(e.format("YYYY-MM-DD")));
    }

    const handleChange = (event) => {
        if (event.target.value !== "") {
            dispatch(addEmployye(event.target.value))
        } else {
            dispatch(clearEmployye())
        }
        setSelectEmp(event.target.value);
    };
  
    return (
        <>
            <Row className='time'>
                <Col xs={12} sm={12} md={4} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            defaultValue={dayjs(moment(new Date(dateNow)).format("YYYY-MM-DD"))}
                            minDate={dayjs(moment(new Date(dateNow)).format("YYYY-MM-DD"))}
                            onChange={_handle_date}
                        />
                    </LocalizationProvider>
                </Col>

                <Col xs={12} sm={12} md={5}>
                    <Row>
                        {timeList.map((time, index) => (
                            <Col md={2} key={index}>
                                {timeNow > moment(new Date(time.time.getTime())).format("HH:mm") && dateSelect === moment(new Date(dateNow)).format("YYYY-MM-DD") ?
                                    <Button variant="outline-secondary btn-time-disabled" disabled id={'btn-time-' + time.id}>{moment(new Date(time.time.getTime())).format("HH:mm")}</Button>
                                    :
                                    bookingEmp?.some((bo) => bo.boStartTime === (`${dateSelect}T${moment(new Date(time.time.getTime())).format("HH:mm")}:00Z`)) === true ?
                                        <Button variant="outline-secondary btn-time-disabled" disabled id={'btn-time-' + time.id}>{moment(new Date(time.time.getTime())).format("HH:mm")}</Button>
                                        :
                                        <Button variant="outline-primary btn-time" id={'btn-time-' + time.id}
                                            onClick={(e) => {
                                                if (idActive !== "" && document.getElementById('btn-time-' + idActive).disabled === false) {
                                                    document.getElementById('btn-time-' + idActive).classList.remove('active');
                                                }
                                                if (timeSelect !== "") {
                                                    dispatch(clearTime(e.target.value));
                                                }
                                                document.getElementById('btn-time-' + time.id).classList.add('active');
                                                dispatch(addTime(e.target.value));
                                                dispatch(addIdTimeActive(time.id));
                                            }}
                                            value={moment(new Date(time.time.getTime())).format("HH:mm")}
                                        >
                                            {moment(new Date(time.time.getTime())).format("HH:mm")}
                                        </Button>
                                }
                            </Col>
                        ))}
                    </Row>
                    <Row className="select-stylist">
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select stylist (* optional)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectEmp}
                                    label="Select stylist (* optional)"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="" >
                                        <Grid container spacing={2}>
                                            <Grid item xs={2} style={{ alignItems: 'center', display: 'flex' }}>
                                                <Avatar alt="Remy Sharp" src='' style={{ marginRight: 10 }} />
                                            </Grid>
                                            <Grid item xs={4} style={{ alignItems: 'center', display: 'flex' }}>
                                                Salon automatically selects stylists
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                    {props.data?.map((emp) => {
                                        return (
                                            <MenuItem value={emp.usId} key={emp.usId}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={2} style={{ alignItems: 'center', display: 'flex' }}>
                                                        <Avatar alt="Remy Sharp" src={emp.usImage} style={{ marginRight: 10 }} />
                                                    </Grid>
                                                    <Grid item xs={4} style={{ alignItems: 'center', display: 'flex' }}>
                                                        {emp.usUserName}
                                                    </Grid>
                                                </Grid>
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </Row>
                </Col>
            </Row>
            {props.error ?
                <Alert key={'danger'} variant={'danger'}>
                    Please select the time !
                </Alert> : null
            }
        </>
    )
}


export default BookingTime
