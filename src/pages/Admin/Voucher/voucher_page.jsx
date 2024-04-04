import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Pagination, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import VoucherAdd from './components/voucher_add';
import { get__all_vouchers } from '../../../redux/Voucher/voucher_page_thunk';
import { useState, useEffect } from 'react';
import VoucherEdit from './components/voucher_edit';
import VoucherDelete from './components/voucher_delete';


const VoucherPage = (props) => {
    const [createShow, setCreateShow] = useState(false);
    const [deleteshow, setDeleteShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [dataEdit, setDataEdit] = useState({})
    const [idDel, setIdDel] = useState("")
    const [dataListVoucher, setDataListVoucher] = useState([]);
    const [dataListSearch, setDataListSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage,] = useState(20);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get__all_vouchers()).then((res) => {
            if (!res.error){
                setDataListVoucher(res.payload.responseData.filter((vo) => vo.voTypeAuto === false));
                setDataListSearch(res.payload.responseData.filter((vo) => vo.voTypeAuto === false));
            }
        });
    }, [createShow, editShow, deleteshow, dispatch])


    useEffect(() => {
        if (search !== "") {
            setDataListSearch(dataListVoucher?.filter((vo) => (vo?.voName.toLowerCase()).includes(search.trim().toLowerCase())));
        } else {
            setDataListSearch(dataListVoucher);
        }
    }, [search, dataListVoucher])



    const hanldeSearch = (e) => setSearch(e.target.value);

    const hanldeClickEdit = (data) => {
        setEditShow(true);
        setDataEdit(data);
    }

    const hanldeDelete = (id) => {
        setDeleteShow(true);
        setIdDel(id);
    }

    const NextPage = () => setPage(page + 1);
    const PrevPage = () => setPage(page - 1);
    const ClickPage = (e) => setPage(e - 1);

    let rows = [];
    for (let i = 1; i < (dataListVoucher?.length / rowsPerPage) + 1; i++) {
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
                    <h1 className="h3 mb-0 text-gray-800">Voucher</h1>
                </div>
                <Row>
                    <Col lg={4} xs={12}>
                        {props.dodertor ?
                            <div className="button">
                                <Button variant="success" className="btn-add" onClick={() => setCreateShow(true)}>Add Voucher</Button>
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
                        <VoucherAdd
                            show={createShow}
                            onHide={() => setCreateShow(false)}
                        />
                        <VoucherEdit
                            show={editShow}
                            onHide={() => setEditShow(false)}
                            voucher={dataEdit}
                        />
                        <VoucherDelete
                            show={deleteshow}
                            onHide={() => setDeleteShow(false)}
                            voucherid={idDel}
                        />
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Voucher Name</th>
                                                <th>Price</th>
                                                <th>Count</th>
                                                <th>Product</th>
                                                <th>Service</th>
                                                <th>Function</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                                return (
                                                    <tr>
                                                        <td>{data.voId}</td>
                                                        <td >{data.voName}</td>
                                                        <td>{parseFloat(data.voPrice).toFixed(2)} <FontAwesomeIcon icon={['fas', 'dollar-sign']} /></td>
                                                        <td>{data.voCount}</td>
                                                        <td>{data.voProduct ? "Yes" : "No"}</td>
                                                        <td>{data.voService ? "Yes" : "No"}</td>
                                                        <td >
                                                            {props.dodertor ?
                                                                <>
                                                                    <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(data)} >Edit</Button>
                                                                    <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(data.voId)}>Delete</Button>
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
                    {Math.floor(dataListVoucher?.length / rowsPerPage) !== 0 ?
                        <Col md={4}>
                            <Pagination>
                                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                                {rows}
                                {page === Math.floor(dataListVoucher?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
                            </Pagination>
                        </Col> : null
                    }
                </Row>
            </div>
        </>
    )
}

export default VoucherPage