import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusCate } from '../../../../redux/Category/category_page_selecter';
import { toast } from 'react-toastify';
import { deleteCategories } from '../../../../redux/Category/category_page_thunk';
import { Button, Modal, Spinner, } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DeleteCategory = (props) =>{
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusCate);
    const hanldeDel = () => {
      dispatch(deleteCategories(props.cateid)).then((res1) => {
        if (res1.payload === 200) {
          toast.success('Delete category success !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 600
          });
          props.onHide();
        } else {
          toast.error('Delete category fail !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 600
          });
          props.onHide();
        }
      });
    }
    return (
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title className='title-modal'> <FontAwesomeIcon icon={['fa', 'exclamation-triangle']} /> Warning !!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
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

export default DeleteCategory