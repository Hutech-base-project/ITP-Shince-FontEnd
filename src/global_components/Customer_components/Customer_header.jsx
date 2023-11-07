import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap'

const CustomerHeader = () => {
    const [niceSelcet, setNiceSelect] = useState(false);
    const [sizeScreen, setSizeScreen] = useState(window.innerWidth);

    function handleNiceSelect() {
        if (niceSelcet === false) {
            document.getElementById("nice-select-list").classList.add('open');
        
            setNiceSelect(true);
        } else {
            document.getElementById("nice-select-list").classList.remove('open');
            setNiceSelect(false);
        }
    }

    useEffect(() => {
        if(sizeScreen <= 991){
            document.getElementById('middle').style.display = 'none'
        }else{
            document.getElementById('middle').style.display = 'block'
        }
    },[sizeScreen])

    window.addEventListener("resize", function (e) {
        setSizeScreen(this.window.innerWidth)
    });

    window.addEventListener('click', function click(e) {
        // if (!e.target.matches("#navbar")) {
        //     document.getElementById("responsive-navbar-nav").classList.remove("show")
        //     setCollapse(false);
        // }
    })

    window.addEventListener("scroll", function() {
       if(this.window.scrollY > 100 ){
            this.document.getElementById("navbar").classList.add("sticky")
       }else{
            this.document.getElementById("navbar").classList.remove("sticky")
       }
    });
    return (
        <>
            {/* <!-- Header --> */}
            <header className="header">
                <div className="middle-inner" id="middle">
                    <Container>
                        <Row>
                            <Col lg={2} md={2} xs={12}>
                                {/* Logo */}
                                <div className="logo">
                                    <a href="!#"><img src={require("../../assets/template/images/logo.png")} alt="logo" /></a>
                                </div>
                            </Col>
                            <Col xs={12} md={7} lg={8}>
                                <div className="search-bar-top">
                                    <div className="search-bar">
                                        <Row>
                                            <Col md={3} className='search-bar-select' >
                                                <div className="nice-select" >
                                                    <button className="current" onClick={handleNiceSelect}>
                                                        <span className='title-select'>All Category</span>
                                                        <span className='icon'>
                                                            {niceSelcet === false ?
                                                                <FontAwesomeIcon icon={['fas', 'chevron-up']} />
                                                                :
                                                                <FontAwesomeIcon icon={['fas', 'chevron-down']} />
                                                            }
                                                        </span>
                                                    </button>
                                                    <ul id="nice-select-list" className="list" >
                                                        <li data-value="watch" className="option">watch</li>
                                                        <li data-value="mobile" className="option">mobile</li>
                                                        <li data-value="kid’s item" className="option">kid’s item</li>
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col md={9} className='search-bar-input'>
                                                <input name="search" placeholder="Search Products Here....." type="text" />
                                                <button className="btnn">

                                                    <FontAwesomeIcon icon={['fas', 'search']} size='lg' />
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={3} lg={2}>
                                <div className="right-bar">
                                    <Row>
                                        {/* <!-- Search Form --> */}
                                        <div className="sinlge-bar">
                                            <a href="!#" className="single-icon">
                                                <FontAwesomeIcon icon={['fas', 'heart']} size='lg' />
                                            </a>
                                        </div>
                                        <div className="sinlge-bar">
                                            <a href="!#" className="single-icon">
                                                <FontAwesomeIcon icon={['fa', 'user-circle']} size='lg' />
                                            </a>
                                        </div>
                                        <div className="sinlge-bar shopping">
                                            <a href="!#" className="single-icon">
                                                <FontAwesomeIcon icon={['fa', 'shopping-bag']} size='lg' />
                                                <span className="total-count">2</span>
                                            </a>
                                            {/* <!-- Shopping Item --> */}
                                            <div className="shopping-item">
                                                <div className="dropdown-cart-header">
                                                    <span>2 Items</span>
                                                    <a href="!#">View Cart</a>
                                                </div>
                                                <ul className="shopping-list">
                                                    <li>
                                                        <a href="!#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                                                        <a className="cart-img" href="!#"><img src="https://via.placeholder.com/70x70" alt="!#" /></a>
                                                        <h4><a href="!#">Woman Ring</a></h4>
                                                        <p className="quantity">1x - <span className="amount">$99.00</span></p>
                                                    </li>
                                                    <li>
                                                        <a href="!#" className="remove" title="Remove this item"><i className="fa fa-remove"></i></a>
                                                        <a className="cart-img" href="!#"><img src="https://via.placeholder.com/70x70" alt="!#" /></a>
                                                        <h4><a href="!#">Woman Necklace</a></h4>
                                                        <p className="quantity">1x - <span className="amount">$35.00</span></p>
                                                    </li>
                                                </ul>
                                                <div className="bottom">
                                                    <div className="total">
                                                        <span>Total</span>
                                                        <span className="total-amount">$134.00</span>
                                                    </div>
                                                    <a href="checkout.html" className="btn animate">Checkout</a>
                                                </div>
                                            </div>
                                            {/* <!--/ End Shopping Item --> */}
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/* <!-- Header Inner --> */}
                <div class="header-inner" id="navbar">
                    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg={sizeScreen > 991? "dark" : "light"} data-bs-theme={sizeScreen > 991? "dark" : "light"}>
                        <Container fluid = {sizeScreen <= 991 ? true : false}>
                            {sizeScreen <= 991 ? <Navbar.Brand href={undefined}><img src={require("../../assets/template/images/logo.png")} alt="logo" /></Navbar.Brand> : ''}
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/product">Product</Nav.Link>
                                    <Nav.Link href="#pricing">Service</Nav.Link>
                                    <Nav.Link href="#pricing">About us</Nav.Link>
                                    <Nav.Link href="#pricing">Contact</Nav.Link>
                                </Nav>
                                {sizeScreen <= 991 ?  <Nav>
                                    <Nav.Link href="#deets">More deets</Nav.Link>
                                    <Nav.Link eventKey={2} href="#memes">
                                        Dank memes
                                    </Nav.Link>
                                </Nav> : ''}
                               
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                {/* <!--/ End Header Inner --> */}
            </header>
            {/* <!--/ End Header --> */}
        </>
    )
}

export default CustomerHeader