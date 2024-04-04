import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { get_all_orders, put_order } from '../../../../redux/OrderPro/order_page_thunk';
// import "../../../../assets/scss/admin_css/order.scss"
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrdersProWaiting = (props) => {
    const [detailShow, setDetailShow] = useState(false);
    const [manageShow, setManageShow] = useState(false);
    const [dataOrder, setDataOrder] = useState("");
    const [dataListOrderProduct, setDataListOrderProduct] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(10);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_all_orders()).then((res) => {
            if(!res.error){
                setDataListOrderProduct(res.payload.responseData?.filter((ord) => ord.orProStatus !== "Delivered" && ord.orProStatus !== "Cancelled"));
                setDataListSearch(res.payload.responseData?.filter((ord) => ord.orProStatus !== "Delivered" && ord.orProStatus !== "Cancelled"));
            }
  
        });
    }, [dispatch, manageShow, props.status]);
    

    useEffect(() => {
        if (props.search !== "") {
            setDataListSearch(dataListOrderProduct?.filter((ord) => (ord?.orProId.toLowerCase()).includes(props.search.toLowerCase())));
        } else {
            setDataListSearch(dataListOrderProduct);
        }
    }, [dataListOrderProduct, props])

    const hanldeClickDetails = (data) => {
        setDetailShow(true);
        setDataOrder(data);
    }

    const hanldeClickManage = (data) => {
        setManageShow(true);
        setDataOrder(data);
    }

    const NextPage = () => {
        setPage(page + 1);
    }

    const PrevPage = () => {
        setPage(page - 1);
    }

    const ClickPage = (e) => {
        setPage(e - 1);
    }

    let rows = [];
    for (let i = 1; i < (dataListSearch?.length / rowsPerPage) + 1; i++) {
        if (i - 1 === page) {
            rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        } else {
            rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        }
    }
    return (
        <>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <OrdersDetail
                            show={detailShow}
                            onHide={() => setDetailShow(false)}
                            order={dataOrder}
                        />
                        <OrdersManage
                            show={manageShow}
                            onHide={() => setManageShow(false)}
                            order={dataOrder}
                        />
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Time Order</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                return (
                                    <tr>
                                        <td>{data.orProId}</td>
                                        <td>{data.orProUserName}</td>
                                        <td>{data.orProAddress}</td>
                                        <td>{data.orProStatus}</td>
                                        <td>{moment(new Date(data?.createdAt)).format("DD/MM/YYYY HH:mm:ss")}</td>
                                        <td className='d-flex justify-content-center'>
                                            {props.dodertor ?
                                                <Button className='btn-action' variant="success" onClick={() => hanldeClickManage(data)}>Manage</Button>
                                                :
                                                null
                                            }
                                            <Button className='btn-action' variant="primary" onClick={() => hanldeClickDetails(data)}>Detail</Button>
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </Table>
                </Col>
                <ToastContainer />
                <Row className='category-bottom'>
                    {Math.floor(dataListOrderProduct?.length / rowsPerPage) !== 0 ?
                        <Col md={4}>
                            <Pagination>
                                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                {rows}
                                {page === Math.floor(dataListOrderProduct?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                            </Pagination>
                        </Col> : null
                    }
                </Row>
            </Row>
        </>
    )
}

function OrdersDetail(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                     Order details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="card-order">
                <div className="title">Purchase Reciept</div>
                <div className="info">
                    <Row>
                        <Col xs={7}>
                            <span id="heading">Name:</span>
                            <span id="details">{props.order.orProUserName}</span>
                        </Col>
                        <Col xs={5}>
                            <span id="heading">Phone number:</span>
                            <span id="details">{props.order.orProPhoneNo}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={7}>
                            <span id="heading">Date:</span>
                            <span id="details">{moment(new Date(props?.order.createdAt)).format("DD/MM/YYYY HH:mm:ss")}</span>
                        </Col>
                        <Col xs={5}>
                            <span id="heading">Order No:</span>
                            <span id="details">{props?.order.orProId}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <span id="heading">Address:</span>
                            <span id="details">{props?.order.orProAddress}</span>
                        </Col>
                    </Row>
                </div>
                <div className="pricing">
                    {React.Children.toArray(props.order.listPro?.map((data) => {
                        return (
                            <>
                                <Row>
                                    <Col xs={9}>
                                        <span id="name" >{data.proProductName}</span>
                                    </Col>
                                    <Col xs={3}>
                                        <span id="price" style={{ marginRight: 6 }}>{data.proQuantity} x {data.proProductPrice}</span><FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                                    </Col>
                                </Row>
                            </>
                        )
                    }))}
                    <Row>
                        <Col xs={9}>
                            <span id="name" >Transport Fee</span>
                        </Col>
                        <Col xs={3}>
                            <span id="price" style={{ marginRight: 6 }}>{props.order.orProShip}</span><FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                        </Col>
                    </Row>
                    <Row>
                      <Col xs={9}>
                          <span id="name" >Promotion</span>
                      </Col>
                      <Col xs={3}>
                          <span id="price" style={{ marginRight: 6 }}>{props.order.orProPromotion}</span><FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                      </Col>
                  </Row>
                </div>
                <div className="total">
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3">Total: <big>{props.order.orProTotal}<FontAwesomeIcon icon={['fas', 'dollar-sign']} /></big></div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function OrdersManage(props) {
    const dispatch = useDispatch();
    const [dataPut, setDataPut] = useState([]);
    useEffect(() => {
        setDataPut(props.order);
        setDataPut((preState) => ({
            ...preState,
            orProStatus: "Confirm",
        }));
    }, [props]);

    const hanldeChange = (e) => {
        setDataPut((preState) => ({
            ...preState,
            orProStatus: e.target.value,
        }));
    }

    const hanldePutStatus = () => {
        dispatch(put_order(dataPut)).then((res) => {
            if (!res.error) {
                dispatch(get_all_orders());
                toast.success('Update status success !', {
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
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Manage orders
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="mb-3">
                        <Form.Check
                            inline
                            label="Cancelled"
                            value="Cancelled"
                            name="orProStatus"
                            onChange={hanldeChange}
                            disabled={props.order.orProStatus === "Wait for confirmation" ? false : true}
                            defaultChecked={props.order.orProStatus === "Cancelled" ? true : false}
                            type='radio'
                        />
                        <Form.Check
                            inline
                            label="Confirm"
                            value="Confirm"
                            name="orProStatus"
                            onChange={hanldeChange}
                            disabled={props.order.orProStatus === "Wait for confirmation" ? false : true}
                            defaultChecked={props.order.orProStatus === "Wait for confirmation" || props.order.orProStatus === "Confirm" ? true : false}
                            type='radio'
                        />
                        <Form.Check
                            inline
                            label="Delivery"
                            value="Delivery"
                            name="orProStatus"
                            onChange={hanldeChange}
                            disabled={props.order.orProStatus === "Confirm" ? false : true}
                            defaultChecked={props.order.orProStatus === "Delivery" ? true : false}
                            type='radio'
                        />
                        <Form.Check
                            inline
                            label="Delivered"
                            value="Delivered"
                            name="orProStatus"
                            onChange={hanldeChange}
                            disabled={props.order.orProStatus === "Delivery" ? false : true}
                            defaultChecked={props.order.orProStatus === "Delivered" ? true : false}
                            type='radio'
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={hanldePutStatus}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default OrdersProWaiting