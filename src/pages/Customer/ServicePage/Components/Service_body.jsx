import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Col, Container, Form, Pagination, Row, ToastContainer } from 'react-bootstrap'
import "../../../../assets/scss/Customer/ServicePage/ServiceBody.scss"
import { useDispatch, useSelector } from 'react-redux'
import { get_all_services } from '../../../../redux/Service/service_page_thunk'
import { useEffect } from 'react'
import { useState } from 'react'
import { selectSession } from '../../../../redux/Auth/auth_page_selecter'
import { delete_whish_list, get__all_whish_list_by_user_id, post_whish_list } from '../../../../redux/WhishList/whish_list_page_thunk'
import { toast } from 'react-toastify'

 /* eslint-disable */ 
const ServiceBody = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const [dataListWishList, setDataListWishList] = useState([]);
  const [dataListSer, setDataListSer] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(8);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(get_all_services()).then((res) => {
      setDataListSer(res.payload.responseData.filter((ser) => ser?.isDelete === false));
      setDataListSearch(res.payload.responseData.filter((ser) => ser?.isDelete === false));
    });
    if (session !== null) {
      dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
        setDataListWishList(res.payload.responseData);
      });
    }
  }, [dispatch,session])

  useEffect(() => {
    if (search !== null) {
      setDataListSearch(dataListSer?.filter((pro) => (pro?.seName.toLowerCase()).includes(search.toLowerCase())));
    } else {
      setDataListSearch(dataListSer);
    }
  }, [search, dataListSer])

  let rows = [];
  for (let i = 1; i < (dataListSearch.length / rowsPerPage) + 1; i++) {
    if (i - 1 === page) {
      rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    } else {
      rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    }
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

  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  }

  const hanldeRemoveWishList = (id) => {
    dispatch(delete_whish_list(id)).then((res) => {
      if (!res.error) {
        dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
          if (!res.error) {
            toast.success('Remove wish list success !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
            setDataListWishList(res.payload.responseData)
          }
        });
      }
    });
  }

  const hanldeAddWishList = (id) => {
    let dataWishList = {
      isDelete: false,
      serceId: id,
      usersId: session.responseData.id
    };
    dispatch(post_whish_list(dataWishList)).then((res) => {
      if (!res.error) {
        dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
          if (!res.error) {
            toast.success('Add wish list success !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
            setDataListWishList(res.payload.responseData)
          }
        });
      }
    });
  }

  const handleAddService = () => window.location = '/booking';
  return (
    <>
      <section className='service'>
        <Container>
          <Row>
            <Col xs={12}>
              <div className='service-siderbar'>
                <div className="service-sidebar-search">
                  <Form className='form' as={Col} >
                    <Form.Group>
                      <Col className='form-item'>
                        <Form.Control className='form-item-input' type="text" placeholder="Search service" onChange={hanldeSearch} />
                        <FontAwesomeIcon className='form-item-icon' icon={['fa', 'search']} />
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <Row className='demo' >
                {dataListSearch.length > 0 ?
                  React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                    let id;
                    let active = false;

                    dataListWishList.forEach(wish => {
                      if (wish.serceId === item.seId) {
                        active = true;
                        id = wish.whlId;
                      }
                    })
                      if (item.seTurnOn === true) {
                        return (
                          <Col sx={12} sm={6} md={4} lg={'auto'} key={index}>
                            <Col className='product-grid2'>
                              <div className="product-image2">
                                <div className='product-image2-item'>
                                  <a hrefLang="!#" type="button">
                                    <img src={
                                      process.env.REACT_APP_API_URL +
                                      "/image/service/" +
                                      item.seImage} style={{                                  
                                        height: 300,
                                        width: 300,
                                      }} alt="" />
                                  </a>
                                </div>
                                <ul className="social">
                                  <li><a hrefLang="!#" type="button" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                                  {session !== null ?
                                  <li>
                                    {active ?
                                      <a hrefLang="!#" type="button" data-tip="Remove to Wishlist" className='active' onClick={() => hanldeRemoveWishList(id)}><FontAwesomeIcon icon={['fa', 'heart']} /></a>
                                      :
                                      <a hrefLang="!#" type="button" data-tip="Add to Wishlist" onClick={() => hanldeAddWishList(item.seId)}><FontAwesomeIcon icon={['fa', 'heart']} /></a>
                                    }
                                  </li> : null
                                }
                                </ul>
                                <a className="add-to-cart" hrefLang="!#" type="button" onClick={handleAddService}>Booking now  !!!</a>
                              </div>
                              <div className="product-content">
                                <h3 className="title"><a hrefLang="!#" type="button">{item.seName}</a></h3>
                                <span className="price">{item.sePrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></span>
                              </div>
                            </Col>
                          </Col>
                        )
                      } else {
                        return (
                          <Col sx={12} md={'auto'} sm={'auto'}>
                            <Col className='product-grid2'>
                              <div className="product-image2">
                                <div className='product-image2-item'>
                                  <a hrefLang="!#" type="button">
                                    <img src={
                                      process.env.REACT_APP_API_URL +
                                      "/image/service/" +
                                      item.seImage} style={{
                                        backgroundColor: "#22d3ee",
                                        color: "white",
                                        borderRadius: "30px",
                                        padding: 6,
                                        cursor: "pointer",
                                        height: 200,
                                        width: 200,
                                      }} alt="" />
                                  </a>
                                </div>
                              </div>
                              <div className="product-content">
                                <h3 className="title"><a hrefLang="!#" type="button">{item.seName}</a></h3>
                                <span className="price" style={{ color: "red" }}>Service off</span>
                              </div>
                            </Col>
                          </Col>
                        )
                      }})) :
                  <span className="mess">No services found</span>}
              </Row>
            </Col>
            <Col>
              {Math.floor(dataListSearch.length / rowsPerPage) !== 0 ?
                <Col >
                  <Pagination>
                    {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                    {rows}
                    {page === Math.floor(dataListSer.length / rowsPerPage - 1) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                  </Pagination>
                </Col> : null
              }
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </section>
    </>
  )
}

export default ServiceBody
