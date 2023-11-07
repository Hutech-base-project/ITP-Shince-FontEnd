import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../../../assets/scss/Customer/Profile/Profile_customer.scss";

function ProfileBody() {
  return (
    <>
      <div className="profile-body">
        <section id="profile" className="profile section">
          <Container>
            <Row>
              <Col lg={4} Col xs={12}>
                {/* <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    className="rounded-circle mt-5"
                    width="150px"
                    src={""
                  />
                  <span className="font-weight-bold">Edogaru</span>
                  <span className="text-black-50">edogaru@mail.com.my</span> */}
                <div className="profile-image">
                  <div className="img">
                    <img
                      src={require("../../../../assets/images/_JsH_ ALL YASHIRO  - Nene Nene Nene.jpg")}
                      width="200"
                      alt="logo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Edogaru</label>
                  </div>
                  <div className="form-group">
                    <label>edogaru@mail.com.my</label>
                  </div>
                  <div className="get-button">
                    <div className="content">
                      <div className="button">
                        <label className="btn">
                          Change Image
                          <input type="file" accept=".png, .jpg, .jpeg" hidden/>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* <label className="get-button">
                    <div className="content">
                    <input type="file" accept=".png, .jpg, .jpeg">
                      Change Image
                    </input>
                    </div>
                  </label> */}
                </div>
              </Col>
              <Col lg={8} Col xs={12}>
                <div className="profile-form">
                  <h2>Profile Settings</h2>
                  <form className="form" method="post" action="!#">
                    <Row>
                      <Col lg={6} md={6} xs={12}>
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder=""
                            required="required"
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            name="name"
                            placeholder=""
                            required="required"
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            placeholder=""
                            required="required"
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            name="number"
                            placeholder=""
                            required="required"
                          />
                        </div>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            placeholder=""
                            required="required"
                          />
                        </div>
                      </Col>
                      <div className="profile-form get-button">
                        <div className="content">
                          <div className="button">
                            <a href="!#" className="btn">
                              Save Profile
                            </a>
                          </div>
                        </div>
                      </div>
                    </Row>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
}

export default ProfileBody;
