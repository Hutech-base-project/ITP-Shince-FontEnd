import React from 'react'
import { selectListUser, selectUserLoading } from '../../../../redux/Account/account_page_selecter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { AccountPageValidate } from '../../../../utils/validate';
import { post_user } from '../../../../redux/Account/account_page_thunk';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { validate } from 'validate.js';
import { get_all_roles } from '../../../../redux/Role/role_thunk';

const EmployeeAdd = (props) => {
    const [dataListRole, setDataListRole] = useState([]);
    const isLoading = useSelector(selectUserLoading);
    const dispatch = useDispatch();
    const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
    const [checkRole, setCheckRole] = useState(false);
    const dataListUser = useSelector(selectListUser);
    const [liRole, setLiRole] = useState([]);
    const [dataPost, setDataPost] = useState({
        usUserName: "",
        usPassword: "",
        usDob: "",
        usAddress: "",
        usPhoneNo: "",
        usEmailNo: "",
        usImage: "",
        usNote: "",
        isAdmin: true,
        isDelete: false
    });

    useEffect(() => {
        dispatch(get_all_roles()).then((res) => {
            if(!res.error){
                setDataListRole(res.payload.responseData?.filter((ro) =>  ro?.roName !== "ROLE_USER"));
            }
        });
    }, [dispatch,props]);

    const [validationPost, setValidationPost] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPost, AccountPageValidate);
        setValidationPost((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
        if(dataListUser?.length > 0){
            if (dataListUser?.some((us) => us?.usPhoneNo === dataPost?.usPhoneNo.trim()) === true) {
                setCheckPhoneNumber(true);
            } else {
                setCheckPhoneNumber(false);
            }
        }

    }, [dataListUser,dataPost]);


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
    }

    const handleChangeImageCreate = async (e) => {
        const files = e.target.files;
        setDataPost((preState) => ({
            ...preState,
            usImage: files[0],
        }));
    };

    const handleSelectRole = (e) => {
        let list = liRole;
        if (e.target.checked) {
            list.push(e.target.value);
            setLiRole(list);
        } else {
            list = list.filter((person) => person !== e.target.value);
            setLiRole(list);
        }

        if(liRole.length === 0){
            setCheckRole(true);
        }else{
            setCheckRole(false);
        }
    };

    const handlePostEmployee = () => {
        setValidationPost((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                usUserName: true,
                usPassword: true,
                usDob: true,
                usAddress: true,
                usPhoneNo: true,
                usEmailNo: true,
                usImage: true,
            },
        }));
        
        let ckRole = false;
        if(liRole.length === 0){
            ckRole = true;
            setCheckRole(true);
        }else{
            ckRole = false;
            setCheckRole(false);
        }
        if (validationPost.isvalid === true && checkPhoneNumber === false && ckRole  === false) {
            dispatch(post_user({data:dataPost,listRole:liRole})).then((res1) => {
                if (!res1.error) {
                    toast.success('Add Employee success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error(res1.payload, {
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
                        Add new Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="EmployeeName">
                            <Form.Label>Employee name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee name"
                                name="usUserName"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("usUserName")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("usUserName") ? validationPost.errors.usUserName?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee password"
                                name="usPassword"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("usPassword")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("usPassword") ? validationPost.errors.usPassword?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='usImage'
                                onChange={handleChangeImageCreate}
                                isInvalid={hasErrorPost("usImage")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("usImage") ? validationPost.errors.usImage?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="dd/mm/yyyy"
                                name="usDob"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("usDob")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("usDob") ? validationPost.errors.usDob?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeeAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee Address"
                                name="usAddress"
                                onChange={hanldeChangePost}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeePhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee Phone number"
                                name="usPhoneNo"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("usPhoneNo") || checkPhoneNumber}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("cateName") ? validationPost.errors.cateName?.[0] : null
                                    || checkPhoneNumber === true ? "Phone number already exists" : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeeEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Employee Email"
                                name="usEmailNo"
                                onChange={hanldeChangePost}
                                isInvalid={hasErrorPost("usEmailNo")}
                            />
                            <Form.Control.Feedback type="invalid">
                                {hasErrorPost("usEmailNo") ? validationPost.errors.usEmailNo?.[0] : null}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group key="checkbox" className="mb-3" >

                            {React.Children.toArray(dataListRole?.map((item) => {
                                return (
                                    <Form.Check
                                        label={item.roName}
                                        name="listRole[]"
                                        type="checkbox"
                                        id={item.roName}
                                        value={item.roName}
                                        className="role"
                                        onClick={handleSelectRole}
                                    />
                                )
                            }
                            ))}
                          {checkRole?<div className="invalid-feedback" style={{display:'block'}}>Email cannot be empty</div>:""}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePostEmployee}>
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
export default EmployeeAdd
