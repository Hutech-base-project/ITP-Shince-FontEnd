import React from "react";
import CustomerHeader from "../../../global_components/Customer_components/Customer_header";
import CustomerFooter from "../../../global_components/Customer_components/Customer_footer";
import ProfileBody from "./Components/Profile_body";
import PasswordBody from "./Components/Password_body";
import { Col, Nav, NavItem, Row, Tab } from "react-bootstrap";
import OrdersBody from "./Components/Orders_body";

function ProfileIndex() {
  return (
    <>
      <CustomerHeader />
      <div style={{paddingTop: 30}}>
       <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Change Password</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Orders</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><ProfileBody/></Tab.Pane>
            <Tab.Pane eventKey="second"><PasswordBody/></Tab.Pane>
            <Tab.Pane eventKey="third"><OrdersBody/></Tab.Pane>
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
