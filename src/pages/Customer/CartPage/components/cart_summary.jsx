import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OnChekOut } from '../../../../redux/Storage/storage_page_reducer';
import { Col, Row } from 'react-bootstrap';
import '../../../../assets/scss/Customer/CartPage/cart_body.scss'
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';

const CartSummary = () => {
  const dispatch = useDispatch();
    const cartList = useSelector(selectCartPro);
    const totalPrice = () => {
        let total = 0;
        cartList?.forEach(cart => {
            total = total + (cart.proProductPrice * cart.proQuantity)
        });
        return total.toFixed(2);
    }

    const hanldeCheckOut = () => {
        dispatch(OnChekOut());
    }
  return (
    <>
        <div><h5><b>Summary</b></h5></div>
            <hr />
            {React.Children.toArray(cartList?.map((cart) => {
                return (
                    <>
                        <Row>
                            <Col xs={9} className='col-title'>{cart.proProductName}</Col>
                            <Col xs={2}className="text-right">$ {(cart.proProductPrice * cart.proQuantity).toFixed(2)}</Col>
                        </Row>
                    </>
                )
            }))}
            <Row className='row-title'>
                <Col xs={9} className='col-title'>TOTAL PRICE</Col>
                <Col xs={2} className="text-right">$ {totalPrice()}</Col>
            </Row>
            {cartList.length > 0 ?
                <button className="btn" onClick={hanldeCheckOut}>CHECKOUT</button> : <button className="btn" disabled>CHECKOUT</button>
            }
    </>
  )
}

export default CartSummary