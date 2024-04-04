import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Pagination, Row } from 'react-bootstrap'
import { block_services, get_all_services } from '../../../redux/Service/service_page_thunk'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import ServiceAdd from './components/service_add'
import ServiceEdit from './components/service_edit'
import ServiceDelete from './components/service_delete'


const ServicePage = (props) => {
    const [createShow, setCreateShow] = useState(false);
    const [deleteshow, setDeleteShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [dataEdit, setDataEdit] = useState({})
    const [idDel, setIdDel] = useState("")
    const [dataListService, setDataListService] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(20);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_all_services()).then((res) => {
            if (!res.error){
                setDataListService(res.payload.responseData);
                setDataListSearch(res.payload.responseData);
            }
        });
    }, [createShow, editShow, deleteshow, dispatch])


    useEffect(() => {
        if (search !== "") {
            setDataListSearch(dataListService?.filter((ser) => (ser?.seName.toLowerCase()).includes(search.trim().toLowerCase())));
        } else {
            setDataListSearch(dataListService);
        }
    }, [search, dataListService])



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

    const hanldeStatus = (ser) => {
        dispatch(block_services(ser)).then((res1) => {
            if (!res1.error) {
                dispatch(get_all_services()).then((res) => {
                    setDataListService(res.payload.responseData);
                    setDataListSearch(res.payload.responseData);
                });
                toast.success('Change status Service success !', {
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
    for (let i = 1; i < (dataListService?.length / rowsPerPage) + 1; i++) {
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
                    <h1 className="h3 mb-0 text-gray-800">Service</h1>
                </div>
                <Row>
                    <Col lg={4} xs={12}>
                        {props.dodertor ?
                            <div className="button">
                                <Button variant="success" className="btn-add" onClick={() => setCreateShow(true)}>Add Service</Button>
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
                                <button className="btn btn-primary" type="button">
                                    <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                                </button>
                            </div>
                        </div>
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a
                                className="nav-link dropdown-toggle"
                                href="!#"
                                id="searchDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                            </a>
                            {/* Dropdown - Messages */}
                            <div
                                className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown"
                            >
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control bg-light border-0 small"
                                            placeholder="Search for..."
                                            aria-label="Search"
                                            aria-describedby="basic-addon2"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </Col>
                </Row>
                <Row>
                    <Col xl={12} md={12} lg={12}>
                        <ServiceAdd
                            show={createShow}
                            onHide={() => setCreateShow(false)}
                        />
                        <ServiceEdit
                            show={editShow}
                            onHide={() => setEditShow(false)}
                            ser={dataEdit}
                        />
                        <  ServiceDelete
                            show={deleteshow}
                            onHide={() => setDeleteShow(false)}
                            seid={idDel}
                        />
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Service Name</th>
                                                <th>Price</th>
                                                <th>Description</th>
                                                <th>Image</th>
                                                <th>Status</th>
                                                <th>Function</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                                return (
                                                    <tr>
                                                        <td>{data.seId}</td>
                                                        <td >{data.seName}</td>
                                                        <td>{parseFloat(data.sePrice).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                                        <td >{data.seDescription}</td>
                                                        <td><img src={
                                                            process.env.REACT_APP_API_URL +
                                                            "/image/service/" +
                                                            data.seImage} style={{
                                                                backgroundColor: "#22d3ee",
                                                                color: "white",
                                                                borderRadius: "30px",
                                                                padding: 6,
                                                                cursor: "pointer",
                                                                height: 200,
                                                                width: 200,
                                                            }} alt="" /></td>
                                                        <td>{
                                                            data.seTurnOn === true ? <Button variant="success" onClick={() => hanldeStatus(data)}>On</Button> : <Button variant="danger" onClick={() => hanldeStatus(data)}>Off</Button>
                                                        }</td>
                                                        <td >
                                                            {props.dodertor ?
                                                                <>
                                                                    <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(data)} >Edit</Button>
                                                                    <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(data.seId)}>Delete</Button>
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
                    {Math.floor(dataListService?.length / rowsPerPage) !== 0 ?
                        <Col md={4}>
                            <Pagination>
                                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                {rows}
                                {page === Math.floor(dataListService?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                            </Pagination>
                        </Col> : null
                    }
                </Row>
            </div>
        </>
    )
}

export default ServicePage