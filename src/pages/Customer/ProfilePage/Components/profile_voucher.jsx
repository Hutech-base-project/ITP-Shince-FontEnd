import React from 'react'
import '../../../../assets/scss/Customer/Profile/ProfileVoucher.scss'
import { Card, Col, Row } from 'react-bootstrap'

const ProfileVoucher = () => {
    return (
        <>
            <div className='voucher-body'>
                <section id='voucher-section'>
                    <Row>
                        <div className='title-section'>
                            <Row>
                                <h3>Voucher</h3>
                                <p>Manage your voucher here</p>
                            </Row>
                        </div>
                    </Row>
                    <hr />
                    <Row>

                        <Col sx={12} md={'auto'} sm={'auto'}>
                            <Col className='voucher-grid2'>
                                <div className="voucher-image">
                                    <div className='voucher-image-item'>
                                        <img className="pic-1" src={require("../../../../assets/images/ITPShince-logos_white.png")} alt='pic-1'
                                            style={{
                                                backgroundColor: "#F7941D",
                                                color: "white",
                                                padding: 6,
                                                cursor: "pointer",
                                                height: 300,
                                                width: 250,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3 className="title">Discount 15%</h3>
                                    <p className="condition">when purchasing products over $50</p>
                                </div>
                            </Col>
                        </Col>
                        <Col sx={12} md={'auto'} sm={'auto'}>
                            <Col className='voucher-grid2'>
                                <div className="voucher-image">
                                    <div className='voucher-image-item'>
                                        <img className="pic-1" src={require("../../../../assets/images/ITPShince-logos_white.png")} alt='pic-1'
                                            style={{
                                                backgroundColor: "#F7941D",
                                                color: "white",
                                                padding: 6,
                                                height: 300,
                                                width: 250,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h3 className="title">Discount 15%</h3>
                                    <p className="condition">when purchasing products over $50</p>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </section>
            </div>
        </>
    )
}

export default ProfileVoucher
