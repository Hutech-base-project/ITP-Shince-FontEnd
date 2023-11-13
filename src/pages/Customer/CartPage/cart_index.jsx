import React from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header'
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer'
import CartBody from './components/cart_body'
import { Col } from 'react-bootstrap'

const CartIndex = () => {
    return (
        <>
            <CustomerHeader/>
            <main>
                <Col className='body'>
                    <CartBody></CartBody>
                </Col>
            </main>
            <CustomerFooter/>
        </>
    )
}

export default CartIndex