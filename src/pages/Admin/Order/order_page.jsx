import React from 'react'
import "../../../assets/scss/Admin/Order/OrderPage.scss"
import { Button, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import OrdersProWaiting from './components/orders_pro_waiting'
import OrdersProDelivered from './components/orders_pro_delivered'
import OrdersProCancelled from './components/orders_pro_cancelled'

const OrderPage = () => {
    const [search, setSearch] = useState("");

    const hanldeSearch = (e) => {
        setSearch(e.target.value);
    }
    return (
        <>
            <Container fluid>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Order Product</h1>
                </div>
                <Row>
                    <div className="input-group input-order">
                        <input
                            type="text"
                            className="form-control search bg-light border-0 small"
                            placeholder="search by order_id"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={hanldeSearch}
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
                            <OrdersProWaiting search={search} />
                        </Tab>
                        <Tab eventKey="Delivered" title="Delivered">
                            <OrdersProDelivered search={search} />
                        </Tab>
                        <Tab eventKey="Cancelled" title="Cancelled">
                            <OrdersProCancelled search={search} />
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </>
    )
}



export default OrderPage
