import React from "react";
import { Button, Col, Pagination, Row } from "react-bootstrap";
import '../../../assets/scss/Admin/Category/Category.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { get__all_categories } from '../../../redux/Category/category_page_thunk';
import AddCategory from "./component/category_add";
import EditCategory from "./component/category_edit";
import DeleteCategory from "./component/category_delete";


const CategoryPage = (props) => {
  const dispatch = useDispatch();
  const [dataListCate, setDataListCate] = useState([]);
  const [dataListSearch, setDataListSearch] = useState([]);
  const [createShow, setCreateShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteshow, setDeleteShow] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [idDel, setIdDel] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage,] = useState(20);

  useEffect(() => {
    dispatch(get__all_categories()).then((res) => {
        if(!res.error){
          setDataListCate(res.payload.responseData);
          setDataListSearch(res.payload.responseData);
        }
    });
  }, [dispatch, createShow, editShow, deleteshow]);

  useEffect(() => {
    if (search !== "") {
      setDataListSearch(dataListCate?.filter((cate) => (cate?.cateName.toLowerCase()).includes(search.toLowerCase())));
    } else {
      setDataListSearch(dataListCate);
    }
  }, [search, dataListCate]);

  const hanldeClickEdit = (data) => {
    setEditShow(true);
    setDataEdit(data);
  };

  const hanldeDelete = (id) => {
    setDeleteShow(true);
    setIdDel(id);
  };

  const convertCateParent = (e) => {
    let check = false;
    let name = "";
    dataListCate.forEach((item) => {
      if (item.cateId === e) {
        check = true;
        name = item.cateName;
      }
    })
    if (check === false) {
      return "main";
    } else {
      return name;
    }
  };

  const hanldeSearch = (e) => setSearch(e.target.value);
  const NextPage = () => setPage(page + 1);
  const PrevPage = () => setPage(page - 1);
  const ClickPage = (e) => setPage(e - 1);


  let rows = [];
  for (let i = 1; i < (dataListSearch?.length / rowsPerPage) + 1; i++) {
    if (i - 1 === page) {
      rows.push(<Pagination.Item key={i} active onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    } else {
      rows.push(<Pagination.Item key={i} onClick={() => ClickPage(i)}>{i}</Pagination.Item>);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Categories</h1>
        </div>
        <Row>
          <Col lg={4} xs={12}>
            {props.dodertor ?
              <div className="button">
                <Button variant="success" className="btn-add" onClick={() => setCreateShow(true)}>Add Category</Button>
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
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <AddCategory
                    show={createShow}
                    onHide={() => setCreateShow(false)}
                  />
                  <EditCategory
                    show={editShow}
                    cate={dataEdit}
                    onHide={() => setEditShow(false)}
                  />
                  <DeleteCategory
                    show={deleteshow}
                    cateid={idDel}
                    onHide={() => setDeleteShow(false)}
                  />
                  <table className="table table-bordered" id="dataTable" width="100%" >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Main Genre</th>
                        <th>Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {React.Children.toArray(dataListSearch?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                        return (
                          <tr>
                            <td>{data.cateId}</td>
                            <td>{data.cateName}</td>
                            <td>{convertCateParent(data.cateIdParent)}</td>
                            <td>
                              {props.dodertor ?
                                <>
                                  <Button className='btn-action' variant="primary" onClick={() => hanldeClickEdit(data)}>Edit</Button>
                                  <Button className='btn-action' variant="danger" onClick={() => hanldeDelete(data.cateId)}>Delete</Button>
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
          {Math.floor(dataListSearch?.length / rowsPerPage) !== 0 ?
            <Col md={4}>
              <Pagination>
                {page === 0 ? <Pagination.Prev onClick={PrevPage} disabled /> : <Pagination.Prev onClick={PrevPage} />}
                {rows}
                {page === Math.floor(dataListSearch?.length / rowsPerPage) ? <Pagination.Next onClick={NextPage} disabled /> : <Pagination.Next onClick={NextPage} />}
              </Pagination>
            </Col> : null
          }
        </Row>
      </div>
    </>
  );
};


export default CategoryPage;
