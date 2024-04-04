import React, { useEffect, useState } from 'react'
import '../../../../assets/scss/Customer/Profile/ProfileVoucher.scss'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { get_session } from '../../../../redux/Auth/auth_page_thunk';
import { get__vouchers_by_user_id } from '../../../../redux/Voucher/voucher_page_thunk';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileVoucher = () => {
    const dispatch = useDispatch();
    const [listVoucher, setListVoucher] = useState([]);
    const [session,setSession] = useState(sessionStorage.getItem("voucher-code"));

    useEffect(() => {
        let id = sessionStorage.getItem("id");
        dispatch(get_session(id)).then((res) => {
            if (!res.error) {
                let userid = res.payload.responseData.id;
                dispatch(get__vouchers_by_user_id(userid)).then((res1) => {
                    if (!res.error) {
                        setListVoucher(res1.payload?.responseData)
                    }
                })
            }
        });
    }, [dispatch])

    
    return (
        <>
            <div className='voucher-body'>
                <section id='voucher-section'>
                    <Row>
                        <div className='title-section'>
                            <Row>
                                <h3>Voucher</h3>
                                <p>Manage your voucher here</p>
                            </Row>
                        </div>
                    </Row>
                    <hr />
                    <Row>
                        {listVoucher?.map((data) => {
                            return (
                                <Col sx={12} md={'auto'} sm={'auto'} key={data.voId}>
                                    <Col className='voucher-grid2'>
                                        <div className="product-content">
                                            <div className="top">
                                                <h3 className="title">{data.voName}</h3>
                                            </div>
                                            <div className="bottom">
                                            <p className="condition">Code: {data.voId}</p>
                                            {session !== data.voId?
                                                <Button className="btnAdd" variant="success" onClick={()=>{
                                                    sessionStorage.setItem('voucher-code',data.voId)
                                                    setSession(data.voId)
                                                }}>Use</Button>
                                                :
                                                <Button className="btnAdd" variant="success" onClick={()=>{
                                                    sessionStorage.removeItem('voucher-code')
                                                    setSession(null)
                                                }}><FontAwesomeIcon icon={['fa', 'check']} size='lg' /></Button>
                                            }
                                            
                                            </div>
                                        </div>
                                    </Col>
                                </Col>
                            )
                        })}
                    </Row>
                </section>
            </div>
        </>
    )
}

export default ProfileVoucher
