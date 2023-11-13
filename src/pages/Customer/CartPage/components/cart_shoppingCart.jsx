import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/Customer/CartPage/cart_body.scss'
import { useDispatch, useSelector } from 'react-redux';
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToCart, removeCart } from '../../../../redux/Cart/cart_page_reducer';
import { ToastContainer, toast } from 'react-toastify'
import { get__all_categories } from '../../../../redux/Category/category_page_thunk';
import { get_all_products } from '../../../../redux/Product/product_page_thunk';

const CartShoppingCart = () => {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartPro);
  const [dataListPro, setDataListPro] = useState([]);
  const [dataListCate, setDataListCate] = useState([]);
  useEffect(() => {
    dispatch(get__all_categories()).then((res) => {
      setDataListCate(res.payload.responseData);
    });
    dispatch(get_all_products()).then((res) => {
      setDataListPro(res.payload.responseData);
    });
  }, [dispatch]);

  const convertCate = (e) => {
    let name = "";
    dataListCate.forEach((item) => {
      if (item.cateId === e) {
        name = item.cateName;
      }
    })
    return name;
  }

  const hanldeMinus = (e) =>{
    let quantity = 1;
      let cart = {
        proProductName: e.proName,
        proProductPrice: e.proPrice,
        proQuantity: quantity,
        productId: e.productId,
      }
    
    const quantityOnCart = cartList?.find((item) => item?.productId === e.productId);
    if(quantityOnCart !== undefined){
      if (quantityOnCart?.proQuantity > 1) {
        quantity = quantityOnCart?.proQuantity - 1;
        cart.proQuantity  = quantity;
        dispatch(addToCart({ ...cart}));
      }
    }
  }

  const hanldePlus = (e) =>{
    let quantity = 1;
      let cart = {
        proProductName: e.proName,
        proProductPrice: e.proPrice,
        proQuantity: quantity,
        productId: e.productId,
      }
    
    const quantityOnCart = cartList?.find((item) => item?.productId === e.productId);
    
    if(quantityOnCart !== undefined){
      if (quantityOnCart?.proQuantity < 10) {
        quantity = quantityOnCart?.proQuantity + 1;
        cart.proQuantity  = quantity;
        dispatch(addToCart({ ...cart}));
      }else{
        toast.error('The number of products has passed 10 !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      }
    }
  }

  const hanldeRemoveItem = (e) =>{
    dispatch(removeCart(e));
  }

  return (
    <>
      <div className="title">
        <Row>
          <Col><h4><b>Shopping Cart</b></h4></Col>
          {cartList.length > 0?
            <Col className="align-self-center text-right text-muted">{cartList.length} items</Col>
            :
            null
          }
        </Row>
      </div>
      {cartList.length > 0?
      React.Children.toArray(dataListPro?.map((item) => {
        return (
          React.Children.toArray(cartList?.map((cart) => {
            if (cart?.productId === item?.proId) {
              return (
                <>
                  <Row className="border-top border-bottom">
                    <Row className="main align-items-center">
                      <Col>
                        <img
                          className="img-fluid"
                          src={process.env.REACT_APP_API_URL + "/image/product/" + item.featureImgPath
                          } alt='' />
                      </Col>
                      <Col>
                        <Row className="text-muted">{convertCate(item.category_id)}</Row>
                        <Row>{item.proName}</Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <a href="#!" className="minus" onClick={()=>hanldeMinus(cart)}><FontAwesomeIcon icon={['fa', 'minus']} /></a>
                          </Col>
                          <Col className="border">{cart.proQuantity}</Col>
                          <Col>
                            <a href="#!" className="plus" onClick={()=>hanldePlus(cart)}><FontAwesomeIcon icon={['fa', 'plus']} /></a>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                          <Row>
                            <Col>{item.proPrice}</Col>
                            <Col><FontAwesomeIcon icon={['far', 'trash-alt']} onClick={()=>hanldeRemoveItem(cart.productId)}/></Col>
                          </Row>
                      </Col>
                     
                    </Row>
                  </Row>
                </>
              )
            }
            return null;
          }))
        )
      }))
      :
      <Col className='mess'>
        <span >You have no products in your cart</span>
      </Col>
      }
      <div className="back-to-shop"> <a href="/product"><FontAwesomeIcon icon={['fa', 'arrow-left']} /><span className="text-muted"> Back to shop</span></a> </div>
      <ToastContainer />
    </>
  )
}

export default CartShoppingCart