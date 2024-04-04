import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusSer } from '../../../../redux/Service/service_page_selecter';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { delete_voucher } from '../../../../redux/Voucher/voucher_page_thunk';

const VoucherDelete = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusSer);
    const hanldeDel = () => {
        dispatch(delete_voucher(props.voucherid)).then((res) => {
            if (!res.error) {
                toast.success('Delete Voucher success !', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
                props.onHide();
            } else {
                toast.error(res.payload, {
                    position: toast.POSITION.TOP_RIGHT,
                    utoClose: 1000
                });
                props.onHide();
            }
        });
    }
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title className='title-modal' style={{color:'red'}}> <FontAwesomeIcon icon={['fa', 'exclamation-triangle']} /> Warning !!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this voucher?!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={hanldeDel}>
                        {isLoading === true ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : "Delete"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default VoucherDelete