import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState,useEffect } from 'react'
import { Accordion, Col, Container, Form, Pagination, Row } from 'react-bootstrap'
import "../../../../assets/scss/Customer/ProductPage/shop_body.scss"
import { useDispatch, useSelector } from 'react-redux'
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';
import { get__all_categories } from '../../../../redux/Category/category_page_thunk';
import {  get_all_products } from '../../../../redux/Product/product_page_thunk';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart } from '../../../../redux/Cart/cart_page_reducer';

const ProductBody = () => {
  const dispatch = useDispatch();
  const [dataListCate, setDataListCate] = useState([]);
  const [dataListPro, setDataListPro] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(6);
  const [search, setSearch] = useState("");
  const cartList = useSelector(selectCartPro);
  useEffect(() => {
    dispatch(get__all_categories()).then((res) => {
      setDataListCate(res.payload.responseData);
    });
    dispatch(get_all_products()).then((res) => {
      setDataListPro(res.payload.responseData);
      setDataListSearch(res.payload.responseData);
    });
  }, [dispatch]);

  useEffect(() => {
    if (search !== null) {
      setDataListSearch(dataListPro?.filter((pro) => (pro?.proName.toLowerCase()).includes(search.toLowerCase())));
    } else {
      setDataListSearch(dataListPro);
    }
  }, [search, dataListPro])

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
      e.target.value = '';
    }
  }

  let rows = [];
  for (let i = 1; i < (dataListSearch?.length / rowsPerPage) + 1; i++) {
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

  const hanldeCate = (e) => {
    if (parseInt(e) !== 0) {
      setDataListSearch(dataListPro?.filter((pro) => (pro?.category_id === parseInt(e))))
    } else {
      setDataListSearch(dataListPro);
    }
  }

  const hanldeSearch = (e) => {
    setSearch(e.target.value);
  }

  const hanldeAddCart = (e) => {
    let quantity = 1;
    let cart = {
      proProductName: e.proName,
      proProductPrice: e.proPrice,
      proQuantity: quantity,
      productId: e.proId,
    }

    const quantityOnCart = cartList?.find((item) => item?.productId === e.proId);
    if (quantityOnCart !== undefined) {
      if (quantityOnCart?.proQuantity >= 10) {
        toast.error('Add product fail !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      } else {
        quantity = quantityOnCart?.proQuantity + 1;
        cart.proQuantity = quantity;
        dispatch(addToCart({ ...cart }));
        toast.success('Add product success !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      }
    } else {
      dispatch(addToCart({ ...cart }));
      toast.success('Add product success !', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 600
      });
    }
  }
  return (
    <>
      <section className='shop'>
        <Container>
          <Row>
            <Col md={3} sm={12} xs={12}>
              <div className='shop-siderbar'>
                <div className="shop-sidebar-search">
                  <Form className='form' as={Col} >
                    <Form.Group>
                      <Col className='form-item'>
                        <Form.Control className='form-item-input' type="text" placeholder="Search product" onChange={hanldeSearch} />
                        <FontAwesomeIcon className='form-item-icon' icon={['fa', 'search']} />
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
                <div className='shop-sidebar-accordion'>
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <span className="title">Categories</span>
                      <Accordion defaultActiveKey={['0']} >
                        <>
                          {React.Children.toArray(dataListCate?.map((item, index) => {
                            let id = 0;
                            if (item.cateIdParent === 0) {
                              id = item.cateId;
                              return (
                                <>
                                  <Accordion.Item eventKey={index.toString()}>
                                    <Accordion.Header>{item.cateName}</Accordion.Header>
                                    <Accordion.Body>
                                      <div className="card-body">
                                        <div className="shop__sidebar__categories">
                                          <ul className="nice-scroll">
                                            <li><a href="#!" onClick={() => hanldeCate(item.cateId)}>All products in {item.cateName}</a></li>
                                            {
                                              React.Children.toArray(dataListCate?.map((chilItem) => {
                                                if (chilItem.cateIdParent === id) {
                                                  return <li><a href="#!" onClick={() => hanldeCate(chilItem.cateId)}>{chilItem.cateName}</a></li>;
                                                }
                                                return null;
                                              }))
                                            }
                                          </ul>
                                        </div>
                                      </div>
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </>
                              )
                            }
                            return null;
                          }))}
                        </>
                      </Accordion>
                      <a href="#!" onClick={() => hanldeCate(0)} className="getAll">All</a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={9} sm={12} xs={12}>
              <Row className='demo' >
                {dataListSearch?.length > 0 ?
                  React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                    if (item.isDelete === false) {
                      if (item.proTurnOn === true) {
                        return (
                          <Col sx={12} md={'auto'} sm={'auto'} key={index}>
                            <Col className='product-grid2'>
                              <div className="product-image2">
                                <div className='product-image2-item'>
                                  <a href="!#">
                                    <img className="pic-1" src={
                                      process.env.REACT_APP_API_URL +
                                      "/image/product/" +
                                      item.featureImgPath} alt='pic-1' />
                                    <img className="pic-2" src={
                                      process.env.REACT_APP_API_URL +
                                      "/image/product/" +
                                      item.featureImgPath} alt='pic-2' />
                                  </a>
                                </div>
                                <ul className="social">
                                  <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                                  <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                                  <li><a href="#!" data-tip="Add to Cart"  onClick={()=>hanldeAddCart(item)}><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                                </ul>
                                <a className="add-to-cart" href="#!" onClick={() => hanldeAddCart(item)}>Add to cart</a>
                              </div>
                              <div className="product-content">
                                <h3 className="title"><a href="#!">{item.proName}</a></h3>
                                <span className="price">{item.proPrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></span>
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
                                  <a href="#!">
                                    <img className="pic-1" src={
                                      process.env.REACT_APP_API_URL +
                                      "/image/product/" +
                                      item.featureImgPath} alt='' />
                                  </a>
                                </div>
                              </div>
                              <div className="product-content">
                                <h3 className="title"><a href="#!">{item.proName}</a></h3>
                                <span className="price" style={{ color: "red" }}>Out of stock</span>
                              </div>
                            </Col>
                          </Col>
                        )
                      }
                    }
                    return null;
                  })) :
                  <span className="mess">No products found</span>}
              </Row>
            </Col>
            <Col>
              {Math.floor(dataListSearch?.length / rowsPerPage) !== 0 ?
                <Col >
                  <Pagination>
                    {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                    {rows}
                    {page === Math.floor(dataListPro?.length / rowsPerPage - 1) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
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

export default ProductBody
