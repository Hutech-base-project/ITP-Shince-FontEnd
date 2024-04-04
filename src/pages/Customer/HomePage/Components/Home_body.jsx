import React, { useEffect, useState } from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/scss/Customer/HomePage/HomeBody_customer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { get_all_products } from '../../../../redux/Product/product_page_thunk'
import { useDispatch } from 'react-redux'
const HomeBody = () => {
    const dispatch = useDispatch();
    const [dataListPro, setDataListPro] = useState([]);
    useEffect(() => {
        dispatch(get_all_products()).then((res) => {
            if (!res.error) {
                setDataListPro(res.payload.responseData.filter((pro) => (pro?.isDelete === false)));
            }
        });
    }, [dispatch]);
    return (
        <>
            <div className='home-body'>
                <section className="small-banner section">
                    <Container fluid>
                        <Row>
                            <Col xs={12} md={6} lg={4}>
                                <div className="single-banner">
                                    <img src={require("../../../../assets/images/banner1.jpg")} alt="!#" />
                                    <div className="content">
                                        <p>Man's Collectons</p>
                                        <h3>Summer Product <br /> collection</h3>
                                        <a href="/product">Shop Now</a>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <div className="single-banner">
                                    <img src={require("../../../../assets/images/banner2.jpg")} alt="!#" />
                                    <div className="content">
                                        <p>Service Collectons</p>
                                        <h3>5 star <br /> service</h3>
                                        <a href="/service">Service</a>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                                <div className="single-banner">
                                    <img src={require("../../../../assets/images/banner3.jpg")} alt="!#" />
                                    <div className="content">
                                        <p>Booking</p>
                                        <h3>Booking<br /> now</h3>
                                        <a href="/booking">Booking</a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>


                <div className="product-area section">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div className="section-title">
                                    <h2>New Product</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div className="product-info">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="man" role="tabpanel">
                                            <div className="tab-single">
                                                <Row>
                                                    {React.Children.toArray(dataListPro?.slice(0, 8).map((item) => {
                                                        return (
                                                            <Col xs={12} md={4} lg={4} xl={3}>
                                                                <div className="single-product">
                                                                    <div className="product-img">
                                                                        <a href="product-details.html">
                                                                            <img className="default-img" src={
                                                                                process.env.REACT_APP_API_URL +
                                                                                "/image/product/" +
                                                                                item.featureImgPath} alt="!#" />
                                                                            <img className="hover-img" src={
                                                                                process.env.REACT_APP_API_URL +
                                                                                "/image/product/" +
                                                                                item.featureImgPath} alt="!#" />
                                                                        </a>
                                                                        <div className="button-head">
                                                                            <div className="product-action">
                                                                                <a data-toggle="modal" data-target="!#exampleModal" title="Quick View" href="!#"><FontAwesomeIcon icon={['fa', 'eye']} /><span>Quick Shop</span></a>
                                                                                <a title="Wishlist" hrefLang="!#"><FontAwesomeIcon icon={['fa', 'heart']} /><span>Add to Wishlist</span></a>
                                                                            </div>
                                                                            <div className="product-action-2">
                                                                                <a title="Add to cart" hrefLang="!#" />Add to cart<a />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="product-content" style={{ textAlign: 'center' }}>
                                                                        <h3><a hrefLang="#!" type="button">{item.proName}</a></h3>
                                                                        <div className="product-price">
                                                                            <span>{item.proPrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        )
                                                    }))}

                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <section className="midium-banner">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={6}>
                                <div className="single-banner">
                                    <img src={require('../../../../assets/images/voucher-100.jpg')} alt="!#" />
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <div className="single-banner">
                                    <img src={require('../../../../assets/images/voucher-100.jpg')} alt="!#" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section className="shop-services section home">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={3}>
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'rocket']} />
                                    <h4>Free shiping</h4>
                                    <p>Orders over $100</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                <div className="single-service">
                                    < FontAwesomeIcon icon={['fa', 'rotate']} />
                                    <h4>Free Return</h4>
                                    <p>Within 30 days returns</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'lock']} />
                                    <h4>Sucure Payment</h4>
                                    <p>100% secure payment</p>
                                </div>
                            </Col>
                            <Col xs={12} md={6} lg={3}>
                                {/* <!-- Start Single Service --> */}
                                <div className="single-service">
                                    <FontAwesomeIcon icon={['fa', 'tag']} />
                                    <h4>Best Peice</h4>
                                    <p>Guaranteed price</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

            </div>
        </>
    )
}

export default HomeBody