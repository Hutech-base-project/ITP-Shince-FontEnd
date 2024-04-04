import React from "react";
import CustomerHeader from "../../../global_components/Customer_components/Customer_header";
import CustomerFooter from "../../../global_components/Customer_components/Customer_footer";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { useState } from "react";
import { useJsApiLoader } from '@react-google-maps/api'
import ProfileBody from "./Components/Profile_body";

import ProfileOrder from "./Components/Profile_order";
import ProfileBooking from "./Components/Profile_booking";
import ProfileVoucher from "./Components/Profile_voucher";
import ProfileChangePassword from "./Components/profile_change_password";



const ProfileIndex = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  return (
    <>
      <CustomerHeader />
      <div style={{ paddingTop: 30 }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                {isLoaded ?
                  <Nav.Item>
                    <Nav.Link eventKey="first">Profile</Nav.Link>
                  </Nav.Item>
                  : null
                }
                <Nav.Item>
                  <Nav.Link eventKey="second">Change Password</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Booking</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fifth">Voucher</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                {isLoaded ?
                  <Tab.Pane eventKey="first"><ProfileBody /></Tab.Pane>
                  : null
                }
                <Tab.Pane eventKey="second"><ProfileChangePassword /></Tab.Pane>
                <Tab.Pane eventKey="third"><ProfileOrder /></Tab.Pane>
                <Tab.Pane eventKey="fourth"><ProfileBooking /></Tab.Pane>
                <Tab.Pane eventKey="fifth"><ProfileVoucher /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <CustomerFooter />
    </>
  );
}

export default ProfileIndex;
