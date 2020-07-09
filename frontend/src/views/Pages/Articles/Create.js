import React, { useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { newsSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import Axios from "../../../utils/axios";
import Container from "../../Layouts/Container";

export default (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Header title="Add Update"></Header>
      <Container singleCol={true}>
        {/* <h3>Add Update</h3>
        <hr /> */}
        {alert.type !== null ? (
          <Alert variant={alert.type}>{alert.message}</Alert>
        ) : null}

        <Formik
          enableReinitialize
          validationSchema={newsSchema}
          initialValues={{
            title: "",
            goals: [{ goal: "", content: "" }],
            metrics: [{ metric: "", content: "" }],
          }}
          onSubmit={(values, actions) => {
            Axios.post("/articles/create", { form: values })
              .then((res) =>
                setAlert({
                  type: "success",
                  message: `Article '${values.title}' published to homepage.`,
                })
              )
              .catch((err) => {
                setAlert({ type: "danger", message: err.response.data.error });
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
            setValues,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <Form.Text className="text-danger">
                      {errors.title}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Goals</Form.Label>
                  <FieldArray
                    name="goals"
                    render={(arrayHelpers) => {
                      return (
                        <React.Fragment>
                          {values.goals.map((goal, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name={`goals[${index}].goal`}
                                    value={values.goals[index].goal}
                                    onChange={handleChange}
                                  >
                                    <option value="" label="Choose your Goal" />
                                    <option value="goal_1" label="goal_1" />
                                    <option value="goal_2" label="goal_2" />
                                    <option value="goal_3" label="goal_3" />
                                    <option value="goal_4" label="goal_4" />
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                      values.goals[
                                        index
                                      ].content = editor.getData();
                                    }}
                                  />
                                  {errors.shortContent &&
                                    touched.shortContent && (
                                      <Form.Text className="text-danger">
                                        {errors.shortContent}
                                      </Form.Text>
                                    )}
                                </Form.Group>
                              </React.Fragment>
                            );
                          })}
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                              arrayHelpers.push({ goal: "", content: "" });
                            }}
                          >
                            Add Goal
                          </Button>
                        </React.Fragment>
                      );
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Metrics</Form.Label>
                  <FieldArray
                    name="metrics"
                    render={(arrayHelpers) => {
                      return (
                        <React.Fragment>
                          {values.metrics.map((metric, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name={`metrics[${index}].metric`}
                                    value={values.metrics[index].metric}
                                    onChange={handleChange}
                                  >
                                    <option
                                      value=""
                                      label="Choose your Tracked Metric"
                                    />
                                    <option value="metric_1" label="metric_1" />
                                    <option value="metric_2" label="metric_2" />
                                    <option value="metric_3" label="metric_3" />
                                    <option value="metric_4" label="metric_4" />
                                  </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                      values.metrics[
                                        index
                                      ].content = editor.getData();
                                    }}
                                  />
                                  {errors.shortContent &&
                                    touched.shortContent && (
                                      <Form.Text className="text-danger">
                                        {errors.shortContent}
                                      </Form.Text>
                                    )}
                                </Form.Group>
                              </React.Fragment>
                            );
                          })}
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                              arrayHelpers.push({ goal: "", content: "" });
                            }}
                          >
                            Add Goal
                          </Button>
                        </React.Fragment>
                      );
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        />
      </Container>
    </React.Fragment>
  );
};
