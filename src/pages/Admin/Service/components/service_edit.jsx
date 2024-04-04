import React, { useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { selectListSer, selectStatusSer } from '../../../../redux/Service/service_page_selecter';
import { validate } from 'validate.js';
import { ServicePageValidatePut } from '../../../../utils/validate';
import { put_services } from '../../../../redux/Service/service_page_thunk';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ServiceEdit = (props) => {
    const [checkDupliSerPut, setCheckDupliSerPost] = useState(false);
    const dataListSer = useSelector(selectListSer);
    const [listImg,setListImg] = useState([]);
    const [dataPut, setDataPut] = useState({});
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusSer);
 
   
    useEffect(() => {
        setDataPut(props.ser);
        setDataPut((preState) => ({
            ...preState,
            seImage: null,
            img1: null,
            img2: null,
            img3: null,
            img4: null,
        }));
        setListImg(props.ser.listImg);
    }, [props])

    const [validationPut, setValidationPut] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPut, ServicePageValidatePut);
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
        if (dataListSer?.length !== 0) {
            if (
                dataListSer?.responseData.some((ser) => ser.seId !== dataPut?.seId && ser?.seName === dataPut?.seName) === true
            ) {
                setCheckDupliSerPost(true);
            } else {
                setCheckDupliSerPost(false);
            }
        }
    }, [dataListSer, dataPut?.seName,dataPut?.seId]);

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

    const handleChangeImageUpdate = async (e) => {
        const files = e.target.files;
        setDataPut((preState) => ({
            ...preState,
            [e.target.name]: files[0],
        }));
    };

    const hanldeSerPut = (e) => {
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                seName: true,
                seDescription: true,
                sePrice: true,
            },
        }));
        if (validationPut.isvalid === true && checkDupliSerPut === false) {
            setValidationPut((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    seName: false,
                    seDescription: false,
                    sePrice: false,
                },
            }));
            dispatch(put_services(dataPut)).then((res) => {
                if (!res.error) {
                    toast.success('Update service success !', {
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
                        Edit Service
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service name</Form.Label>
                            <Form.Control
                                type="text"
                                name="seName"
                                defaultValue={props.ser.seName}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("seName") || checkDupliSerPut}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("seName") ? validationPut.errors.seName?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSePrice">
                            <Form.Label>Service price</Form.Label>
                            <Form.Control
                                type="text"
                                name="sePrice"
                                defaultValue={parseFloat(props?.ser.sePrice).toFixed(2)}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("sePrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("sePrice") ? validationPut.errors.sePrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSeDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                name="seDescription"
                                defaultValue={props.ser.seDescription}
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("seDescription")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("seDescription") ? validationPut.errors.seDescription?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicSeImg" className="mb-3">
                            <Form.Label>Choose Service image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='seImage'
                                onChange={(e) => handleChangeImageUpdate(e)}
                                // accept="image/png, image/jpg, image/jpeg"
                                isInvalid={hasErrorPut("seImage")}
                            />
                            {props.ser.seImage !== null ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/service/" +
                                props.ser.seImage}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("seImage") ? validationPut.errors.seImage?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicChildentImg1" className="mb-3">
                        <Form.Label>Children Image 1</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img1'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(0) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/service-child/" +
                                listImg.at(0).serImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg2" className="mb-3">
                        <Form.Label>Children Image 2</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img2'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(1) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/service-child/" +
                                listImg.at(1).serImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg3" className="mb-3">
                        <Form.Label>Children Image 3</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img3'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(2) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/service-child/" +
                                listImg.at(2).serImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg4" className="mb-3">
                        <Form.Label>Children Image 4</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img4'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(3) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/service-child/" +
                                listImg.at(3).serImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="success" onClick={hanldeSerPut}>
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

export default ServiceEdit