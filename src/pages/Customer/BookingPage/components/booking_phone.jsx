import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addPhone } from "../../../../redux/Booking/booking_page_reducer";
import { Col, Form } from 'react-bootstrap';
import { selectPhone } from '../../../../redux/Booking/booking_page_selecter';
import { validate } from 'validate.js';

import { successPhone } from '../../../../redux/Booking/booking_page_reducer';
import { errorPhone } from '../../../../redux/Booking/booking_page_reducer';
import { BookingPageValidate } from '../../../../utils/validate';

const BookingPhone = () => {
    const dispatch = useDispatch();
    const phone = useSelector(selectPhone);
    // validation
    const [validation, setValidation] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    useEffect(() => {
        const errors = validate.validate({ phone: phone }, BookingPageValidate);
        setValidation((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [phone]);

    const hasError = (field) => {
        return validation.touched[field] && validation.errors[field] ? true : false;
    };

    const handleChange = (e) =>  { 
        dispatch(addPhone(e.target.value));
        setValidation((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
        const check = validate.validate({ phone: phone }, BookingPageValidate)? true : false;
        if(check === true){
            dispatch(successPhone());
        }else{
            dispatch(errorPhone())
        }
    };

    return (
        <Col md={6} className='input-phone'>
            <Form.Group as={Col} >
                <Form.Control
                    value={phone??""}
                    name="phone"
                    type="text"                   
                    placeholder="Enter phone number......."
                    onChange={handleChange}
                    isInvalid={hasError("phone")}
                />
                <Form.Control.Feedback type="invalid">
                    {hasError("phone") ? validation.errors.phone?.[0] : null}
                </Form.Control.Feedback>
            </Form.Group>
        </Col>
    )
}

export default BookingPhone
