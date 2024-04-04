import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { get_all_products } from '../../../../redux/Product/product_page_thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { selectCartPro } from '../../../../redux/Cart/cart_page_selecter';
import { addToCart } from '../../../../redux/Cart/cart_page_reducer';
import { delete_whish_list, get__all_whish_list_by_user_id } from '../../../../redux/WhishList/whish_list_page_thunk';
import { selectSession } from '../../../../redux/Auth/auth_page_selecter';


const WishlistProduct = (props) => {
    const dispatch = useDispatch();
    const [dataListPro, setDataListPro] = useState([]);
    const [dataWhishListPro, setDataWhishListPro] = useState([]);
    const session = useSelector(selectSession);
    const cartList = useSelector(selectCartPro);
    useEffect(() => {
        dispatch(get_all_products()).then((res) => {
            setDataListPro(res.payload.responseData);
        });
    }, [dispatch]);

    useEffect(() => {
        if (props.data !== null) {
            let data = [];
            props.data.filter((wl) => wl.productId !== null && wl.serceId === null).forEach(item => {

                dataListPro.forEach(element => {
                    if (item.productId === element.proId) {
                        data.push({
                            whlId: item.whlId,
                            Product: element,
                        });
                    }
                });
            })
            setDataWhishListPro(data);
        }
    }, [dataListPro, props.data]);
    

    const hanldeRemoveWishList = (idWl,item) => {
        dispatch(delete_whish_list(idWl)).then((res) => {
          if (!res.error) {
            dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
              if (!res.error) {
                toast.success('Remove wish list success !', {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 600
                }); 
                let data = [];
                res.payload.responseData.filter((wl) => wl.productId !== null && wl.serceId === null).forEach(item => {
                    dataListPro.forEach(element => {
                        if (item.productId === element.proId) {
                            data.push({
                                whlId: item.whlId,
                                Product: element,
                            });
                        }
                    });
                })
                setDataWhishListPro(data);
              }
            });
          }
        });
      }
    const hanldeAddCart = (e) => {
        let quantity = 1;
        let cart = {
          proProductName: e.proName,
          proProductPrice: e.proPrice,
          proQuantity: quantity,
          productId: e.proId,
        }
    
        const quantityOnCart = cartList?.find((item) => item?.productId === e.proId);
        if (quantityOnCart !== undefined) {
          if (quantityOnCart?.proQuantity >= 10) {
            toast.error('Add product fail !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
          } else {
            quantity = quantityOnCart?.proQuantity + 1;
            cart.proQuantity = quantity;
            dispatch(addToCart({ ...cart }));
            toast.success('Add product success !', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600
            });
          }
        } else {
          dispatch(addToCart({ ...cart }));
          toast.success('Add product success !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 600
          });
        }
    }
    return (
        <>
            <div className="table-responsive wishlist-table margin-bottom-none">
                <table className="table" style={{ minHeight:200}}>
                    <tbody >
                        {dataWhishListPro.length > 0 ?
                             React.Children.toArray(dataWhishListPro?.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <Row className="product-item d-flex align-items-center">
                                                <Col xs={8} md='auto'>
                                                    <a className="product-thumb" href="!#">
                                                        <img
                                                            src={
                                                                process.env.REACT_APP_API_URL +
                                                                "/image/product/" +
                                                                item.Product.featureImgPath}
                                                            alt="Product"
                                                        />
                                                    </a>
                                                    <div className="product-info">
                                                        <h4 className="product-title">
                                                            <div>{item.Product.proName}</div>
                                                        </h4>
                                                        <div className="text-lg text-medium text-muted">{item.Product.proPrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                                                        <div>
                                                            Availability:
                                                            {item.Product.proTurnOn === true ?
                                                                <div className="d-inline text-success">In Stock</div>
                                                                :
                                                                <div className="d-inline text-success">Out Of Stock</div>
                                                            }

                                                        </div>
                                                    </div>
                                                </Col>
                                                {item.Product.proTurnOn === true ?
                                                    <Col xs={2} md='auto'>
                                                        <Button variant="success" className='btn btn-remove' onClick={()=>hanldeAddCart(item.Product)}><span>Add to cart</span></Button>{' '}
                                                    </Col>
                                                    :
                                                    null
                                                }
                                                <Col xs={2} md='auto'>
                                                    <Button variant="secondary" className='btn btn-remove'  onClick={()=>hanldeRemoveWishList(item.whlId,item)}>Remove</Button>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td className="text-center">
                                            <a
                                                className="remove-from-cart"
                                                href="!#"
                                                data-toggle="tooltip"
                                                title=""
                                                data-original-title="Remove item"
                                            >
                                                <i className="icon-cross" />
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }))
                            :
                            <tr>
                                <td style={{textAlign:'center'}}>
                                    <h6>There are no favorite products</h6>
                                </td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WishlistProduct