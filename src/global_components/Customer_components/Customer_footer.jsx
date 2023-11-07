import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../../assets/scss/Customer/Footer_customer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CustomerFooter = () => {
    return (
        <>
            {/* Start Footer Area */}
            <footer className="footer">
                {/* Footer Top */}
                <div className="footer-top section">
                    <Container>
                        <Row>
                            <Col xs={12} md={6} lg={6}>
                                {/* Single Widget */}
                                <div className="single-footer about">
                                    <div className="logo">
                                        <a href="index.html"><img src={require("../../assets/template/images/logo2.png")} alt="!#" /></a>
                                    </div>
                                    <p className="text">483 Dien Bien Phu, Ward 25, Binh Thanh, Ho Chi Minh city, Viet Nam</p>
                                    <p className="text">Business Certificate Number: 010.7467.693</p>
                                    <p className="text">License Date: 08/06/2016</p>
                                    <p className="text">Issued by: Investment Planning Department Ho Chi Minh </p>
                                    <img className="moit-icon" src="https://storage.30shine.com/ResourceWeb/data/images/congthuongicon.png" alt="cong-thuong-icon"></img>
                                    <img className="dmca-icon" src="https://images.dmca.com/Badges/dmca_protected_26_120.png?ID=1e720659-fbd3-461e-858a-89ef9307260a" alt="dmca-icon" />
                                </div>
                                {/* End Single Widget */}
                            </Col>
                            <Col xs={12} md={3} lg={3}>
                                {/* Single Widget */}
                                <div className="single-footer links">
                                    <h4>Information</h4>
                                    <ul>
                                        <li><a href="!#">About Us</a></li>
                                        <li><a href="!#">Privacy policy</a></li>
                                        <li><a href="!#">Contact Us</a></li>
                                        <li><a href="!#">General trading conditions</a></li>
                                    </ul>
                                </div>
                                {/* End Single Widget */}
                            </Col>

                            <Col xs={12} md={3} lg={3}>
                                {/* Single Widget */}
                                <div className="single-footer social">
                                    <h4>Get In Tuch</h4>
                                    {/* Single Widget */}
                                    <div className="contact">
                                        <ul>
                                            <li>Monday to Sunday(8: am - 8:30 pm).</li>
                                            <li>hutech@hutech.edu.vn.</li>
                                            <li>+(028) 5445 7777</li>
                                        </ul>
                                    </div>
                                    {/* End Single Widget */}
                                    <div className="icon">
                                    <ul>
                                        <li><a href="!#"><FontAwesomeIcon icon={['fab', 'facebook']} /></a></li>
                                        <li><a href="!#"><FontAwesomeIcon icon={['fab', 'google']} /></a></li>
                                        <li><a href="!#"><FontAwesomeIcon icon={['fab', 'twitter']} /></a></li>
                                        <li><a href="!#"><FontAwesomeIcon icon={['fab', 'instagram']} /></a></li>
                                    </ul>
                                    </div>
                                    
                                </div>
                                {/* End Single Widget */}
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* End Footer Top  */}
                <div className="copyright">
                    <Container>
                        <div className="inner">
                            <Row>
                                <Col xs={12} md={6} lg={6}>
                                    <div className="left">
                                        <p>Copyright © 2020 <a href="!#" target="_blank">Wpthemesgrid</a>  -  All Rights Reserved.</p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} lg={6}>
                                    <div className="right">
                                        <img src={require("../../assets/template/images/payments.png")} alt="logo" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </footer>
            {/* /End Footer Area */}
        </>
    )
}

export default CustomerFooter