import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { getOrderProDetail, getOrderProduct } from '../../../../redux/OrderPro/order_page_thunk';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrdersProDelivered = (props) => {
    const [dataListOrderProduct, setDataListOrderProduct] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [detailShow, setDetailShow] = useState(false);
    const [dataOrder, setDataOrder] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(10);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderProduct()).then((res) => {
            setDataListOrderProduct(res.payload.responseData.filter((ord) => ord.orProStatus === "Delivered"));
            setDataListSearch(res.payload.responseData.filter((ord) => ord.orProStatus === "Delivered"));
        });
    }, [dispatch]);

    useEffect(() => {
        if (props.search !== null) {
            setDataListSearch(dataListOrderProduct?.filter((ord) => (ord?.orProId.toLowerCase()).includes(props.search.toLowerCase())));
        } else {
            setDataListSearch(dataListOrderProduct);
        }
    }, [dataListOrderProduct, props])

    const hanldeClickDetails = (data) => {
        setDetailShow(true);
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
    for (let i = 1; i < (dataListSearch.length / rowsPerPage) + 1; i++) {
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
                                    <tr key={data.orProId}>
                                        <td>{data.orProId}</td>
                                        <td>{data.orProUserName}</td>
                                        <td>{data.orProAddress}</td>
                                        <td>{data.orProStatus}</td>
                                        <td>{moment(new Date(data?.createdAt)).format("DD/MM/YYYY HH:mm:ss")}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Button className='btn-action' variant="primary" onClick={() => hanldeClickDetails(data)}>Detail</Button>
                                        </td>
                                    </tr>
                                )
                            }))}
                        </tbody>
                    </Table>
                </Col>
                <Row className='category-bottom'>
                    {Math.floor(dataListOrderProduct.length / rowsPerPage) !== 0 ?
                        <Col md={{ span: 10, offset: 10 }}>
                            <Pagination>
                                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                {rows}
                                {page === Math.floor(dataListOrderProduct.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                            </Pagination>
                        </Col> : null
                    }
                </Row>
            </Row>
        </>
    )
}

function OrdersDetail(props) {
    const [dataListOrderProDel, setDataListProDel] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.order.orProId !== undefined) {
            dispatch(getOrderProDetail(props.order.orProId)).then((res) => {
                setDataListProDel(res.payload);
            });
        }
    }, [props, dispatch]);
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="card">
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
                    {React.Children.toArray(dataListOrderProDel?.map((data) => {
                        return (
                            <>
                                <Row key={("@@@@@" + data.ordProOrderId)}>
                                    <Col xs={9}>
                                        <span id="name" >{data.ordProProductName}</span>
                                    </Col>
                                    <Col xs={3}>
                                        <span id="price" style={{ marginRight: 6 }}>{data.ordProProductPrice}</span><FontAwesomeIcon icon={['fas', 'dollar-sign']} />
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
                </div>
                <div className="total">
                    <div className="row">
                        <div className="col-9"></div>
                        <div className="col-3"><big>{props.order.orProTotal}<FontAwesomeIcon icon={['fas', 'dollar-sign']} /></big></div>
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
export default OrdersProDelivered