import React, { useState } from 'react'
import { Button, Col, Container, Tab, Tabs } from 'react-bootstrap'
import '../../../assets/scss/Admin/Account/AccountPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AccountPage = () => {
    return (
        <>
            <Container fluid>
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Account</h1>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control search bg-light border-0 small"
                        placeholder="search by Name"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                        </button>
                    </div>
                </div>

                <Tabs
                    defaultActiveKey="Customer"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="Customer" title="Customer">
                        <Customer />
                    </Tab>
                    <Tab eventKey="Employee" title="Employee">
                        <Employee />
                    </Tab>
                </Tabs>
            </Container>

        </>
    )
}

function Customer() {
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
                                    <th>Email</th>
                                    <th>Note</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USER1</td>
                                    <td>Thien</td>
                                    <td>thienza147@gmail.com</td>
                                    <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim eveniet quam dicta rem reiciendis inventore, adipisci fugiat. Nam nulla debitis voluptas, alias sunt ipsa neque tempora ullam at saepe odit!</td>
                                    <td><Button variant="primary">Manage</Button>{' '}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

function Employee() {
    return (
        <div className="container-fluid">    
            <div className="button">
                <Button variant="success" className="btn-add"><span className='text-em'>Add Employee</span></Button>
            </div>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Note</th>
                                    <th>Function</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>USER1</td>
                                    <td>Thien</td>
                                    <td>thienza147@gmail.com</td>
                                    <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim eveniet quam dicta rem reiciendis inventore, adipisci fugiat. Nam nulla debitis voluptas, alias sunt ipsa neque tempora ullam at saepe odit!</td>
                                    <td><Button variant="primary">Manage</Button>{' '}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AccountPage