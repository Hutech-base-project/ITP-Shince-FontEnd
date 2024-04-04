import React from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectStatusPro } from '../../../../redux/Product/product_page_selecter'
import {  delete_product } from '../../../../redux/Product/product_page_thunk'
function DeleteProduct(props) {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusPro);
    const hanldeDel = () => {
        dispatch(delete_product(props.proid)).then((res) => {
            if (!res.error) {
                toast.success('Delete product success !', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
                props.onHide();
            } else {
                toast.error(res.payload, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                });
                props.onHide();
            }
        });
    }
    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                <Modal.Title className='title-modal' style={{color:'red'}}> <FontAwesomeIcon icon={['fa', 'exclamation-triangle']} /> Warning !!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this product?!</Modal.Body>
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
    )
}

export default DeleteProduct;