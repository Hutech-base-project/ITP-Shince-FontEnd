import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/scss/Customer/Home/HomeBody_customer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
const HomeBody = () => {
    return (
        <>
            <div className='home-body'>
                <section className="small-banner section">
                    <Container fluid>
                        <Row>
                            {/* /Single Banner   */}
                            <Col xs={12} md={6} lg={4}>
                                <div className="single-banner">
                                    <img src="https://via.placeholder.com/600x370" alt="!#" />
                                    <div className="content">
                                        <p>Man's Collectons</p>
                                        <h3>Summer travel <br /> collection</h3>
                                        <a href="!#">Discover Now</a>
                                    </div>
                                </div>
                            </Col>
                            {/* /End Single Banner   */}
                            {/* /Single Banner   */}
                            <Col xs={12} md={6} lg={4}>
                                <div className="single-banner">
                                    <img src="https://via.placeholder.com/600x370" alt="!#" />
                                    <div className="content">
                                        <p>Bag Collectons</p>
                                        <h3>Awesome Bag <br /> 2020</h3>
                                        <a href="!#">Shop Now</a>
                                    </div>
                                </div>
                            </Col>
                            {/* /End Single Banner   */}
                            {/* /Single Banner   */}
                            <Col xs={12} lg={4}>
                                <div className="single-banner tab-height">
                                    <img src="https://via.placeholder.com/600x370" alt="!#" />
                                    <div className="content">
                                        <p>Flash Sale</p>
                                        <h3>Mid Season <br /> Up to <span>40%</span> Off</h3>
                                        <a href="!#">Discover Now</a>
                                    </div>
                                </div>
                            </Col>
                            {/* /End Single Banner   */}
                        </Row>
                    </Container>
                </section>

                {/* /Start Product Area  */}
                <div className="product-area section">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div className="section-title">
                                    <h2>Trending Item</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div className="product-info">
                                    <div className="tab-content" id="myTabContent">
                                        {/* /Start Single Tab  */}
                                        <div className="tab-pane fade show active" id="man" role="tabpanel">
                                            <div className="tab-single">
                                                <Row>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Women Hot Collection</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Awesome Pink Show</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Awesome Bags Collection</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <span className="new">New</span>
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Women Pant Collectons</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Awesome Bags Collection</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <span className="price-dec">30% Off</span>
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Awesome Cap For Women</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Polo Dress For Women</a></h3>
                                                                <div className="product-price">
                                                                    <span>$29.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={4} xl={3}>
                                                        <div className="single-product">
                                                            <div className="product-img">
                                                                <a href="product-details.html">
                                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                                    <span className="out-of-stock">Hot</span>
                                                                </a>
                                                                <div className="button-head">
                                                                    <div className="product-action">
                                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                        <a title="Wishlist" href="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                        <a title="Compare" href="!#"><FontAwesomeIcon icon={['fa', 'chart-simple']} /><span>Add to Compare</span></a>
                                                                    </div>
                                                                    <div className="product-action-2">
                                                                        <a title="Add to cart" href="!#" >Add to cart</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="product-content">
                                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                                <div className="product-price">
                                                                    <span className="old">$60.00</span>
                                                                    <span>$50.00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        {/* / End Single Tab */}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* /End Product Area  */}
                {/* /Start Midium Banner   */}
                <section className="midium-banner">
                    <Container>
                        <Row>
                            {/* /Single Banner   */}
                            <Col xs={12} md={6} lg={6}>
                                <div className="single-banner">
                                    <img src="https://via.placeholder.com/600x370" alt="!#" />
                                    <div className="content">
                                        <p>Man's Collectons</p>
                                        <h3>Man's items <br />Up to<span> 50%</span></h3>
                                        <a href="!#">Shop Now</a>
                                    </div>
                                </div>
                            </Col>
                            {/* /End Single Banner  
                            /Single Banner   */}
                            <Col xs={12} md={6} lg={6}>
                                <div className="single-banner">
                                    <img src="https://via.placeholder.com/600x370" alt="!#" />
                                    <div className="content">
                                        <p>shoes women</p>
                                        <h3>mid season <br /> up to <span>70%</span></h3>
                                        <a href="!#" className="btn">Shop Now</a>
                                    </div>
                                </div>
                            </Col>
                            {/* /End Single Banner   */}
                        </Row>
                    </Container>
                </section>
                {/* /End Midium Banner  */}


                <div className="product-area most-popular section">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div className="section-title">
                                    <h2>Hot Item</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <OwlCarousel className='owl-theme' loop nav dots autoPlay items={4} >
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />

                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />

                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="out-of-stock">Hot</span>
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="out-of-stock">Hot</span>
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="out-of-stock">Hot</span>
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='item'>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="out-of-stock">Hot</span>
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
                                                        <a title="Wishlist" href="!#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
                                                        <a title="Compare" href="!#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="product-content">
                                                <h3><a href="product-details.html">Black Sunglass For Women</a></h3>
                                                <div className="product-price">
                                                    <span className="old">$60.00</span>
                                                    <span>$50.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                  
                                </OwlCarousel>

                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* <!-- Start Shop Home List  --> */}
                <section className="shop-home-list section">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <Row>
                                    <Col xs={12}>
                                        <div className="shop-section-title">
                                            <h1>On sale</h1>
                                        </div>
                                    </Col>
                                </Row>
                                {/* Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h4 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h4>
                                                <p className="price with-discount">$59</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* End Single List  
                                Start Single List  */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$44</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  
                                /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$89</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List   */}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Row>
                                    <div className="col-12">
                                        <div className="shop-section-title">
                                            <h1>Best Seller</h1>
                                        </div>
                                    </div>
                                </Row>
                                {/* /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$65</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  
                                /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$33</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  
                                /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$77</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  */}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <Row>
                                    <div className="col-12">
                                        <div className="shop-section-title">
                                            <h1>Top viewed</h1>
                                        </div>
                                    </div>
                                </Row>
                                {/* /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$22</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  
                                /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$35</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List  
                                /Start Single List   */}
                                <div className="single-list">
                                    <Row>
                                        <Col xs={12} md={6} lg={6}>
                                            <div className="list-image overlay">
                                                <img src="https://via.placeholder.com/115x140" alt="!#" />
                                                <a href="!#" className="buy"><i className="fa fa-shopping-bag"></i></a>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6} lg={6} className="no-padding">
                                            <div className="content">
                                                <h5 className="title"><a href="!#">Licity jelly leg flat Sandals</a></h5>
                                                <p className="price with-discount">$99</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                {/* /End Single List   */}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* /End Shop Home List   */}
                {/* <!-- Start Cowndown Area --> */}
                <section className="cown-down">
                    <div className="section-inner ">
                        <Container fluid>
                            <Row>
                                <Col xs={12} lg={6} className="padding-right">
                                    <div className="image">
                                        <img src="https://via.placeholder.com/750x590" alt="!#" />
                                    </div>
                                </Col>
                                <Col xs={12} lg={6} className="padding-left">
                                    <div className="content">
                                        <div className="heading-block">
                                            <p className="small-title">Deal of day</p>
                                            <h3 className="title">Beatutyful dress for women</h3>
                                            <p className="text">Suspendisse massa leo, vestibulum cursus nulla sit amet, frungilla placerat lorem. Cars fermentum, sapien. </p>
                                            <h1 className="price">$1200 <s>$1890</s></h1>
                                            <div className="coming-time">
                                                <div className="clearfix" data-countdown="2021/02/30"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
                {/* <!-- /End Cowndown Area --> */}

                {/* <!-- Start Shop Blog  --> */}
                <section className="shop-blog section">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div className="section-title">
                                    <h2>From Our Blog</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                {/* <!-- Start Single Blog  --> */}
                                <div className="shop-single-blog">
                                    <img src="https://via.placeholder.com/370x300" alt="!#" />
                                    <div className="content">
                                        <p className="date">22 July , 2020. Monday</p>
                                        <a href="!#" className="title">Sed adipiscing ornare.</a>
                                        <a href="!#" className="more-btn">Continue Reading</a>
                                    </div>
                                </div>
                                {/* <!-- End Single Blog  --> */}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                {/* <!-- Start Single Blog  --> */}
                                <div className="shop-single-blog">
                                    <img src="https://via.placeholder.com/370x300" alt="!#" />
                                    <div className="content">
                                        <p className="date">22 July, 2020. Monday</p>
                                        <a href="!#" className="title">Man’s Fashion Winter Sale</a>
                                        <a href="!#" className="more-btn">Continue Reading</a>
                                    </div>
                                </div>
                                {/* <!-- End Single Blog  --> */}
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                {/* <!-- Start Single Blog  --> */}
                                <div className="shop-single-blog">
                                    <img src="https://via.placeholder.com/370x300" alt="!#" />
                                    <div className="content">
                                        <p className="date">22 July, 2020. Monday</p>
                                        <a href="!#" className="title">Women Fashion Festive</a>
                                        <a href="!#" className="more-btn">Continue Reading</a>
                                    </div>
                                </div>
                                {/* <!-- End Single Blog  --> */}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* <!-- End Shop Blog  --> */}

                {/* <!-- Start Shop Services Area --> */}
                <section className="shop-services section home">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={3}>
                                {/* <!-- Start Single Service --> */}
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'rocket']} />
                                    <h4>Free shiping</h4>
                                    <p>Orders over $100</p>
                                </div>
                                {/* <!-- End Single Service --> */}
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                {/* <!-- Start Single Service --> */}
                                <div className="single-service">
                                    < FontAwesomeIcon icon={['fa', 'rotate']} />
                                    <h4>Free Return</h4>
                                    <p>Within 30 days returns</p>
                                </div>
                                {/* <!-- End Single Service --> */}
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                {/* <!-- Start Single Service --> */}
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'lock']} />
                                    <h4>Sucure Payment</h4>
                                    <p>100% secure payment</p>
                                </div>
                                {/* <!-- End Single Service --> */}
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                {/* <!-- Start Single Service --> */}
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'tag']} />
                                    <h4>Best Peice</h4>
                                    <p>Guaranteed price</p>
                                </div>
                                {/* <!-- End Single Service --> */}
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* <!-- End Shop Services Area --> */}

                {/* <!-- Start Shop Newsletter  --> */}
                <section className="shop-newsletter section">
                    <Container>
                        <div className="inner-top">
                            <Row>
                                <Col xs={12} lg={8} className="offset-lg-2">
                                    {/* <!-- Start Newsletter Inner --> */}
                                    <div className="inner">
                                        <h4>Newsletter</h4>
                                        <p> Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
                                        <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner">
                                            <input name="EMAIL" placeholder="Your email address" required="" type="email" />
                                            <button className="btn">Subscribe</button>
                                        </form>
                                    </div>
                                    {/* <!-- End Newsletter Inner --> */}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </section>
                {/* <!-- End Shop Newsletter --> */}
            </div>
        </>
    )
}

export default HomeBody