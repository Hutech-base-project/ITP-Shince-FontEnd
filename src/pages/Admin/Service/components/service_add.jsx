import React from 'react'
import { selectStatusSer } from '../../../../redux/Service/service_page_selecter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { ServicePageValidatePost } from '../../../../utils/validate';
import { validate } from 'validate.js';
import { post_services } from '../../../../redux/Service/service_page_thunk';
import { toast } from 'react-toastify';

const ServiceAdd = (props) => {
    const [checkDupliSerPost, setCheckDupliSerPost] = useState(false);
    const [dataListSer, setDataListSer] = useState([]);
    const isLoading = useSelector(selectStatusSer);
    const [dataPost, setDataPost] = useState({
        seName: "",
        sePrice: "",
        seImage: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        seDescription: "",
        proTurnOn: true,
        isDelete: false,
    });

    const dispatch = useDispatch();

    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPost, ServicePageValidatePost);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));

    }, [dataPost]);

    useEffect(() => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                seName: false,
                seDescription: false,
                sePrice: false,
                seImage: false,
            },
        }));
        setCheckDupliSerPost(false);
    }, [props]);

    useEffect(() => {
        if (dataListSer.length !== 0) {
            if (
                dataListSer.responseData.some((ser) => ser?.seName === dataPost?.seName.trim() && ser?.isDelete === false) === true
            ) {
                setCheckDupliSerPost(true);
            } else {
                setCheckDupliSerPost(false);
            }
        }
    }, [dataListSer, dataPost?.seName]);

    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
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

    const handleChangeImageCreate = async (e) => {
        const files = e.target.files;
        setDataPost((preState) => ({
            ...preState,
            [e.target.name]: files[0],
        }));
    };

    const hanldePostSer = (e) => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                seName: true,
                seDescription: true,
                sePrice: true,
                seImage: true,
                img1: true,
                img2: true,
                img3: true,
                img4: true,
            },
        }));
        if (validationPost.isvalid === true && checkDupliSerPost === false) {
            setValidationPost((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    seName: false,
                    seDescription: false,
                    sePrice: false,
                    seImage: false,
                },
            }));
            dispatch(post_services(dataPost)).then((res1) => {
                if (res1.payload === 201) {
                    toast.success('Create service success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create service fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Service name"
                                name="seName"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("seName") || checkDupliSerPost}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("seName") ? validationPost.errors.seName?.[0] : null
                                    || checkDupliSerPost === true ? "Genre name already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSePrice">
                            <Form.Label>Service price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Product price"
                                name="sePrice"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("sePrice")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("sePrice") ? validationPost.errors.sePrice?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSeDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="Service Description"
                                name="seDescription"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("seDescription")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("seDescription") ? validationPost.errors.seDescription?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicSeImg" className="mb-3">
                            <Form.Label>Choose Service image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='seImage'
                                onChange={(e) => handleChangeImageCreate(e)}
                                // accept="image/png, image/jpg, image/jpeg"
                                isInvalid={hasErrorPost("seImage")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("seImage") ? validationPost.errors.seImage?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicChildentImg1" className="mb-3">
                            <Form.Label>Children Image 1</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='img1'
                                onChange={handleChangeImageCreate}
                                isInvalid={hasErrorPost("img1")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("img1") ? validationPost.errors.img1?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicChildentImg2" className="mb-3">
                            <Form.Label>Children Image 2</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='img2'
                                onChange={handleChangeImageCreate}
                                isInvalid={hasErrorPost("img2")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("img2") ? validationPost.errors.img2?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicChildentImg3" className="mb-3">
                            <Form.Label>Children Image 3</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='img3'
                                onChange={handleChangeImageCreate}
                                isInvalid={hasErrorPost("img3")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("img3") ? validationPost.errors.img3?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicChildentImg4" className="mb-3">
                            <Form.Label>Choose Children Image 4</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='img4'
                                onChange={handleChangeImageCreate}
                                isInvalid={hasErrorPost("img4")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("img4") ? validationPost.errors.img4?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={hanldePostSer}>
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

export default ServiceAdd
