import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../store/actions_creators";
import { Alert, Col, Form, Button, Row } from "react-bootstrap";
import { Formik } from "formik";
import { registerSchema } from "../../../utils/validations";
import { API } from "../../../utils/axios";
import Container from "../../Layouts/Container";
import { Link } from "react-router-dom";

import "../../../assets/sass/bootstrap.scss";

// 
const Register = (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Container singleCol={true}>
        <Row className={"justify-content-center"}>
          <Col xs={5} sm={4} md={3} lg={3}>
            <h1 className={"text-center"}>register</h1>
            <br />
            {alert.type !== null ? (
              <Alert variant={alert.type}>{alert.message}</Alert>
            ) : null}
            <Formik
              validationSchema={registerSchema}
              initialValues={{
                username: "",
                email: "",
                password: "",
                cpassword: "",
              }}
              onSubmit={(values, actions) => {
                API.post("https://localhost:8000/api/v1/users/registration", { form: values })
                  .then((res) => {
                    updateAlert({
                      type: "success",
                      message: `You have created a new account successfully. You'll be redireced to homepage..`,
                    });
                    localStorage.setItem("loggedIn", true);
                    props.updateAccount(res.data);
                  })
                  .catch((err) => {
                    setAlert({
                      type: "danger",
                      message: `Login failed.` //err.response.data.error,
                    });
                    actions.setSubmitting(false);
                  });
              }}
              render={({
                values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className={"justify-content-center"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="full name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <Form.Text className="text-danger">
                        {errors.username}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Form.Text className="text-danger">
                        {errors.email}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Form.Text className="text-danger">
                        {errors.password}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      name="cpassword"
                      placeholder="confirm password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cpassword}
                    />
                    {errors.cpassword && touched.cpassword && (
                      <Form.Text className="text-danger">
                        {errors.cpassword}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button
                    className={"btn-group-vertical"}
                    variant="secondary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      border: 1,
                    }}
                  >
                    submit
                  </Button>
                </Form>
              )}
            />
            <div style={{ textAlign: "center" }}>
              <br />
              <p>
                want to log in? <Link to="/auth/login">click here.</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => {
      dispatch(updateAccount(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
