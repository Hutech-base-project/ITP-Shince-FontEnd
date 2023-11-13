import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { validate } from 'validate.js';
import { ProductPageValidatePost } from '../../../../utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectListPro, selectStatusPro } from '../../../../redux/Product/product_page_selecter';
import { post_product } from '../../../../redux/Product/product_page_thunk';
import { get__all_categories } from '../../../../redux/Category/category_page_thunk';

const AddProduct = (props) => {
    const [checkDuplicatePost, setCheckDuplicatePost] = useState(false);
    const [dataListCate, setDataListCate] = useState([]);
    const dataListProduct = useSelector(selectListPro);
    const isLoading = useSelector(selectStatusPro);
    const [dataPost, setDataPost] = useState({
        category_id: null,
        proName: "",
        proPrice: "",
        featureImgPath: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        proContent: "",
        proBrand: "",
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
        const errors = validate.validate(dataPost, ProductPageValidatePost);
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
                proName: false,
                proContent: false,
                proBrand: false,
                proPrice: false,
                featureImgPath: false,
                category_id: false,
            },
        }));
        setCheckDuplicatePost(false);
    }, [props]);


    useEffect(() => {
        dispatch(get__all_categories()).then((res) => {
            setDataListCate(res.payload.responseData);
        });
    }, [dispatch]);

    useEffect(() => {
        if (dataListProduct?.length !== 0) {
            if (
                dataListProduct?.responseData.some((pro) => pro?.proName === dataPost?.proName.trim() && pro?.category_id === dataPost?.category_id && pro?.isDelete === false) === true
            ) {
                setCheckDuplicatePost(true);
            } else {
                setCheckDuplicatePost(false);
            }
        }
    }, [dataListProduct, dataPost?.proName, dataPost?.category_id]);
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
    const hanldeSelectPost = (e) => {
        if (parseInt(e.target.value) === 0) {
            setDataPost((preState) => ({
                ...preState,
                category_id: null,
            }));
        } else {
            setDataPost((preState) => ({
                ...preState,
                category_id: parseInt(e.target.value),
            }));
        }

    }

    const hanldePostPro = (e) => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                proName: true,
                proContent: true,
                proBrand: true,
                proPrice: true,
                featureImgPath: true,
                img1:true,
                img2:true,
                img3:true,
                img4:true,
                category_id: true,
            },
        }));
        if (validationPost.isvalid === true && checkDuplicatePost === false) {
            setValidationPost((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    proName: false,
                    proContent: false,
                    proBrand: false,
                    proPrice: false,
                    featureImgPath: false,
                    category_id: false,
                },
            }));
            dispatch(post_product(dataPost)).then((res1) => {
                if (res1.payload === 201) {
                    toast.success('Create product success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create product fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                }
            });
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form encType='multipart/form-data'>
                    <Form.Group className="mb-3" controlId="formBasicProName">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product name"
                            name="proName"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proName")|| checkDuplicatePost}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proName") ? validationPost.errors.proName?.[0] : null
                                || checkDuplicatePost === true ? "Porudcut name already exists" : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProPrice">
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product price"
                            name="proPrice"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proPrice")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proPrice") ? validationPost.errors.proPrice?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicProImg" className="mb-3">
                        <Form.Label>Product image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='featureImgPath'
                            onChange={handleChangeImageCreate}
                            isInvalid={hasErrorPost("featureImgPath")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("featureImgPath") ? validationPost.errors.featureImgPath?.[0] : null}
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
                    <Form.Group className="mb-3" controlId="formBasicProContent">
                        <Form.Label>Product Content</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            placeholder="Enter Product Content"
                            name="proContent"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proContent")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proContent") ? validationPost.errors.proContent?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProContent">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Content"
                            name="proBrand"
                            onChange={hanldeChangePost}
                            isInvalid={hasErrorPost("proBrand")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("proBrand") ? validationPost.errors.proBrand?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProBrand">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category_id"
                            isInvalid={hasErrorPost("category_id")}
                            onChange={hanldeSelectPost}
                        >
                            <option value={0} >Not selected</option>
                            {React.Children.toArray(dataListCate?.map((item) => {
                                let id = 0;
                                if (item.cateIdParent === 0) {
                                    id = item.cateId;
                                    return (
                                        <>
                                            <option value={item.cateId}>{item.cateName}</option>
                                            {
                                                React.Children.toArray(dataListCate.map((chilItem) => {
                                                    if (chilItem.cateIdParent === id) {
                                                        return <option value={chilItem.cateId}>--{chilItem.cateName}</option>;
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
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPost("category_id") ? validationPost.errors.category_id?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={hanldePostPro}>
                    {isLoading === true ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : "Create"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddProduct
