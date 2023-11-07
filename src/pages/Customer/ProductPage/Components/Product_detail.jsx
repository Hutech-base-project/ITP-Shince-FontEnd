import React from 'react'
import '../../../../assets/scss/Customer/ProductPage/ProductDetail_customer.scss'
import { Container,Row,Col, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ProductDetail = () => {
    function changeImage(element) {
        let main_prodcut_image = document.getElementById('main_product_image');
        main_prodcut_image.src = element
    }
    return (
        <>
            <Container className="mt-5 mb-5">
                <Card className="card">
                    <Row className="g-0">
                        <Col md={6} className="border-end">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="main_image">
                                    <img
                                        src="https://i.imgur.com/TAzli1U.jpg"
                                        id="main_product_image"
                                        width={350}
                                    />
                                </div>
                                <div className="thumbnail_images">
                                    <ul id="thumbnail">
                                        <li onClick={e=>changeImage("https://i.imgur.com/TAzli1U.jpg")}>
                                            <img                                              
                                                src="https://i.imgur.com/TAzli1U.jpg"
                                                width={70}
                                            />
                                        </li>
                                        <li>
                                            <img
                                                onClick={e=>changeImage("https://i.imgur.com/w6kEctd.jpg")}
                                                src="https://i.imgur.com/w6kEctd.jpg"
                                                width={70}
                                            />
                                        </li>
                                        <li>
                                            <img
                                                onClick={e=>changeImage("https://i.imgur.com/L7hFD8X.jpg")}
                                                src="https://i.imgur.com/L7hFD8X.jpg"
                                                width={70}
                                            />
                                        </li>
                                        <li>
                                            <img
                                                onClick={e=>changeImage("https://i.imgur.com/6ZufmNS.jpg")}
                                                src="https://i.imgur.com/6ZufmNS.jpg"
                                                width={70}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>

                            <div className="p-3 right-side">

                                <div className="d-flex justify-content-between align-items-center">

                                    <h3>IIlana</h3>
                                    <span className="heart">
                                        <FontAwesomeIcon icon="fa-brand fa-heart" />
                                    </span>
                                </div>
                                <div className="mt-2 pr-3 content">

                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua
                                    </p>
                                </div>
                                <h3>$430.99</h3>
                                <div className="ratings d-flex flex-row align-items-center">

                                    <div className="d-flex flex-row">
                                        <FontAwesomeIcon icon="fa-solid fa-star" />
                                        <FontAwesomeIcon icon="fa-solid fa-star" />
                                        <FontAwesomeIcon icon="fa-solid fa-star" />
                                        <FontAwesomeIcon icon="fa-solid fa-star" />
                                        <FontAwesomeIcon icon="fa-regular fa-star-half-alt" />            
                                    </div>
                                    <span>441 reviews</span>
                                </div>
                                <div className="mt-5">

                                    <span className="fw-bold">Color</span>
                                    <div className="colors">

                                        <ul id="marker">

                                            <li id="marker-1" /> <li id="marker-2" /> <li id="marker-3" />
                                            <li id="marker-4" /> <li id="marker-5" />
                                        </ul>
                                    </div>
                                </div>
                                <div className="buttons d-flex flex-row mt-5 gap-3">

                                    <button className="btn btn-outline-dark">Buy Now</button>
                                    <button className="btn btn-outline-dark">Add to Basket</button>
                                </div>
                                <div className="search-option">
                                    <FontAwesomeIcon icon={['fas', 'search']}/>
                                    <div className="inputs">
                                        <input type="text" name="" />
                                    </div>
                                    <FontAwesomeIcon icon={['fas', 'share']} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </>
    )
}

export default ProductDetail