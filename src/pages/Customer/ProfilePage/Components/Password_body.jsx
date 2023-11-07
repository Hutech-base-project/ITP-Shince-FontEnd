import React, { useEffect, useState } from 'react'
import "../../../../assets/scss/Customer/Profile/Password_customer.scss"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function PasswordBody() {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const toggleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  return (
    <>
      <div className="password_body">
        <div>
          <h4>Change your Password</h4>
          <div>For account security, please do not share your password with others</div>
        </div>
        <hr />
        <div className='contain'>
          {/* {error === true ? (
            <Alert key={'warning'} variant={'warning'}>
              Email already exists!
            </Alert>
          ) : null}
          {error2 === true ? (
            <Alert key={'warning'} variant={'warning'}>
              The new password cannot be the same as the old password!
            </Alert>
          ) : null} */}
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Old password</InputGroup.Text>
                <Form.Control
                  placeholder="Enter old password"
                  aria-describedby="basic-addon2"
                  name="passwordOld"
                  id="passOld"
                  type={showPassword1 ? 'text' : 'password'}
                  // isInvalid={hasError("passwordOld")}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {hasError("passwordOld") ? validation.errors.passwordOld?.[0] : null}
                </Form.Control.Feedback> */}
              </InputGroup>

            </Col>
            <Col xs={2}>
              <span onClick={toggleShowPassword1}>{showPassword1 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['far', 'eye-slash']} className='icon' />}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Old password</InputGroup.Text>
                <Form.Control
                  placeholder="Enter new password"
                  aria-describedby="basic-addon2"
                
                  name="passwordNew"
                  id="passNew"
                  type={showPassword2 ? 'text' : 'password'}
                  // isInvalid={hasError("passwordNew")}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {hasError("passwordNew") ? validation.errors.passwordNew?.[0] : null}
                </Form.Control.Feedback> */}
              </InputGroup>

            </Col>
            <Col xs={2}>
              <span  onClick={toggleShowPassword2}>{showPassword2 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['far', 'eye-slash']} className='icon' />}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Confirm password</InputGroup.Text>
                <Form.Control
                  placeholder="Enter old password"
                  aria-describedby="basic-addon2"
                  name="confirmPassword"
                  id="confirmPass"
                  type={showPassword3 ? 'text' : 'password'}
                  // isInvalid={hasError("confirmPassword")}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {hasError("confirmPassword") ? validation.errors.confirmPassword?.[0] : null}
                </Form.Control.Feedback> */}
              </InputGroup>

            </Col>
            <Col xs={2}>
              <span onClick={toggleShowPassword3}>{showPassword3 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['far', 'eye-slash']} className='icon' />}</span>
            </Col>
          </Row>
          {/* <Button variant="primary" onClick={handleUpdatePassword}>Change Password</Button> */}
        </div>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

export default PasswordBody;
