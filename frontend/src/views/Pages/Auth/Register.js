import React, { useState } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../store/actions_creators";
import { Alert, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { registerSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import { API } from "../../../utils/axios";
import Container from "../../Layouts/Container";

const Register = (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Header title="Create a new account"></Header>
      <Container singleCol={false}>
        <Col lg={8}>
          <h1>Register</h1>
          <hr />
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
              API.post("/auth/register", { form: values })
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email address"
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
                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="cpassword"
                    placeholder="Confirm password"
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => {
      dispatch(updateAccount(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
