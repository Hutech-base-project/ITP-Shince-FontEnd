import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../../../../assets/scss/Customer/Product/ProductBody_customer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ProductBody = () => {
    return (
        <>
            <div className="product-body">
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <div className="bread-inner">
                                    <ul className="bread-list">
                                        <li><a href="/">Home<span className="icon"><FontAwesomeIcon icon={['fas', 'arrow-right']} /></span></a></li>
                                        <li className="active"><a href="blog-single.html">Shop Grid</a></li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* /Breadcrumbs */}

                {/* Product Style */}
                <section className="product-area shop-sidebar shop section">
                    <Container>
                        <Row>
                            <Col xs={12} md={4} lg={3}>
                                <div className="shop-sidebar">
                                    {/* Single Widget */}
                                    <div className="single-widget category">
                                        <h3 className="title">Categories</h3>
                                        <ul className="categor-list">
                                            <li><a href="!#">T-shirts</a></li>
                                            <li><a href="!#">jacket</a></li>
                                            <li><a href="!#">jeans</a></li>
                                            <li><a href="!#">sweatshirts</a></li>
                                            <li><a href="!#">trousers</a></li>
                                            <li><a href="!#">kitwears</a></li>
                                            <li><a href="!#">accessories</a></li>
                                        </ul>
                                    </div>
                                    {/* End Single Widget */}
                                    {/* Shop By Price */}
                                    <div className="single-widget range">
                                        <h3 className="title">Shop by Price</h3>
                                        <ul className="check-box-list">
                                            <li>
                                                <label className="checkbox-inline" for="1"><input name="news" id="1" type="checkbox" />$20 - $50<span className="count">(3)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" for="2"><input name="news" id="2" type="checkbox" />$50 - $100<span className="count">(5)</span></label>
                                            </li>
                                            <li>
                                                <label className="checkbox-inline" for="3"><input name="news" id="3" type="checkbox" />$100 - $250<span className="count">(8)</span></label>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* End Shop By Price */}
                                    {/* Single Widget */}
                                    <div className="single-widget recent-post">
                                        <h3 className="title">Recent post</h3>
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="!#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="!#">Girls Dress</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="!#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="!#">Women Clothings</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                        {/* Single Post */}
                                        <div className="single-post first">
                                            <div className="image">
                                                <img src="https://via.placeholder.com/75x75" alt="!#" />
                                            </div>
                                            <div className="content">
                                                <h5><a href="!#">Man Tshirt</a></h5>
                                                <p className="price">$99.50</p>
                                                <ul className="reviews">
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                    <li className="yellow"><i className="ti-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        {/* End Single Post */}
                                    </div>
                                    {/* End Single Widget */}
                                    {/* Shop By Price */}
                                    <div className="single-widget category">
                                        <h3 className="title">Manufacturers</h3>
                                        <ul className="categor-list">
                                            <li><a href="!#">Forever</a></li>
                                            <li><a href="!#">giordano</a></li>
                                            <li><a href="!#">abercrombie</a></li>
                                            <li><a href="!#">ecko united</a></li>
                                            <li><a href="!#">zara</a></li>
                                        </ul>
                                    </div>
                                    {/* End Single Widget */}
                                </div>
                            </Col>
                            <Col xs={12} md={8} lg={9}>
                                <Row>
                                    <Col xs={12}>
                                        {/* Shop Top */}
                                        <div className="shop-top">
                                            <div className="shop-shorter">
                                                <div className="single-shorter">
                                                    <label>Show :</label>
                                                    <select>
                                                        <option className="a" value={"09"} selected="selected">09</option>
                                                        <option className="a" value={"15"}>15</option>
                                                        <option className="a" value={"25"}>25</option>
                                                        <option className="a" value={"30"}>30</option>
                                                    </select>
                                                </div>
                                                <div className="single-shorter">
                                                    <label>Sort By :</label>
                                                    <select>
                                                        <option selected="selected">Name</option>
                                                        <option>Price</option>
                                                        <option>Size</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                </a>
                                                <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="new">New</span>
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="price-dec">30% Off</span>
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
                                                    </div>
                                                    <div className="product-action-2">
                                                        <a title="Add to cart" href="!#">Add to cart</a>
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
                                    <Col xs={12} md={6} lg={4}>
                                        <div className="single-product">
                                            <div className="product-img">
                                                <a href="product-details.html">
                                                    <img className="default-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <img className="hover-img" src="https://via.placeholder.com/550x750" alt="!#" />
                                                    <span className="out-of-stock">Hot</span>
                                                </a>
                                             <div className="button-head">
                                                    <div className="product-action">
                                                        <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'eye']} />
                                                            <span>Quick Shop</span>
                                                        </a>
                                                        <a title="Wishlist" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'heart']} />
                                                            <span>Add to Wishlist</span>
                                                        </a>
                                                        <a title="Compare" href="!#">
                                                            <FontAwesomeIcon icon={['fas', 'bar-chart']} />
                                                                <span>Add to Compare</span>
                                                        </a>
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
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* End Product Style 1 */}
            </div>
        </>
    )
}

export default ProductBody