import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesPageValidate } from '../../../../utils/validate';
import { selectListCate, selectStatusCate } from '../../../../redux/Category/category_page_selecter';
import { validate } from 'validate.js';
import { toast } from 'react-toastify';
import { put_category } from '../../../../redux/Category/category_page_thunk';
import { Button, Form, Modal, Spinner, } from "react-bootstrap";
import { useEffect, useState } from 'react';
const EditCategory = (props) => {
    const dataListCate = useSelector(selectListCate);
    const isLoading = useSelector(selectStatusCate);
    const dispatch = useDispatch();
    const [dataPut, setDataPut] = useState({
        cateId: 0,
        cateIdParent: 0,
        cateName: "",
        isDelete: false,
    });
    const [validationPut, setValidationPut] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    const [checkDuplicatePut, setCheckDuplicatePut] = useState(false);

    useEffect(() => {
        setDataPut(props.cate);
    }, [props])

    useEffect(() => {
        const errors = validate.validate(dataPut, CategoriesPageValidate);
        setValidationPut((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPut]);

    useEffect(() => {
       if(dataListCate.responseData?.length > 0){
            if (
                dataListCate.responseData?.some((cate) => cate?.cateId !== dataPut?.cateId && cate?.cateName === dataPut.cateName?.trim() && cate?.cateIdParent === dataPut?.cateIdParent) ===
                true || dataListCate.responseData?.some((cate) => cate?.cateId !== dataPut?.cateId && cate?.cateName === dataPut.cateName?.trim() && cate?.cateIdParent === 0) === true
            ) {
                setCheckDuplicatePut(true);
            } else {
                setCheckDuplicatePut(false);
            }
       }
    }, [dataListCate, dataPut?.cateName, dataPut?.cateIdParent, dataPut?.cateId]);

    const hasErrorPut = (field) => {
        return validationPut.touched[field] && validationPut.errors[field]
            ? true
            : false;
    };

    const hanldeChangePut = (e) => {
        setDataPut((preState) => ({
            ...preState,
            cateName: e.target.value,
        }));
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    const hanldeSelectPut = (e) => {
        setDataPut((preState) => ({
            ...preState,
            cateIdParent: parseInt(e.target.value),
        }));
    }

    const handlePutCate = () => {
        if (validationPut.isvalid === true && checkDuplicatePut === false) {
            setValidationPut((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    cateName: false,
                },
            }));
            dispatch(put_category(dataPut)).then((res) => {
                if (res.payload) {
                    toast.success('Update category success !', {
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
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicCateName">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control
                                defaultValue={props?.cate.cateName}
                                type="text"
                                placeholder="Enter category name"
                                name="cateName"
                                onChange={hanldeChangePut}
                                isInvalid={hasErrorPut("cateName") || checkDuplicatePut}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPut("cateName") ? validationPut.errors.cateName?.[0] : null
                                    || checkDuplicatePut === true ? "Genre name already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select onChange={hanldeSelectPut} defaultValue={props?.cate.cateIdParent}>
                                <option value={0} >Not selected</option>
                                {React.Children.toArray(dataListCate.responseData?.map((item) => {
                                    let id = 0;
                                    if (item.cateIdParent === 0) {
                                        id = item.cateId;
                                        return (
                                            <>
                                                <option value={item.cateId}>{item.cateName}</option>
                                                {
                                                    React.Children.toArray(dataListCate.responseData?.map((chilItem) => {
                                                        if (chilItem.cateIdParent === id) {
                                                            return <option value={chilItem.cateId} disabled>--{chilItem.cateName}</option>;
                                                        }
                                                        return null;
                                                    }))
                                                }
                                            </>
                                        )
                                    }
                                    return null;
                                }))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePutCate}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default EditCategory