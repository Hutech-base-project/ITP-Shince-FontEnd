import React, { useState } from 'react'
import { Button, Card, Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import DashboardBarChart from './components/dashboard_bar_chart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import momentTimezone from 'moment-timezone'
import moment from 'moment'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { get_all_booking } from '../../../redux/Booking/booking_page_thunk';
import { get_all_orders } from '../../../redux/OrderPro/order_page_thunk';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get_all_employees } from '../../../redux/Account/account_page_thunk';
import { Avatar } from '@mui/material';
const DashboardPage = () => {
  const dispatch = useDispatch();
  const [dateNow] = useState(momentTimezone().utc().tz("Asia/Saigon"));
  const [value, setValue] = useState(dayjs(moment(new Date(dateNow))));
  const [listBooking, setListBooking] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [quanBookingCompleted, setQuanBookingCompleted] = useState(0);
  const [quanBookingCancelled, setQuanBookingCancelled] = useState(0);
  const [quanOrderCompleted, setQuanOrderCompleted] = useState(0);
  const [quanOrderCancelled, setQuanOrderCancelled] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(10);
  useEffect(() => {
    dispatch(get_all_orders()).then((res) => {
      if (!res.error) {
        setListOrder(res.payload.responseData);
      }
    });
    dispatch(get_all_booking()).then((res) => {
      if (!res.error) {
        setListBooking(res.payload.responseData);
      }
    });
    dispatch(get_all_employees()).then((res) => {
      if (!res.error) {
        setListEmployee(res.payload);
        setDataListSearch(res.payload);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (search !== "") {
      setDataListSearch(listEmployee?.filter((emp) => (emp?.usUserName.toLowerCase()).includes(search.toLowerCase())));
    } else {
      setDataListSearch(listEmployee);
    }
  }, [search, listEmployee]);

  useEffect(() => {
    var countOrCom = 0;
    var countOrCan = 0;
    var totalOrCom = 0;
    var countBoCom = 0;
    var countBoCan = 0;
    var totalBoCom = 0;
    listBooking.filter((bo) =>
      new Date(bo?.createdAt).getFullYear() === value.get('year')).forEach((element) => {
        if (element.boStatus === 'Completed') {
          countBoCom = countBoCom + 1;
          totalBoCom = totalBoCom + element.boTotal
        }
        if (element.boStatus === 'Cancelled') {
          countBoCan = countBoCan + 1;
        }
      })

    listOrder.filter((bo) =>
      new Date(bo?.createdAt).getFullYear() === value.get('year')).forEach((element) => {
        if (element.orProStatus === 'Completed') {
          countOrCom = countOrCom + 1;
          totalOrCom = totalOrCom + element.orProTotal
        }
        if (element.orProStatus === 'Cancelled') {
          countOrCan = countOrCan + 1;
        }
      })
    setQuanBookingCompleted(countBoCom);
    setQuanBookingCancelled(countBoCan);
    setQuanOrderCompleted(countOrCom);
    setQuanOrderCancelled(countOrCan);
    setTotalPrice(totalBoCom + totalOrCom);
  }, [listBooking, listOrder,value]);



  const hanldeSearch = (e) => setSearch(e.target.value);
  const NextPage = () => setPage(page + 1);
  const PrevPage = () => setPage(page - 1);
  const ClickPage = (e) => setPage(e - 1);


  let rows = [];
  for (let i = 1; i < (dataListSearch?.length / rowsPerPage) + 1; i++) {
    if (i - 1 === page) {
      rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    } else {
      rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    }
  };
  return (
    <>
      <>
        <Container fluid>
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>
          <Row>
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Booking
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Completed: {quanBookingCompleted}
                   
                      </div>   
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Cancelled: {quanBookingCancelled}
                      </div>   
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Order
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Completed: {quanOrderCompleted}                 
                      </div>   
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        Cancelled: {quanOrderCancelled}
                      </div> 
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                          Revenue
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {parseFloat(totalPrice).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} />
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Pending Requests
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-comments fa-2x text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </Row>
          <Row>
            <Col xl={8} lg={7}>
              <DashboardBarChart
                listBooking={listBooking}
                listOrder={listOrder}
                year={value.get('year')}
              />
            </Col>

            <Col xl={4} lg={5} style={{ borderLeft: 1, borderLeftStyle: 'solid', height: 'auto' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  variant="inline"
                  openTo="year"
                  views={["year"]}
                  slotProps={{ textField: { fullWidth: true } }}
                  label="Year"
                  minDate={dayjs(new Date('1-1-2018'))}
                  maxDate={dateNow}
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
              <Row style={{ overflowY: 'scroll', maxHeight: 600 }}>
                {React.Children.toArray(labels.map((item, index) => {
                  var countOrCom = 0;
                  var countOrCan = 0;
                  var totalOrCom = 0;
                  var countBoCom = 0;
                  var countBoCan = 0;
                  var totalBoCom = 0;
                  listBooking.filter((bo) =>
                    new Date(bo?.createdAt).getFullYear() === value.get('year') &&
                    new Date(bo?.createdAt).getMonth() + 1 === index + 1).forEach((element) => {
                      if (element.boStatus === 'Completed') {
                        countBoCom = countBoCom + 1;
                        totalBoCom = totalBoCom + element.boTotal
                      }
                      if (element.boStatus === 'Cancelled') {
                        countBoCan = countBoCan + 1;
                      }
                    })

                  listOrder.filter((bo) =>
                    new Date(bo?.createdAt).getFullYear() === value.get('year') &&
                    new Date(bo?.createdAt).getMonth() + 1 === index + 1).forEach((element) => {
                      if (element.orProStatus === 'Completed') {
                        countOrCom = countOrCom + 1;
                        totalOrCom = totalOrCom + element.orProTotal
                      }
                      if (element.orProStatus === 'Cancelled') {
                        countOrCan = countOrCan + 1;
                      }
                    })
                  return (
                    <Col xs={12} style={{ marginBottom: 10 }}>
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                {item}
                              </div>
                              <Table responsive="sm">
                                <thead>
                                  <tr>
                                    <th className='col-6'></th>
                                    <th className='col-3'></th>
                                    <th className='col-3'></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Booking - Completed</td>
                                    <td>{countBoCom}</td>
                                    <td>{parseFloat(totalBoCom).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                  </tr>
                                  <tr>
                                    <td>Booking - Cancelled</td>
                                    <td>{countBoCan}</td>
                                    <td>0 <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                  </tr>
                                  <tr>
                                    <td>Order - Completed</td>
                                    <td>{countOrCom}</td>
                                    <td>{parseFloat(totalOrCom).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                  </tr>
                                  <tr>
                                    <td>Order - Cancelled</td>
                                    <td>{countOrCan}</td>
                                    <td>0 <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                  </tr>
                                  <tr>
                                    <td>Total</td>
                                    <td></td>
                                    <td>{parseFloat(totalBoCom + totalOrCom).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                }))}
              </Row>
            </Col>
          </Row>
          <Row>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0 text-gray-800">Service staff achievements</h6>
            </div>
            <Row>
              <Col lg={4} xs={12}>
              </Col>
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
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Total booking</th>
                  <th>Booking - Completed</th>
                  <th>Booking - Cancelled</th>
                </tr>
              </thead>
              <tbody>
                {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                  var countBoCom = 0;
                  var countBoCan = 0;
                  listBooking.filter((bo) =>
                    new Date(bo?.createdAt).getFullYear() === value.get('year') && bo.employeeId === item.usId).forEach((element) => {
                      if (element.boStatus === 'Completed') {
                        countBoCom = countBoCom + 1;
                      }
                      if (element.boStatus === 'Cancelled') {
                        countBoCan = countBoCan + 1;
                      }
                    })
                  return (
                    <tr>
                      <td>{item.usId}</td>
                      <td>
                        <Avatar alt="Remy Sharp" src={item.usImage} />
                      </td>
                      <td>{item.usUserName}</td>
                      <td>{countBoCan + countBoCom}</td>
                      <td>{countBoCom}</td>
                      <td>{countBoCan}</td>
                    </tr>
                  )
                }))}
              </tbody>
            </Table>
            {Math.floor(dataListSearch?.length / rowsPerPage) !== 0 ?
              <Col md={{ span: 10, offset: 10 }}>
                <Pagination>
                  {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                  {rows}
                  {page === Math.floor(dataListSearch?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                </Pagination>
              </Col> : null
            }
          </Row>
        </Container>
      </>

    </>
  )
}

export default DashboardPage
