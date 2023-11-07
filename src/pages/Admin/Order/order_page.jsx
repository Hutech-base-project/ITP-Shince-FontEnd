import React from 'react'
import "../../../assets/scss/Admin/Order/OrderPage.scss"
import { Button, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OrderPage = () => {
    return (
        <>
            <Container fluid>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Order</h1>
                </div>
                <Row>
                    <div className="input-group input-order">
                        <input
                            type="text"
                            className="form-control search bg-light border-0 small"
                            placeholder="search by order_id"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                            </button>
                        </div>
                    </div>
                </Row>

                <Row>
                <Tabs
                    defaultActiveKey="Waiting"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Waiting" title="Waiting">
                        <Wating />
                    </Tab>
                    <Tab eventKey="Delivered" title="Delivered">
                        <Delivered />
                    </Tab>
                    <Tab eventKey="Cancelled" title="Cancelled">
                        <Cancelled />
                    </Tab>
                </Tabs>
                </Row>
            </Container>
        </>
    )
}

function Wating() {
    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Time order</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USER1</td>
                                    <td>Thien</td>
                                    <td>Thu Duc city</td>
                                    <td>Waiting for comfirmation</td>
                                    <td>02/11/2023</td>
                                    <td><Button variant="primary">Manage</Button>{' '}
                                        <Button variant="success">Detail</Button>{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

function Delivered() {
    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                    <th>Pay status</th>
                                    <th>Total</th>
                                    <th>ship</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USER1</td>
                                    <td>Thien</td>
                                    <td>Thu Duc city</td>
                                    <td>Completed</td>
                                    <td>Pay by paypal</td>
                                    <td>paid</td>
                                    <td>100000 VND</td>
                                    <td>10000 VND</td>
                                    <td><Button variant="primary">Manage</Button>{' '}
                                        <Button variant="success">Detail</Button>{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

function Cancelled() {
    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USER1</td>
                                    <td>Thien</td>
                                    <td>Thu Duc city</td>
                                    <td>Cancelled</td>
                                    <td><Button variant="primary">Manage</Button>{' '}
                                        <Button variant="success">Detail</Button>{' '}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OrderPage
