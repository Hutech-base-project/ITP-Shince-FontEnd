import React, { useState } from 'react'
import { Button, Col, Form, Modal, Pagination, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { block_user, get_all_user, get_user_by_id } from '../../../../redux/Account/account_page_thunk'
import { useEffect } from 'react'
import EmployeeAdd from './employee_add'
import EmployeeEdit from './empoyee_edit'
import { toast } from 'react-toastify'
import { get_session } from '../../../../redux/Auth/auth_page_thunk'

const Employee = (props) => {
    const dispatch = useDispatch();
    const [dataListUser, setDataListUser] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(10);
    const [createShow, setCreateShow] = useState(false);
    const [detailsShow, setDetailsShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [dataUser, setDataUser] = useState(null);
    const [userId,setUserId] = useState(null);
    useEffect(() => {
        let user_id;
        if (sessionStorage.getItem("id") != null) {
            let id = sessionStorage.getItem("id");
            dispatch(get_session(id)).then((res) => {
                if (!res.error) {
                    user_id = res.payload.responseData.id;
                    setUserId(res.payload.responseData.id)
                }
            });

        }
        dispatch(get_all_user()).then((res) => {
            if (!res.error) {
                setDataListUser(res.payload.responseData?.filter((user) => user?.usId !== user_id && user?.isAdmin === true));
                setDataListSearch(res.payload.responseData?.filter((user) => user?.usId !== user_id && user?.isAdmin === true));
            }
        });
    }, [dispatch, createShow]);

    useEffect(() => {
        if (props.search !== null) {
            setDataListSearch(dataListUser?.filter((user) => (user?.usUserName.toLowerCase()).includes(props.search.toLowerCase())));
        } else {
            setDataListSearch(dataListUser);
        }
    }, [props.search, dataListUser]);
    const hanldeClickDetails = (data) => {
        setDetailsShow(true);
        setDataUser(data);
    }
    const hanldeClickEdit = (data) => {
        setEditShow(true);
        setDataUser(data);
    }
    const hanldeStatus = (user) => {
        dispatch(block_user(user)).then((res1) => {
            if (!res1.error) {
                dispatch(get_all_user()).then((res) => {
                    setDataListUser(res.payload.responseData?.filter((user) => user?.usId !== userId && user?.isAdmin === true));
                    setDataListSearch(res.payload.responseData?.filter((user) => user?.usId !== userId && user?.isAdmin === true));
                });
                toast.success('Block user success !', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
            } else {
                toast.error(res1.payload, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
            }
        });
    }
    const NextPage = () => setPage(page + 1);
    const PrevPage = () => setPage(page - 1);
    const ClickPage = (e) => setPage(e - 1);


    let rows = [];
    for (let i = 1; i < (dataListSearch?.length / rowsPerPage) + 1; i++) {
        if (i - 1 === page) {
            rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        } else {
            rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        }
    };
    return (
        <div className="container-fluid">
            {props.dodertor ?
                <div className="button">
                    <Button variant="success" className="btn-add"><span className='text-em' onClick={() => setCreateShow(true)}>Add Employee</span></Button>
                </div>
                :
                null
            }

            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <EmployeeAdd
                                show={createShow}
                                onHide={() => setCreateShow(false)}
                            />
                            <EmployyeeDetails
                                show={detailsShow}
                                data={dataUser}
                                onHide={() => setDetailsShow(false)}
                            />
                            <EmployeeEdit
                                show={editShow}
                                data={dataUser}
                                onHide={() => setEditShow(false)}
                            />
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Note</th>
                                    <th>Block</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.usId}</td>
                                            <td>{data.usUserName}</td>
                                            <td>{data.usEmailNo}</td>
                                            <td>{data.usNote}</td>
                                            <td>{
                                                data.isBlock === true ? <Button variant="success" onClick={() => hanldeStatus(data)}>On</Button> : <Button variant="danger" onClick={() => hanldeStatus(data)}>Off</Button>
                                            }</td>
                                            <td>
                                                {props.dodertor ?
                                                    <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(data)} style={{ marginRight: 10 }}>Edit</Button>
                                                    :
                                                    null
                                                }
                                                <Button className='btn-action' variant="primary" onClick={() => hanldeClickDetails(data)}>Details</Button>
                                            </td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Row className='category-bottom'>
                {Math.floor(dataListSearch?.length / rowsPerPage) !== 0 ?
                    <Col md={4}>
                        <Pagination>
                            {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                            {rows}
                            {page === Math.floor(dataListSearch?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                        </Pagination>
                    </Col> : null
                }
            </Row>
        </div>
    );
}

const EmployyeeDetails = (props) => {
    const dispatch = useDispatch();
    const [dataUser, setDataUser] = useState({
        usId: null,
        usUserName: null,
        usDob: null,
        usAddress: null,
        usPhoneNo: null,
        usEmailNo: null,
        usImage: null,
    });
    useEffect(() => {
        if (props.data !== null) {
            dispatch(get_user_by_id(props.data.usId)).then((res) => {
                setDataUser(res.payload);
            });
        }
    }, [dispatch, props]);
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        User details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={3} className="border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                {dataUser?.usImage !== null ?
                                    <img className="rounded-circle mt-5" width="150px"
                                        src={dataUser?.usImage} alt='avatar'
                                    /> :
                                    <img className="rounded-circle mt-5" width="150px"
                                        src={require('../../../../assets/images/avatar-trang-4.jpg')}
                                        alt='avatar'
                                    />
                                }
                            </div>
                        </Col>
                        <Col md={9}>
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
                                <Form.Group className="mb-3" controlId="EmployeeEmail">
                                    {React.Children.toArray(dataUser.listRole?.map((item) => {
                                        return (
                                            <h6>{item}</h6>
                                        );
                                    }))}
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Employee