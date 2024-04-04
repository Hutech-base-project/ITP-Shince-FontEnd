import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Modal, Pagination, Row } from 'react-bootstrap'
import '../../../../assets/scss/Customer/Profile/Orders_customer.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { get_order_by_user_id } from '../../../../redux/OrderPro/order_page_thunk'
import moment from 'moment'
import { get_session } from '../../../../redux/Auth/auth_page_thunk'

const ProfileOrder = () =>{
  const dispatch = useDispatch();
  const [listOrdPro, setListOrdPro] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(10);
  const [search, setSearch] = useState("");
  const [detailShow, setDetailShow] = useState(false);
  const [dataOrder, setDataOrder] = useState("");

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    dispatch(get_session(id)).then((res) => {
      if (!res.error) {
        let userid = res.payload.responseData.id;
        dispatch(get_order_by_user_id(userid)).then((res1) => {
          if (!res.error) {
            setListOrdPro(res1.payload?.responseData)
            setDataListSearch(res1.payload?.responseData)
          }
        })
      }
    });
  }, [dispatch])

  useEffect(() => {
    if (search !== null) {
      setDataListSearch(listOrdPro?.filter((ord) => (ord?.orProId.toLowerCase()).includes(search.trim().toLowerCase())));
    } else {
      setDataListSearch(listOrdPro);
    }
  }, [search, listOrdPro])

  const hanldeSearch = (e) =>  setSearch(e.target.value);
  const NextPage = () => setPage(page + 1);
  const PrevPage = () => setPage(page - 1);
  const ClickPage = (e) => setPage(e - 1);


  let rows = [];
  for (let i = 1; i < (listOrdPro?.length / rowsPerPage) + 1; i++) {
    if (i - 1 === page) {
      rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    } else {
      rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    }
  }

  const hanldeClickDetails = (data) => {
    setDetailShow(true);
    setDataOrder(data);
  }

  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col lg={8} xs={12}>
            <div className="input-group">
              <input
                type="text"
                className="form-control search bg-light border-0 small"
                placeholder="search by Name"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={hanldeSearch}
              />
              <div className="input-group-append">
                <Button variant="dark" disabled>
                  <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <OrdersDetail
            show={detailShow}
            onHide={() => setDetailShow(false)}
            order={dataOrder}
          />
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>List of your product</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Time order</th>
                      <th>See your order detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((index) => {
                      return (
                        <tr>
                          <td>{index.orProId}</td>
                          <td >{index.orProUserName}</td>
                          <td>{parseFloat(index.orProTotal).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                          <td >{index.orProStatus}</td>
                          <td>{index.createdAt}</td>
                          <td >
                            <Button className='btn-action' variant="primary"  onClick={() => hanldeClickDetails(index)}>Detail</Button>
                          </td>
                        </tr>
                      )
                    }))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Row>
        <Row className='category-bottom'>
          {Math.floor(listOrdPro?.length / rowsPerPage) !== 0 ?
            <Col md={{ span: 10, offset: 10 }}>
              <Pagination>
                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                {rows}
                {page === Math.floor(listOrdPro?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
              </Pagination>
            </Col> : null
          }
        </Row>
      </div>
    </>
  );
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
                  Order detail
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

export default ProfileOrder