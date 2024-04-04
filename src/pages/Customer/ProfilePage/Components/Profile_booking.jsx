import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { get_booking_by_user } from '../../../../redux/Booking/booking_page_thunk';
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get_session } from '../../../../redux/Auth/auth_page_thunk';
import moment from 'moment';

const ProfileBooking = () => {
  const dispatch = useDispatch();
  const [listBooking, setListBooking] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);

  useEffect(() => {
    let id = sessionStorage.getItem("id");
    dispatch(get_session(id)).then((res) => {
      if (!res.error) {
        let userid = res.payload.responseData.id;
        dispatch(get_booking_by_user(userid)).then((res1) => {
          if (!res.error) {
            setListBooking(res1.payload?.responseData)
            setDataListSearch(res1.payload?.responseData)
          }
        })
      }
    });
  }, [dispatch])
  return (
    <>
      <>
        <div className="container-fluid">
          <Row>
            <Col lg={8} xs={12}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search bg-light border-0 small"
                  placeholder="Search by id booking"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                  onChange={(e)=>{
                    if (e.target.value !== "") {
                      setDataListSearch(listBooking?.filter((booking) => (booking?.boId.toLowerCase()).includes(e.target.value.toLowerCase())));
                  } else {
                      setDataListSearch(listBooking);
                  }
                  }}
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
            <div className="card shadow mb-4">
              <div className="card-body">
                <Tabs
                  defaultActiveKey="waitting"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="waitting" title="Waitting" className='scrollbar-ord'>
                    {dataListSearch?.filter((booking) => booking.boStatus !== "Completed" &&  booking.boStatus !== "Cancelled").map((data) => {
                      return (
                        <div key={data.boId}>
                          <Row className='shop-cursor'>
                            <Col className='title'>
                              #{data.boId}
                            </Col>
                            <Col>
                              <h6 className='status'>Start Time:</h6>
                              <div className='delivered'>{moment(new Date(data.boStartTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                            </Col>
                            <Col>
                              <h6 className='price'>Price:</h6>
                              <div>{data.boTotal} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                            <Col>
                              <h6 className='status'>Total:</h6>
                              <div className='delivered'>{data.boTotal}<FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      )
                    })}

                  </Tab>
                  <Tab eventKey="completed" title="Completed">
                    {dataListSearch?.filter((booking) => booking.boStatus === "Completed").map((data) => {
                      return (
                        <div key={data.boId}>
                           <Row className='shop-cursor'>
                            <Col className='title'>
                              #{data.boId}
                            </Col>
                            <Col>
                              <h6 className='status'>Start Time:</h6>
                              <div className='delivered'>{moment(new Date(data.boStartTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                            </Col>
                            <Col>
                              <h6 className='price'>Price:</h6>
                              <div>{data.boTotal} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                            <Col>
                              <h6 className='status'>Total:</h6>
                              <div className='delivered'>{data.boTotal}<FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      )
                    })}
                  </Tab>
                  <Tab eventKey="cancelled" title="Cancelled">
                    {dataListSearch?.filter((booking) => booking.boStatus === "Cancelled").map((data) => {
                      return (
                        <div key={data.boId}>
                           <Row className='shop-cursor'>
                            <Col className='title'>
                              #{data.boId}
                            </Col>
                            <Col>
                              <h6 className='status'>Start Time:</h6>
                              <div className='delivered'>{moment(new Date(data.boStartTime)).format("DD/MM/YYYY HH:mm:ss")}</div>
                            </Col>
                            <Col>
                              <h6 className='price'>Price:</h6>
                              <div>{data.boTotal} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                            <Col>
                              <h6 className='status'>Total:</h6>
                              <div className='delivered'>{data.boTotal}<FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      )
                    })}
                  </Tab>
                </Tabs>
              </div>
            </div>
          </Row>
        </div>
      </>
    </>
  )
}

export default ProfileBooking
