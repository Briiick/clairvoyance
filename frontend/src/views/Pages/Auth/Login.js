import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../store/actions_creators";
import { Alert, Col, Form, Button, Row } from "react-bootstrap";
import { Formik } from "formik";
import { loginSchema } from "../../../utils/validations";
import { login } from "../../../utils/axios";
import Container from "../../Layouts/Container";
import { Link } from "react-router-dom";

import "../../../assets/sass/bootstrap.scss";

const Login = (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Container singleCol={true}>
        <Row className={"justify-content-center vertical-center"}>
          <Col xs={5} sm={4} md={3} lg={3}>
            <h1 className={"text-center"}>login</h1>
            <br />
            {alert.type !== null ? (
              <Alert variant={alert.type}>{alert.message}</Alert>
            ) : null}
            <Formik
              validationSchema={loginSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, actions) => {
                login(values)
                  .then((res) => {
                    updateAlert({
                      type: "success",
                      message: `You have logged in. You'll be redireced to homepage..`,
                    });
                    localStorage.setItem("clairovoyanceToken", res.data.key);
                    localStorage.setItem("loggedIn", true);
                    props.updateAccount(res.data);
                  })
                  .catch((err) => {
                    setAlert({
                      type: "danger",
                      message:
                        "Invalid email or password. Please double-check your account details and try again!",
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
                  <Button
                    className={"btn-group-vertical"}
                    variant="secondary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    submit
                  </Button>
                </Form>
              )}
            />
            <div style={{ textAlign: "center" }}>
              <br />
              <p>
                want to register? <Link to="/auth/register">click here.</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => {
      dispatch(updateAccount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
