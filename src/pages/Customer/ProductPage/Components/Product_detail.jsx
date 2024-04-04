import React from 'react'
import { Row, Col, Modal, Carousel } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { addToCart } from '../../../../redux/Cart/cart_page_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';

/* eslint-disable */
const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const cartList = useSelector(selectCartPro);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.pro);
  }, [props])
  const hanldePlus = () => {
    if (quantity <= 100) {
      setQuantity(quantity + 1);
    }
  }
  const hanldeMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  const hanldeAddCart = (e) => {
    let cart = {
      proProductName: data.proName,
      proProductPrice: data.proPrice,
      proQuantity: quantity,
      productId: data.proId,
    }

    const quantityOnCart = cartList?.find((item) => item?.productId === e.proId);
    if (quantityOnCart !== undefined) {
      if (quantityOnCart?.proQuantity >= 10) {
        toast.error('Add product fail !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
      } else {
        let newQuantity = quantityOnCart?.proQuantity + quantity;
        cart.proQuantity = newQuantity;
        dispatch(addToCart({ ...cart }));
        toast.success('Add product success !', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 600
        });
        setQuantity(1);
      }
    } else {
      dispatch(addToCart({ ...cart }));
      toast.success('Add product success !', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 600
      });
      setQuantity(1);
    }
  }

  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body style={{ height: 550 }}>
        <Row>
          <Col xs={12} md={12} sm={12} lg={6}>
            <Carousel prevIcon={<FontAwesomeIcon className='icon' icon={['fas', 'chevron-left']} />} nextIcon={<FontAwesomeIcon className='icon' icon={['fas', 'chevron-right']} />}>
              {React.Children.toArray(data.listImg?.map((item) => {
                return (
                  <Carousel.Item>
                    <img src={
                      process.env.REACT_APP_API_URL +
                      "/image/product-child/" +
                      item.proImgPath} className='pic-1' alt='pic-1' />
                  </Carousel.Item>
                )
              }))}
            </Carousel>
          </Col>
          <Col xs={12} md={12} sm={12} lg={6}>
            <div className="quickview-content">
              <h2>{props.pro.proName}</h2>
              <div className="quickview-ratting-review">
                <div className="quickview-ratting-wrap">
                  <div className="quickview-ratting">
                    <FontAwesomeIcon className='icon yellow' icon={['fa', 'star']} />
                    <FontAwesomeIcon className='icon yellow' icon={['fa', 'star']} />
                    <FontAwesomeIcon className='icon yellow' icon={['fa', 'star']} />
                    <FontAwesomeIcon className='icon yellow' icon={['fa', 'star']} />
                    <FontAwesomeIcon className='icon' icon={['fa', 'star']} />
                  </div>
                  <a hrefLang="!#" type="button"> (1 customer review)</a>
                </div>
                <div className="quickview-stock">
                  <span> <FontAwesomeIcon className='icon' icon={['far', 'check-circle']} /> in stock</span>
                </div>
              </div>
              <h3>${props.pro.proPrice}</h3>
              <div className="quickview-peragraph">
                <p>
                  {props.pro.proContent}
                </p>
              </div>
              <Row>
                <Col xs={6}>
                  <Row>
                    <a hrefLang='!#' type="button" className="button-minus" onClick={hanldeMinus}>
                      <FontAwesomeIcon className='icon' icon={['fa', 'minus']} />
                    </a>
                    <input type="text" className="input-number" value={quantity} disabled />
                    <a hrefLang='!#' type="button" className="button-plus" onClick={hanldePlus}>
                      <FontAwesomeIcon className='icon' icon={['fa', 'plus']} />
                    </a>
                  </Row>
                </Col>
                <Col xs={6} className='add-to-cart'>
                  <Row>
                    <a hrefLang="!#" type="button" className="btn" onClick={hanldeAddCart}>Add to cart</a>
                  </Row>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}


export default ProductDetail