import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../store/actions_creators";
import { Alert, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { loginSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import { API } from "../../../utils/axios";
import Container from "../../Layouts/Container";

const Login = (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Header title="Authentication"></Header>
      <Container singleCol={false}>
        <Col lg={8}>
          <h1>Authentication</h1>
          <hr />
          {alert.type !== null ? (
            <Alert variant={alert.type}>{alert.message}</Alert>
          ) : null}
          <Formik
            validationSchema={loginSchema}
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, actions) => {
              API.post("/auth/login", { form: values })
                .then((res) => {
                  updateAlert({
                    type: "success",
                    message: `You have successfully logged in. You'll be redirected to homepage..`,
                  });
                  localStorage.setItem("loggedIn", true);
                  props.updateAccount(res.data);
                })
                .catch((err) => {
                  setAlert({
                    type: "danger",
                    message: err.response.data.error,
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
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
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
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
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
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          />
        </Col>
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
