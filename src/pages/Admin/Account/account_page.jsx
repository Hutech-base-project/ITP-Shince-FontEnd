import React, { useState } from 'react'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'
import '../../../assets/scss/Admin/Account/AccountPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'
import Employee from './components/employee_tab'
import User from './components/user_tab'

const AccountPage = (props) => {
    const [search, setSearch] = useState("");
    const hanldeSearch = (e) => setSearch(e.target.value);
   
    return (
        <>
            <Container fluid>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Account</h1>
                </div>
                <Row>
                    <div className="input-group input-order">
                        <input
                            type="text"
                            className="form-control search bg-light border-0 small"
                            placeholder="search by user name"
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
                        defaultActiveKey="Customer"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="Customer" title="Customer">
                            <User search={search} />
                        </Tab>
                        <Tab eventKey="Employee" title="Employee">
                            <Employee search={search} dodertor={props.dodertor} />
                        </Tab>
                    </Tabs>
                </Row>
                <ToastContainer />
            </Container>
        </>
    )
}





export default AccountPage