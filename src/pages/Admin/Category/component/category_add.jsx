import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesPageValidate } from '../../../../utils/validate';
import { selectStatusCate } from '../../../../redux/Category/category_page_selecter';
import { validate } from 'validate.js';
import { toast } from 'react-toastify';
import { getCategories, postCategories} from '../../../../redux/Category/category_page_thunk';
import { Button,Form, Modal, Spinner,} from "react-bootstrap";
import { useEffect ,useState} from 'react';

const AddCategory = (props)=> {
    const [dataListCate, setDataListCate] = useState([]);
    const isLoading = useSelector(selectStatusCate);
    const dispatch = useDispatch();
    const [dataPost, setDataPost] = useState({
        cateIdParent: 0,
        cateName: "",
        isDelete: false,
    });
    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });
    const [checkDuplicatePost, setCheckDuplicatePost] = useState(false);

    useEffect(() => {
        dispatch(getCategories()).then((res) => {
            setDataListCate(res.payload.responseData.filter((cate) => cate?.isDelete === false));
        });
    }, [dispatch]);

    useEffect(() => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                cateName: false,
            },
        }));
        setCheckDuplicatePost(false);
    }, [props]);

    useEffect(() => {
        if (
            dataListCate?.some((cate) => cate?.cateName === dataPost?.cateName.trim() && cate?.cateIdParent === dataPost?.cateIdParent && cate?.isDelete === false) === true ||
            dataListCate?.some((cate) => cate?.cateName === dataPost?.cateName && cate?.cateIdParent === 0 && cate?.isDelete === false) === true
        ) {
            setCheckDuplicatePost(true);
        } else {
            setCheckDuplicatePost(false);
        }
    }, [dataListCate, dataPost?.cateName, dataPost?.cateIdParent]);

    useEffect(() => {
        const errors = validate.validate(dataPost, CategoriesPageValidate);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPost]);

    const hasErrorPost = (field) => {
        return validationPost.touched[field] && validationPost.errors[field]
            ? true
            : false;
    };

    const hanldeChangePost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            cateName: e.target.value.trim(),
        }));
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    const hanldeSelectPost = (e) => {
        setDataPost((preState) => ({
            ...preState,
            cateIdParent: parseInt(e.target.value),
        }));
    }
    const handlePostCate = () => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                cateName: true,
            },
        }));
        if (validationPost.isvalid === true && checkDuplicatePost === false) {
            setValidationPost((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    cateName: false,
                },
            }));
            dispatch(postCategories(dataPost)).then((res1) => {
                if (res1.payload === 201) {
                    dispatch(getCategories()).then((res2) => {
                        setDataListCate(res2.payload.responseData);
                        setDataPost((preState) => ({
                            ...preState,
                            cateName: "",
                        }));
                    });
                    toast.success('Create category success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create category fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
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
                        Create category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Category name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                name="cateName"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("cateName") || checkDuplicatePost}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("cateName") ? validationPost.errors.cateName?.[0] : null
                                    || checkDuplicatePost === true ? "Genre name already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Select onChange={hanldeSelectPost}>
                                <option value={0} >Not selected</option>
                                {React.Children.toArray(dataListCate?.map((item) => {
                                    let id = 0;
                                    if (item.cateIdParent === 0) {
                                        id = item.cateId;
                                        return (
                                            <>
                                                <option value={item.cateId}>{item.cateName}</option>
                                                {
                                                    React.Children.toArray(dataListCate?.map((chilItem) => {
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
                    <Button variant="primary" onClick={handlePostCate}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCategory