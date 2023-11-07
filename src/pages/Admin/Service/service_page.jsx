import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import "../../../assets/scss/Admin/Service/ServicePage.scss"

const ServicePage = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Service</h1>
                </div>
                <Row>
                    <Col lg={4} xs={12}>
                        <div className="button">
                            <Button variant="success" className="btn-add">Add Service</Button>
                        </div>
                    </Col>
                    <Col lg={8} xs={12}>
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
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a
                                className="nav-link dropdown-toggle"
                                href="!#"
                                id="searchDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                            </a>
                            {/* Dropdown - Messages */}
                            <div
                                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown"
                            >
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 small"
                                            placeholder="Search for..."
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} md={12} lg={12}>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Service Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Function</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>USER1</td>
                                                <td>Cat toc</td>
                                                <td>50000 VND</td>
                                                <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim eveniet quam dicta rem reiciendis inventore, adipisci fugiat. Nam nulla debitis voluptas, alias sunt ipsa neque tempora ullam at saepe odit!</td>
                                                <td><img className='d-flex justify-content-center align-item-center' src={require("../../../assets/images/_JsH_ ALL YASHIRO  - Nene Nene Nene.jpg")} width={200} height={200} /></td>
                                                <td><Button variant="success">On</Button>{' '}</td>
                                                <td><Button variant="danger">Delete</Button>{' '}
                                                    <Button variant="primary">Update</Button>{' '}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ServicePage