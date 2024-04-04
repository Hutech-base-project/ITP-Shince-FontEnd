import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { OnChekOut } from '../../../../redux/Storage/storage_page_reducer';
import { Col, Row } from 'react-bootstrap';
import '../../../../assets/scss/Customer/CartPage/cart_body.scss'
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';
import { ToastContainer, toast } from 'react-toastify';

const CartSummary = () => {
  const dispatch = useDispatch();
    const cartList = useSelector(selectCartPro);
  

    const totalPrice = () => {
        let total = 0;
        cartList?.forEach(cart => {
            if((cart.proTurnOn === true && cart.proStatus !== "Out Of Stock")){
                total = total + (cart.proProductPrice * cart.proQuantity)
            }     
        });
        return total.toFixed(2);
    }

    const hanldeCheckOut = () => {
        const check = false;
        cartList?.forEach(cart => {
            if(cart.proTurnOn === false){
               check = true;
            }
            if(cart.proStatus === "Out Of Stock"){
                check = true;
            }     
        });
        if(check === true){
            toast.error("The shopping cart has out-of-stock products, please delete that product", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });
        }else{
            dispatch(OnChekOut());
        }   
    }
  return (
    <>
        <div><h5><b>Summary</b></h5></div>
            <hr />
            {React.Children.toArray(cartList?.map((cart) => {
                return (
                    <>
                        <Row>
                            <Col xs={8} className='col-title'>{cart.proProductName}</Col>
                            {(cart.proTurnOn === true && cart.proStatus !== "Out Of Stock") ?
                                <Col xs={3}className="text-right">{(cart.proProductPrice * cart.proQuantity).toFixed(2)} $</Col>
                                :
                                <Col xs={3}className="text-right">Out Of Stock</Col>
                            }
                            
                        </Row>
                    </>
                )
            }))}
            <Row className='row-title'>
                <Col xs={8} className='col-title'>TOTAL PRICE</Col>
                <Col xs={3} className="text-right">{totalPrice()} $</Col>
            </Row>
            {cartList.length > 0 ?
                <button className="btn" onClick={hanldeCheckOut}>CHECKOUT</button> : <button className="btn" disabled>CHECKOUT</button>
            }
            <ToastContainer />
    </>
  )
}

export default CartSummary