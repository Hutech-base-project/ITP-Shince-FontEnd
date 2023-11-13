import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusSer } from '../../../../redux/Service/service_page_selecter';
import { delete_services } from '../../../../redux/Service/service_page_thunk';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const ServiceDelete = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusSer);
    const hanldeDel = () => {
        dispatch(delete_services(props.seid)).then((res1) => {
            if (res1.payload === 200) {
                toast.success('Delete Services success !', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
                props.onHide();
            } else {
                toast.error('Delete Service fail!!!! this service is on booking by customer or does not turn off yet', {
                    position: toast.POSITION.TOP_RIGHT,
                    utoClose: 600
                });
                props.onHide();
            }
        });
    }
    return (
        <>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title className='title-modal'> <FontAwesomeIcon icon={['fa', 'exclamation-triangle']} /> Warning !!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this service?!</Modal.Body>
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

export default ServiceDelete