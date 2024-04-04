import React, { useEffect, useState } from 'react'
import { Button, Col, Pagination, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddProduct from './Component/product_add'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { get_all_products, block_product } from '../../../redux/Product/product_page_thunk'
import EditProduct from './Component/product_edit'
import DeleteProduct from './Component/product_delete'

const ProductPage = (props) => {
    const [createShow, setCreateShow] = useState(false);
    const [deleteshow, setDeleteShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [dataEdit, setDataEdit] = useState({})
    const [idDel, setIdDel] = useState("")
    const [dataListProduct, setDataListProduct] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(20);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_all_products()).then((res) => {
            if (!res.error){
                setDataListProduct(res.payload.responseData?.filter((pro) => (pro?.isDelete === false )))
                setDataListSearch(res.payload.responseData?.filter((pro) => (pro?.isDelete === false)))
            }    
        });
    }, [createShow, editShow, deleteshow, dispatch])
    useEffect(() => {
        if (search !== "") {
            setDataListSearch(dataListProduct?.filter((pro) => (pro?.proName.toLowerCase()).includes(search.trim().toLowerCase())));
        } else {
            setDataListSearch(dataListProduct);
        }
    }, [search, dataListProduct])



    const hanldeSearch = (e) => {
        setSearch(e.target.value);
    }

    const hanldeClickEdit = (data) => {
        setEditShow(true);
        setDataEdit(data);
    }

    const hanldeDelete = (id) => {
        setDeleteShow(true);
        setIdDel(id);
    }

    const hanldeStatus = (pro) => {
        dispatch(block_product(pro)).then((res1) => {
            if (!res1.error) {
                dispatch(get_all_products()).then((res) => {
                    setDataListProduct(res.payload.responseData);
                    setDataListSearch(res.payload.responseData);
                });
                toast.success('Create product success !', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
            } else {
                toast.error(res1.payload, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 600
                });
            }
        });
    }

    const NextPage = () => setPage(page + 1);
    const PrevPage = () => setPage(page - 1);
    const ClickPage = (e) => setPage(e - 1);

    let rows = [];
    for (let i = 1; i < (dataListProduct?.length / rowsPerPage) + 1; i++) {
        if (i - 1 === page) {
            rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        } else {
            rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Products</h1>
                </div>
                <Row>
                    <Col lg={4} xs={12}>
                        {props.dodertor ?
                            <div className="button">
                                <Button variant="success" onClick={() => setCreateShow(true)}>Add Product</Button>
                            </div>
                            :
                            null
                        }

                    </Col>
                    <Col lg={8} xs={12}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control search bg-light border-0 small"
                                placeholder="search by Name"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                                onChange={hanldeSearch}
                            />
                            <div className="input-group-append">
                                <Button variant="dark" disabled>
                                    <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} md={12} lg={12}>
                        <AddProduct
                            show={createShow}
                            onHide={() => setCreateShow(false)}
                        />
                        <EditProduct
                            show={editShow}
                            onHide={() => setEditShow(false)}
                            pro={dataEdit}
                        />
                        <  DeleteProduct
                            show={deleteshow}
                            onHide={() => setDeleteShow(false)}
                            proid={idDel}
                        />
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product Name</th>
                                                <th>Price</th>
                                                <th>Content</th>
                                                <th>Brand</th>
                                                <th>Quantity</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Function</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                                return (
                                                    <tr>
                                                        <td>{data.proId}</td>
                                                        <td >{data.proName}</td>
                                                        <td>{parseFloat(data.proPrice).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                                        <td >{data.proContent}</td>
                                                        <td>{data.proBrand}</td>
                                                        <td>{data.proQuantity}</td>
                                                        <td><img src={
                                                            process.env.REACT_APP_API_URL +
                                                            "/image/product/" +
                                                            data.featureImgPath}
                                                            style={{
                                                                backgroundColor: "#22d3ee",
                                                                color: "white",
                                                                borderRadius: "30px",
                                                                padding: 6,
                                                                cursor: "pointer",
                                                                height: 200,
                                                                width: 200,
                                                            }} alt="" /></td>
                                                        <td>{
                                                            data.proTurnOn === true ? <Button variant="success" onClick={() => hanldeStatus(data)}>On</Button> : <Button variant="danger" onClick={() => hanldeStatus(data)}>Off</Button>
                                                        }</td>
                                                        <td >
                                                            {props.dodertor ?
                                                                <>
                                                                    <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(data)}>Edit</Button>
                                                                    <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(data.proId)}>Delete</Button>
                                                                </>
                                                                :
                                                                null
                                                            }

                                                        </td>
                                                    </tr>
                                                )
                                            }))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <ToastContainer />
                </Row>
                <Row className='category-bottom'>
                    {Math.floor(dataListProduct?.length / rowsPerPage) !== 0 ?
                        <Col md={4}>
                            <Pagination>
                                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                {rows}
                                {page === Math.floor(dataListProduct?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                            </Pagination>
                        </Col> : null
                    }
                </Row>
            </div>
        </>
    )
}

export default ProductPage