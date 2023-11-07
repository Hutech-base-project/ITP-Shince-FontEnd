import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Accordion, Col, Container, Form, Pagination, Row, ToastContainer } from 'react-bootstrap'
import "../../../../assets/scss/Customer/ProductPage/shop_body.scss"
const ProductBody = () => {
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
                        <Form.Control className='form-item-input' type="text" placeholder="Search product" />
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
                          <Accordion.Item eventKey='0'>
                            <Accordion.Header>Dau goi dau</Accordion.Header>
                            <Accordion.Body>
                              <div className="card-body">
                                <div className="shop__sidebar__categories">
                                  <ul className="nice-scroll">
                                    <li><a href="">Clearmen</a></li>
                                    <li><a href="">Sunsilk</a></li>
                                    <li><a href="">Romano</a></li>

                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey='1'>
                            <Accordion.Header>Thuoc</Accordion.Header>
                            <Accordion.Body>
                              <div className="card-body">
                                <div className="shop__sidebar__categories">
                                  <ul className="nice-scroll">
                                    <li><a href="">Clearmen</a></li>
                                    <li><a href="">Sunsilk</a></li>
                                    <li><a href="">Romano</a></li>

                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey='2'>
                            <Accordion.Header>may say toc</Accordion.Header>
                            <Accordion.Body>
                              <div className="card-body">
                                <div className="shop__sidebar__categories">
                                  <ul className="nice-scroll">
                                    <li><a href="">Clearmen</a></li>
                                    <li><a href="">Sunsilk</a></li>
                                    <li><a href="">Romano</a></li>

                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={9} sm={12} xs={12}>
              <Row className='demo' >
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="!#">
                          <img className="pic-1" src={
                            require("../../../../assets/images/clearmen.jpg")} alt='pic-1' />
                          <img className="pic-2" src={
                            require("../../../../assets/images/clearmen2.jpg")} alt='pic-2' />
                        </a>
                      </div>
                      <ul className="social">
                        <li><a href="#!" data-tip="Quick View"><FontAwesomeIcon icon={['fa', 'eye']} /></a></li>
                        <li><a href="#!" data-tip="Add to Wishlist"><FontAwesomeIcon icon={['fa', 'heart']} /></a></li>
                        <li><a href="#!" data-tip="Add to Cart"><FontAwesomeIcon icon={['fa', 'cart-shopping']} /></a></li>
                      </ul>
                      <a className="add-to-cart" href="#!" >Add to cart</a>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Clearmen</a></h3>
                      <span className="price">50.000VND /</span>
                    </div>
                  </Col>
                </Col>
                {/* <Col sx={12} md={'auto'} sm={'auto'}>
                  <Col className='product-grid2'>
                    <div className="product-image2">
                      <div className='product-image2-item'>
                        <a href="#!">
                          <img className="pic-1" src={
                           require("../../../../assets/images/sunsilk.jpg")} alt='' />
                        </a>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="title"><a href="#!">Sunsilk</a></h3>
                      <span className="price" style={{ color: "red" }}>Out of stock</span>
                    </div>
                  </Col>
                </Col> */}
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Ellipsis />

                  <Pagination.Item>{10}</Pagination.Item>
                  <Pagination.Item>{11}</Pagination.Item>
                  <Pagination.Item active>{12}</Pagination.Item>
                  <Pagination.Item>{13}</Pagination.Item>
                  <Pagination.Item disabled>{14}</Pagination.Item>

                  <Pagination.Ellipsis />
                  <Pagination.Item>{20}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </Row>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </section>
    </>
  )
}

export default ProductBody
