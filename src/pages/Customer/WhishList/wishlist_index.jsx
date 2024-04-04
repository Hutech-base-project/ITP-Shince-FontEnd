import React, { useEffect, useState } from 'react'
import CustomerHeader from '../../../global_components/Customer_components/Customer_header';
import CustomerFooter from '../../../global_components/Customer_components/Customer_footer';
import { Container, Row, Tab, Tabs } from 'react-bootstrap';
import WishlistProduct from './components/wishlist_product';
import WishlistService from './components/wishlist_service';
import { useDispatch, useSelector } from 'react-redux';
import { selectSession } from '../../../redux/Auth/auth_page_selecter';
import { get__all_whish_list_by_user_id } from '../../../redux/WhishList/whish_list_page_thunk';


const WishlistIndex = () => {
    const dispatch = useDispatch();
    const session = useSelector(selectSession);
    const [dataListWishList, setDataListWishList] = useState([]);
    useEffect(() => {
        if (session !== null) {
          dispatch(get__all_whish_list_by_user_id(session?.responseData?.id)).then((res) => {
            setDataListWishList(res.payload.responseData);
          });
        }
      }, [dispatch,session])
    return (
        <>
            <CustomerHeader />
            <main>
                <Container>
                    <Row>
                        <Tabs
                            defaultActiveKey="Product"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="Product" title="Product">
                                <WishlistProduct data={dataListWishList} />
                            </Tab>
                            <Tab eventKey="Service" title="Service">
                                <WishlistService data={dataListWishList} />
                            </Tab>
                        </Tabs>
                    </Row>
                </Container>
            </main>
            <CustomerFooter />
        </>
    );
}

export default WishlistIndex