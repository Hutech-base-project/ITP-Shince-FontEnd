import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdActiveTime, selectTime } from '../../../../redux/Booking/booking_page_selecter';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Alert, Button, Col, Row } from 'react-bootstrap';
import momentTimezone from 'moment-timezone'
import moment from 'moment'
import { addDate, addIdTimeActive, addTime, clearTime } from '../../../../redux/Booking/booking_page_reducer';
import dayjs from 'dayjs';

const BookingTime = (props) => {
    const [dateNow] = useState(momentTimezone().utc().tz("Asia/Ho_Chi_Minh"));
    const [timeNow] = useState(moment(new Date(dateNow)).format("HH:mm"));
    const idActive = useSelector(selectIdActiveTime);
    const timeSelect = useSelector(selectTime)
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
        dispatch(addDate(moment(new Date(dateNow)).format("YYYY-MM-DD")));
    }, [dispatch, dateNow])
    const _handle_date = (e) => {
        dispatch(addDate(e.format("YYYY-MM-DD")));
    }

    const _handle_time = (e, id) => {
        if (idActive !== "") {
            document.getElementById('btn-time-' + idActive).classList.remove('active');
        }
        if (timeSelect !== "") {
            dispatch(clearTime(e.target.value));
        }
        document.getElementById('btn-time-' + id).classList.add('active');
        dispatch(addTime(e.target.value));
        dispatch(addIdTimeActive(id));
    }
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
                                {timeNow > moment(new Date(time.time.getTime())).format("HH:mm") ?
                                    <Button variant="outline-secondary btn-time-disabled" disabled>{moment(new Date(time.time.getTime())).format("HH:mm")}</Button>
                                    :
                                    <Button variant="outline-primary btn-time" id={'btn-time-' + time.id}
                                        onClick={(e) => _handle_time(e, time.id)}
                                        value={moment(new Date(time.time.getTime())).format("HH:mm")}
                                    >
                                        {moment(new Date(time.time.getTime())).format("HH:mm")}
                                    </Button>
                                }
                            </Col>
                        ))}
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
