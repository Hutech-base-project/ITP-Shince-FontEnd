import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCheckPhone, selectDate, selectEmployye, selectPhone, selectServices, selectTime } from '../../../../redux/Booking/booking_page_selecter';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { post_booking } from '../../../../redux/Booking/booking_page_thunk';
import { Button, Container } from 'react-bootstrap';
import { Box, Paper, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import BookingPhone from './booking_phone';
import BookingServices from './booking_services';
import BookingTime from './booking_time';
import { get_all_employees } from '../../../../redux/Account/account_page_thunk';
import { get_session } from '../../../../redux/Auth/auth_page_thunk';
import { addPhone, successPhone } from '../../../../redux/Booking/booking_page_reducer';

const steps = [
    {
        label: "Phone number",
    },
    {
        label: "Choose a service",
    },
    {
        label: "Select date and time",
    },
];
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const BookingBody = () => {
    const [employees, setEmployees] = useState([]);
    const [booking, setBooking] = useState({
        listSer: [""],
        boStartTime: "",
        boEndTime: "",
        boPhoneNo: "",
        boStatus: "Waiting",
        userId: "",
        employeeId: "",
        boNote: "",
        boTotal: 0,
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState(false);
    const [errorTime, setErrorTime] = useState(false);
    const timeSelect = useSelector(selectTime);
    const dateSelect = useSelector(selectDate);
    const phoneInput = useSelector(selectCheckPhone);
    const phone = useSelector(selectPhone);
    const services = useSelector(selectServices);
    const employee = useSelector(selectEmployye);

    const handleNext = (id) => {
        if (id === 0 && phoneInput === true) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setBooking((preState) => ({
                ...preState,
                boPhoneNo: phone,
            }));
        } else if (id === 1) {
            if (services.length > 0) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                const list = [];
                services.forEach((element) => {
                    list.push({
                        bodServiceId: element.seId,
                        bodServiceName: element.seName,
                        bodServicePrice: element.sePrice,
                    });
                });
                const total = services?.reduce(
                    (preValue, currentValue) => preValue + currentValue.sePrice,
                    0
                );
                setBooking((preState) => ({
                    ...preState,
                    listSer: list,
                    boTotal: total,
                }));
            } else {
                setError(true);
            }

        } else {
            return;
        };
    };

    useEffect(() => {
        if(sessionStorage.getItem("id") != null){
          let id = sessionStorage.getItem("id");
          dispatch(get_session(id)).then((res) => {
            if(!res.error){
                setBooking((preState) => ({
                    ...preState,
                    userId: res.payload.responseData.id,
                    boPhoneNo: res.payload.responseData.phoneNumber,
                }));
                dispatch(addPhone(res.payload.responseData.phoneNumber));
                dispatch(successPhone());
            }
          });
    
        }
      }, [dispatch]);

    useEffect(() => {
        if (activeStep === 2) {
            if (timeSelect !== "") {
                let endTime = parseInt(timeSelect.slice(0, timeSelect.indexOf(":"))) + 1;
                setBooking((preState) => ({
                    ...preState,
                    employeeId:employee,
                    boStartTime: `${dateSelect}T${timeSelect}:00Z`,
                    boEndTime:
                        endTime >= 10
                            ? `${dateSelect}T${endTime}:00:00Z`
                            : `${dateSelect}T0${endTime}:00:00Z`,
                }));
            }
            if(employee !== ""){
                setBooking((preState) => ({
                    ...preState,
                    employeeId:employee,
                }));
            }

        }
    }, [activeStep, phoneInput, timeSelect, dateSelect,employee]);

    useEffect(() => {
        if (services.length > 0) {
            setError(false);
        }
        if (timeSelect !== "") {
            setErrorTime(false);
        }
    }, [services, timeSelect]);

    useEffect(() => {
        dispatch(get_all_employees()).then((res) => {
            setEmployees(res.payload);
        });
    }, [dispatch])

    const hanldeOrder = () => {
        if (timeSelect !== "") {
            if (booking.boEndTime !== "" && booking.boStartTime !== "") {
                dispatch(post_booking(booking)).then(async (res1) => {
                    if (!res1.error) {
                        toast.success('Booking success !', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 600
                        });
                        await delay(800);
                        navigate(0);
                    } else {
                        toast.error(res1.payload, {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 2000
                        });
                    }
                });
            }
        } else {
            setErrorTime(true);
        }
    }

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    return (
        <>
            <Container className="booking">
                <h4> Booking services</h4>
                {/* <BookingTime/> */}
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {index === 0 ? <BookingPhone /> : ""}
                                    {index === 1 ? <BookingServices error={error} /> : ""}
                                    {index === 2 ? <BookingTime error={errorTime} data={employees}/> : ""}
                                    <div className="function-btn">
                                        <Button
                                            className="btn-next"
                                            variant="contained"
                                            onClick={index === steps.length - 1 ? hanldeOrder : () => handleNext(index)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? "Finish" : "Continue"}
                                        </Button>
                                        <Button                                           
                                            disabled={index === 0}
                                            className="btn-back"
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
                <ToastContainer />
            </Container>
        </>
    )
}

export default BookingBody
