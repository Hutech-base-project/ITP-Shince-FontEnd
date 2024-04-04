import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { selectSession } from '../../../../redux/Auth/auth_page_selecter';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { delete_whish_list, get__all_whish_list_by_user_id } from '../../../../redux/WhishList/whish_list_page_thunk';
import { toast } from 'react-toastify';
import { get_all_services } from '../../../../redux/Service/service_page_thunk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WishlistService = (props) => {
    const dispatch = useDispatch();
    const [dataListSer, setDataListSer] = useState([]);
    const [dataWhishListSer, setDataWhishListSer] = useState([]);
    const session = useSelector(selectSession);
    useEffect(() => {
        dispatch(get_all_services()).then((res) => {
            setDataListSer(res.payload.responseData);
        });
    }, [dispatch]);

    useEffect(() => {
        if (props.data !== null) {
            let data = [];
            props.data.filter((wl) => wl.productId === null && wl.serceId !== null).forEach(item => {
                dataListSer.forEach(element => {
                    if (item.serceId === element.seId) {
                        data.push({
                            whlId: item.whlId,
                            Service: element,
                        });
                    }
                });
            })
            setDataWhishListSer(data);
        }
    }, [dataListSer, props.data]);

    const hanldeRemoveWishList = (idWl, item) => {
        dispatch(delete_whish_list(idWl)).then((res) => {
            if (!res.error) {
                dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
                    if (!res.error) {
                        toast.success('Remove wish list success !', {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 600
                        });
                        let data = [];
                        res.payload.responseData.filter((wl) => wl.productId === null && wl.serceId !== null).forEach(item => {
                            dataListSer.forEach(element => {
                                if (item.serceId === element.seId) {
                                    data.push({
                                        whlId: item.whlId,
                                        Service: element,
                                    });
                                }
                            });
                        })
                        setDataWhishListSer(data);
                    }
                });
            }
        });
    }
    return (
        <>
            <div className="table-responsive wishlist-table margin-bottom-none">
                <table className="table" style={{ minHeight:200}}>
                    <tbody>
                        {dataWhishListSer.length > 0 ?
                            React.Children.toArray(dataWhishListSer?.map((item) => {
                                return (
                                    <tr>
                                        <td>
                                            <Row className="product-item d-flex align-items-center">
                                                <Col xs={8} md='auto'>
                                                    <a className="product-thumb" href="!#">
                                                        <img
                                                            src={
                                                                process.env.REACT_APP_API_URL +
                                                                "/image/service/" +
                                                                item.Service.seImage}
                                                            alt="Product"
                                                        />
                                                    </a>
                                                    <div className="product-info">
                                                        <h4 className="product-title">
                                                            <div>{item.Service.seName}</div>
                                                        </h4>
                                                        <div className="text-lg text-medium text-muted">{item.Service.sePrice} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></div>
                                                        <div>
                                                            Availability:
                                                            {item.Service.seTurnOn === true ?
                                                                <div className="d-inline text-success">Service on</div>
                                                                :
                                                                <div className="d-inline text-success">Service off</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs={2} md='auto'>
                                                    <Button variant="secondary" className='btn btn-remove' onClick={() => hanldeRemoveWishList(item.whlId, item)}>Remove</Button>
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
                            <tr style={{textAlign:'center'}}>
                                <td style={{ textAlign: 'center', height: 200 }}>
                                    <h6>There are no favorite service</h6>
                                </td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default WishlistService
