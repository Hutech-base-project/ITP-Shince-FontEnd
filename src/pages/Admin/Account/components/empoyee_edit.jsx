import React from 'react'
import { selectListUser, selectUserLoading } from '../../../../redux/Account/account_page_selecter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { get_user_by_id,put_user } from '../../../../redux/Account/account_page_thunk';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { get_all_roles } from '../../../../redux/Role/role_thunk';
const EmployeeEdit = (props) => {
    const [dataListRole, setDataListRole] = useState([]);
    const isLoading = useSelector(selectUserLoading);
    const dispatch = useDispatch();
    const [checkRole, setCheckRole] = useState(false);
    const dataListUser = useSelector(selectListUser);
    const [liRole, setLiRole] = useState([]);
    const [dataUser, setDataUser] = useState({
        usId: null,
        usUserName: null,
        usDob: null,
        usAddress: null,
        usPhoneNo: null,
        usEmailNo: null,
        usImage: null,
        listRole: null,
    });

    useEffect(() => {
        dispatch(get_all_roles()).then((res) => {
           if(!res.error){
            setDataListRole(res.payload.responseData?.filter((ro) => ro?.roName !== "ROLE_USER"));
           }
        });
        if (props.data !== null) {
            dispatch(get_user_by_id(props.data.usId)).then((res) => {
                if(!res.error){
                    setDataUser(res.payload);
                }
            });

        }

    }, [dispatch, props]);

    useEffect(() => {
        if (dataUser?.listRole !== null) {
            setLiRole(dataUser?.listRole);
        }
    }, [dataListUser, dataUser]);

    const handleSelectRole = (e) => {
        let list =  Object.assign([], liRole);
        if (e.target.checked) {
            list.push(e.target.value);
            setLiRole(list);
        } else {
            list = list.filter((person) => person !== e.target.value);
            setLiRole(list);
        }
        if (liRole.length === 0) {
            setCheckRole(true);
        } else {
            setCheckRole(false);
        }
    };

    const handlePutEmployee = () => {
        if (liRole.length === 0) {
            setCheckRole(true);
        } else {
            setCheckRole(false);
        }
        if (checkRole === false) {
            dispatch(put_user({ data: dataUser, listRole: liRole })).then((res1) => {
                if (res1.payload) {
                    toast.success('Add Employee success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Add Employee fail!', {
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
                        Edit Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="EmployeeName">
                            <Form.Label>Employee name</Form.Label>
                            <Form.Control
                                value={dataUser.usUserName === null ? "" : dataUser.usUserName}
                                type="text"
                                name="usUserName"
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                type="text"
                                name="usDob"
                                value={dataUser.usDob === null ? "" : dataUser.usDob}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeeAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="usAddress"
                                value={dataUser.usAddress === null ? "" : dataUser.usAddress}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeePhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                name="usPhoneNo"
                                value={dataUser.usPhoneNo === null ? "" : dataUser.usPhoneNo}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="EmployeeEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="usEmailNo"
                                value={dataUser.usEmailNo === null ? "" : dataUser.usEmailNo}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group key="checkbox" className="mb-3" >
                            {React.Children.toArray(dataListRole?.map((item) => {

                                if (dataUser.listRole?.some((cate) => cate === item.roName)) {
                                    return (
                                        <Form.Check
                                            label={item.roName}
                                            type="checkbox"
                                            id={item.roName}
                                            value={item.roName}
                                            className="role"
                                            onClick={handleSelectRole}
                                            defaultChecked
                                        />
                                    )
                                } else {
                                    return (
                                        <Form.Check
                                            label={item.roName}
                                            type="checkbox"
                                            id={item.roName}
                                            value={item.roName}
                                            className="role"
                                            onClick={handleSelectRole}
                                        />
                                    )
                                }

                            }))}
                            {checkRole ? <div className="invalid-feedback" style={{ display: 'block' }}>Email cannot be empty</div> : ""}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePutEmployee}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeEdit