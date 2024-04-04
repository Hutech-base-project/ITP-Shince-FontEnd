import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { selectSession } from '../../../../redux/Auth/auth_page_selecter';
import { validate } from 'validate.js';
import { ChangePasswordWord } from '../../../../utils/validate';
import { toast, ToastContainer } from 'react-toastify';
import { change_password } from '../../../../redux/Account/account_page_thunk';



function ProfileChangePassword() {
  const userInformation = useSelector(selectSession)
  const dispatch = useDispatch();
  const [error, setError] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const [dataChangePassword, setDataChangePassword] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: ""
  });

  const [validation, setValidation] = useState({
    touched: {},
    errors: {},
    isvalid: false,
  });

  useEffect(() => {
    const errors = validate.validate(dataChangePassword, ChangePasswordWord);
    setValidation((pre) => ({
      ...pre,
      isvalid: errors ? false : true,
      errors: errors || {},
    }));
  }, [dataChangePassword]);

  const hasErrors = (field) => {
    return validation.touched[field] && validation.errors[field] ? true : false;
  };

  const handleChange = (event) => {
    setDataChangePassword((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        [event.target.name]: true,
      },
    }));
  };

  const toggleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const toggleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const toggleShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleUpdatePassword = () => {
    setValidation((pre) => ({
      ...pre,
      touched: {
        ...pre.touched,
        passwordOld: true,
        passwordNew: true,
        confirmPassword: true,
      },
    }));
    if (validation.isvalid === true) {
      let obj = {
        newPassword: dataChangePassword.passwordNew,
        oldPassword: dataChangePassword.passwordOld,
        userId: userInformation?.responseData.id,
      };
      dispatch(change_password(obj)).then((res) => {
        if (!res.error) {
          const OPass = document.getElementById('passOld')
          OPass.value = ''
          const NPass = document.getElementById('passNew')
          NPass.value = ''
          const CPAss = document.getElementById('confirmPass')
          CPAss.value = ''
          setError(false);
          setMessageError('');
          toast.success('change password success !', {
            position: toast.POSITION.TOP_RIGHT
          });
        }else{
          setError(true);
          setMessageError(res.payload);
        }
      });
    }
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
          {error === true ? (
            <Alert key={'warning'} variant={'warning'}>
              {messageError}
            </Alert>
          ) : null}
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Old password</InputGroup.Text>
                <Form.Control
                  placeholder="Enter old password"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                  name="passwordOld"
                  id="passOld"
                  type={showPassword1 ? 'text' : 'password'}
                  isInvalid={hasErrors("passwordOld")}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors("passwordOld") ? validation.errors.passwordOld?.[0] : null}
                </Form.Control.Feedback>
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
                  onChange={handleChange}
                  name="passwordNew"
                  id="passNew"
                  type={showPassword2 ? 'text' : 'password'}
                isInvalid={hasErrors("passwordNew")}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors("passwordNew") ? validation.errors.passwordNew?.[0] : null}
                </Form.Control.Feedback>
              </InputGroup>

            </Col>
            <Col xs={2}>
              <span onClick={toggleShowPassword2}>{showPassword2 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['far', 'eye-slash']} className='icon' />}</span>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon2">Confirm password</InputGroup.Text>
                <Form.Control
                  placeholder="Enter old password"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                  name="confirmPassword"
                  id="confirmPass"
                  type={showPassword3 ? 'text' : 'password'}
                isInvalid={hasErrors("confirmPassword")}
                />
                <Form.Control.Feedback type="invalid">
                  {hasErrors("confirmPassword") ? validation.errors.confirmPassword?.[0] : null}
                </Form.Control.Feedback>
              </InputGroup>

            </Col>
            <Col xs={2}>
              <span onClick={toggleShowPassword3}>{showPassword3 ? <FontAwesomeIcon icon={['fa', 'eye']} className='icon' /> : <FontAwesomeIcon icon={['far', 'eye-slash']} className='icon' />}</span>
            </Col>
          </Row>
          <Button variant="primary" onClick={handleUpdatePassword}>Change Password</Button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ProfileChangePassword;
