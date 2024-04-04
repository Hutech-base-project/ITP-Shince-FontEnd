import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import "../../../../assets/scss/Customer/Profile/Profile_customer.scss";
import { useDispatch, useSelector } from "react-redux";
import { UserPageValidate } from "../../../../utils/validate";
import { validate } from "validate.js";
import { toast, ToastContainer } from "react-toastify";
import { convertBase64 } from "../../../../utils/custom";
import { put_user } from "../../../../redux/Account/account_page_thunk";
import { selectUser, selectUserLoading } from "../../../../redux/Account/account_page_selecter";


const ProfileBody = () => {
  const userInformation = useSelector(selectUser)
  const isLoading = useSelector(selectUserLoading)
  const [baseImage, setBaseImage] = useState(null);
  const dispatch = useDispatch();
  const listRole = ["ROLE_USER"]

  const [dataUser, setDataUser] = useState(userInformation);

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });
  
  useEffect(() => {
    setDataUser(userInformation)
  }, [userInformation]);
  useEffect(() => {
    const errors = validate.validate(dataUser, UserPageValidate);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataUser]);

  const hasError = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (e) => {
    setDataUser((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [e.target.name]: true,
      },
    }));
  };

  const handlePhoto = async (event) => {
    const files = event.target.files;
    const base64 = await convertBase64(files[0]);
    setBaseImage(base64);
    setDataUser((preState) => ({
      ...preState,
      usImage: files[0],
    }));
  };

  //address 
  const [address, setAddress] = useState(userInformation?.usAddress === undefined ? "" : userInformation?.usAddress);
  const valueDirection = useRef();
  const [valueAdd, setValueAddd] = useState("");
  const autoCompleteRef = useRef();


  useEffect(() => {
    const options = {
      componentRestrictions: { country: "vn" },
      fields: ["address_components", "geometry", "icon", "name", "adr_address", "formatted_address"],
      strictBounds: false,
    };
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      valueDirection.current,
      options
  );
  }, []);

  const hanldeAddress = (e) => {
    setValueAddd(e.target.value);
  }

  useEffect(() => {
    setDataUser((preState) => ({
      ...preState,
      usAddress: address,
    }));
  }, [address]);

  const hanldeClick = () => {
    if (address !== "") {
      const add = document.getElementById('address');
      add.value = address;
    } else {
      const add = document.getElementById('address');
      add.value = valueAdd;
    }
  }

  const hanldeLeaveMouse = () => {
    var place;
    autoCompleteRef.current.addListener("place_changed", async function () {
      place = await autoCompleteRef.current.getPlace();
      setAddress(place.formatted_address);
      const add = document.getElementById('address');
      add.value = place.formatted_address;
      return;
    });
    if (address !== "") {
      const add = document.getElementById('address');
      add.value = address;
    }
    else {
      const add = document.getElementById('address');
      add.value = '';
    }
  }

  const hanldeUpdateUs = (e) => {
    if (validation.isvalid === true) {
      setValidation((pre) => ({
        ...pre,
        touched: {
          ...pre.touched,
          usUserName: true,
          usPhoneNo: true,
        },
      }));
      dispatch(put_user({ data: dataUser, listRole: listRole })).then((res1) => {
        if (res1.payload === 200) {
          toast.success('Update profile success !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 600
          });
        } else {
          toast.error('Update profile fail !', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 600
          });
        }
      });
    }
  }



  return (
    <>
      <div className="profile-body">
        <section id="profile" className="profile section">
          <Container>
            <Row>
              <Col lg={4} xs={12}>
                <div className="profile-image">
                  <div className="img">
                    {baseImage === null ?
                      <img src={userInformation?.usImage === null ? require("../../../../assets/images/avatar-trang-4.jpg") : userInformation?.usImage} alt="Avatar" width="200" height="200" />
                      :
                      <img src={baseImage} alt="Avatar" width="200" height="200" />
                    }
                  </div>
                  <div className="get-button">
                    <div className="content">
                      <div className="button">
                        <label className="btn">
                          Change Image
                          <input type="file" accept=".png, .jpg, .jpeg" hidden onChange={handlePhoto} />
                        </label>  
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={8} xs={12}>
                <div className="profile-form">
                  <h2>Profile Settings</h2>
                  <Form className="form">
                    <Row>
                      <Col lg={6} md={6} xs={12}>
                        <InputGroup className="form-group">
                          <label>Customer Name</label>
                          <Form.Control
                            placeholder="Enter user name"
                            aria-describedby="basic-addon2"
                            onChange={handleChange}
                            name="usUserName"
                            defaultValue={dataUser?.usUserName}
                            isInvalid={hasError("usUserName")}
                          />
                          <Form.Control.Feedback type="invalid">
                            {hasError("usUserName") ? validation.errors.usUserName?.[0] : null}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <InputGroup className="form-group">
                          <label>Email</label>
                          <Form.Control
                            placeholder="Email"
                            aria-describedby="basic-addon2"
                            onChange={handleChange}
                            name="usEmailNo"
                            defaultValue={dataUser?.usEmailNo}
                            isInvalid={hasError("usEmailNo")}
                          />
                          <Form.Control.Feedback type="invalid">
                            {hasError("usEmailNo") ? validation.errors.usEmailNo?.[0] : null}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <InputGroup className="form-group">
                          <label>Phone number</label>
                          <Form.Control
                            placeholder="Phone number"
                            aria-describedby="basic-addon2"
                            onChange={handleChange}
                            name="usPhoneNo"
                            defaultValue={dataUser?.usPhoneNo}
                            disabled
                          />
                        </InputGroup>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <InputGroup className="form-group">
                          <label>Address</label>
                          <Form.Control
                            onChange={hanldeAddress}
                            onClick={hanldeClick}
                            defaultValue={dataUser?.usAddress}
                            ref={valueDirection}
                            onBlur={hanldeLeaveMouse}
                            id="address"
                            name="usAddress"
                            placeholder="Enter address"
                            aria-describedby="basic-addon2"
                          />
                        </InputGroup>
                      </Col>
                      <div className="profile-form get-button">
                        <div className="content">
                          <div className="button">
                            <Button variant="primary" onClick={hanldeUpdateUs}>
                              {isLoading === true ? (
                                <Spinner animation="border" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>
                              ) : "save profile"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
            <ToastContainer />
          </Container>
        </section>
      </div>
    </>
  );
}

export default ProfileBody;
