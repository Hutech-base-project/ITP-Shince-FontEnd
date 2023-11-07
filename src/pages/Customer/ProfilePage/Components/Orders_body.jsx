import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import '../../../../assets/scss/Customer/Profile/Orders_customer.scss'

function OrdersBody() {
  return (
    <>
      <div className="container-fluid">     
        <Row>
          <Col md="6">
            <div className="input-group md-form form-sm form-1 pl-0">
              <div className="input-group-prepend">
                <span
                  className="input-group-text purple lighten-3"
                  id="basic-text1"
                >
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </span>
              </div>
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={12} lg={12}>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                  <th scope="col">Time Order</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="p">
                <tr className="line">
                  <th scope="row">1</th>
                  <td>TP.HCM</td>
                  <td>Wait</td>
                  <td>out of stock</td>
                  <td>30/10/2023</td>
                  <td className="btn">
                    <Button variant="primary" className="btn-update btn-lg">
                      <span className="btn-text">Detail</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OrdersBody