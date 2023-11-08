import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { validate } from 'validate.js'
import { ProductPageValidatePut } from '../../../../utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { selectListPro, selectStatusPro } from '../../../../redux/Product/product_page_selecter'
import { putProducts } from '../../../../redux/Product/product_page_thunk'
import { getCategories } from '../../../../redux/Category/category_page_thunk'

function EditProduct(props) {
    const [checkDuplicatePut, setCheckDuplicatePost] = useState(false);
    const [dataListCate, setDataListCate] = useState([]);
    const dataListProduct = useSelector(selectListPro);
    const [listImg,setListImg] = useState([]);
    const [dataPut, setDataPut] = useState({});
    const dispatch = useDispatch();
    const isLoading = useSelector(selectStatusPro);
    useEffect(() => {
        dispatch(getCategories()).then((res) => {
            setDataListCate(res.payload.responseData);
        });
    }, [dispatch])

    useEffect(() => {
        setDataPut(props.pro);
        setDataPut((preState) => ({
            ...preState,
            featureImgPath: null,
            img1: null,
            img2: null,
            img3: null,
            img4: null,
        }));
        setListImg(props.pro.listImg);
    }, [props])

    const [validationPut, setValidationPut] = useState({
        touched: {},
        errors: {},
        isvalid: false,
    });

    useEffect(() => {
        const errors = validate.validate(dataPut, ProductPageValidatePut);
        setValidationPut((pre) => ({
            ...pre,
            isvalid: errors ? false : true,
            errors: errors || {},
        }));
    }, [dataPut]);

    const hasErrorPut = (field) => {
        return validationPut.touched[field] && validationPut.errors[field]
            ? true
            : false;
    };

    useEffect(() => {
        if (dataListProduct.length !== 0) {
            if (
                dataListProduct.responseData.some((pro) => pro.proId !== dataPut?.proId && pro?.proName === dataPut?.proName && pro?.category_id === dataPut?.category_id) === true
            ) {
                setCheckDuplicatePost(true);
            } else {
                setCheckDuplicatePost(false);
            }
        }
    }, [dataListProduct, dataPut?.proName, dataPut?.category_id, dataPut?.proId]);

    const hanldeChangePut = (e) => {
        setDataPut((preState) => ({
            ...preState,
            [e.target.name]: e.target.value,
        }));
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                [e.target.name]: true,
            },
        }));
    }

    const handleChangeImageUpdate = async (e) => {
        const files = e.target.files;
        setDataPut((preState) => ({
            ...preState,
            [e.target.name]: files[0],
        }));
    };

    const hanldeSelectPut = (e) => {
        if (parseInt(e.target.value) === 0) {
            setDataPut((preState) => ({
                ...preState,
                category_id: null,
            }));
        } else {
            setDataPut((preState) => ({
                ...preState,
                category_id: parseInt(e.target.value),
            }));
        }

    }

    const hanldeProPut = (e) => {
        setValidationPut((pre) => ({
            ...pre,
            touched: {
                ...pre.touched,
                proName: true,
                proContent: true,
                proBrand: true,
                proPrice: true,
                category_id: true,
            },
        }));
        if (validationPut.isvalid === true && checkDuplicatePut === false) {
            setValidationPut((pre) => ({
                ...pre,
                touched: {
                    ...pre.touched,
                    proName: false,
                    proContent: false,
                    proBrand: false,
                    proPrice: false,
                    category_id: false,
                },
            }));
            dispatch(putProducts(dataPut)).then((res1) => {
                if (res1.payload === 200) {
                    toast.success('Create product success !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                } else {
                    toast.error('Create product fail !', {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 600
                    });
                    props.onHide();
                }
            });
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicProName">
                        <Form.Label>Product name</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={props.pro.proName}
                            placeholder="Enter Product name"
                            name="proName"
                            onChange={hanldeChangePut}
                            isInvalid={hasErrorPut("proName")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPut("proName") ? validationPut.errors.proName?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProPrice">
                        <Form.Label>Product price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product price"
                            name="proPrice"
                            defaultValue={parseFloat(props?.pro.proPrice).toFixed(2)}
                            onChange={hanldeChangePut}
                            isInvalid={hasErrorPut("proPrice")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPut("proPrice") ? validationPut.errors.proPrice?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicProImg" className="mb-3">
                        <Form.Label>Product image</Form.Label>
                        <Form.Control type="file"
                            accept="image/*"
                            name='featureImgPath'
                            onChange={handleChangeImageUpdate}
                        />
                        {props.pro.featureImgPath !== null ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/product/" +
                                props.pro.featureImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg1" className="mb-3">
                        <Form.Label>Children Image 1</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img1'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(0) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/product-child/" +
                                listImg.at(0).proImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg2" className="mb-3">
                        <Form.Label>Children Image 2</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img2'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(1) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/product-child/" +
                                listImg.at(1).proImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg3" className="mb-3">
                        <Form.Label>Children Image 3</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img3'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(2) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/product-child/" +
                                listImg.at(2).proImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group controlId="formBasicChildentImg4" className="mb-3">
                        <Form.Label>Children Image 4</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            name='img4'
                            onChange={handleChangeImageUpdate}
                        />
                        {listImg?.at(3) !== undefined ?
                            <img src={
                                process.env.REACT_APP_API_URL +
                                "/image/product-child/" +
                                listImg.at(3).proImgPath}
                                style={{
                                    padding: 6,
                                    cursor: "pointer",
                                    height: 200,
                                    width: 200,
                                }} alt="" /> : ""
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProContent">
                        <Form.Label>Product Content</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Content"
                            name="proContent"
                            defaultValue={props.pro.proContent}
                            as="textarea"
                            onChange={hanldeChangePut}
                            isInvalid={hasErrorPut("proContent")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPut("proContent") ? validationPut.errors.proContent?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProBrand">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Brand"
                            name="proBrand"
                            defaultValue={props.pro.proBrand}
                            onChange={hanldeChangePut}
                            isInvalid={hasErrorPut("proBrand")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPut("proBrand") ? validationPut.errors.proBrand?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicProBrand">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category_id"
                            isInvalid={hasErrorPut("category_id")}
                            onChange={hanldeSelectPut}
                            defaultValue={props.pro.category_id}
                        >
                            <option value={0} >Not selected</option>
                            {React.Children.toArray(dataListCate.map((item) => {
                                let id = 0;
                                if (item.cateIdParent === 0) {
                                    id = item.cateId;
                                    return (
                                        <>
                                            <option value={item.cateId}>{item.cateName}</option>
                                            {
                                                React.Children.toArray(dataListCate.map((chilItem) => {
                                                    if (chilItem.cateIdParent === id) {
                                                        return <option value={chilItem.cateId}>--{chilItem.cateName}</option>;
                                                    }
                                                    return null;
                                                }))
                                            }
                                        </>
                                    )
                                }
                                return null;
                            }))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {hasErrorPut("category_id") ? validationPut.errors.category_id?.[0] : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={hanldeProPut}>
                    {isLoading === true ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : "Update"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default EditProduct