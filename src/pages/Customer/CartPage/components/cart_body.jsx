import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import CartShoppingCart from './cart_shoppingCart';
import CartSummary from './cart_summary';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { selectCheckOut } from '../../../../redux/Storage/storage_page_selecter';
import CartCheckOut from './cart_check_out';

const CartBody = () => {
    const checkout = useSelector(selectCheckOut);
    const [libraries] = useState(["places"]);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    return (
        <>
            <section className='shopping-cart'>
                <Container className="card-shopping">
                    <Row>
                        {checkout === false ?
                            <>
                                <Col md={8} className="cart">
                                    <CartShoppingCart />
                                </Col>
                                <Col md={4} className="summary">
                                    <CartSummary />
                                </Col>
                            </> :
                            isLoaded ?
                                <CartCheckOut/>
                                : null
                        }
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default CartBody