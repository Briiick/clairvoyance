import React, { useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { newsSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import { QAPI } from "../../../utils/axios";
import Container from "../../Layouts/Container";
import { createPost } from "../../../utils/axios";

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
          // validationSchema={newsSchema}
          initialValues={{
            title: "",
            goal_updates: [
              {
                user: "",
                goal: "",
                progress: "",
                content: "",
              },
            ],
            habit_updates: [
              {
                user: "",
                habit: "",
                value: "",
                content: "",
              },
            ],
          }}
          onSubmit={(values, actions) => {
            // const response = await createNote(title, blocks, flashcards);
            console.log("Testing");
            createPost(values)
              .then((res) => {
                console.log("response", res);
              })
              .catch((err) => {
                console.log(err);
              });
            // Axios.post("/articles/create", { form: values })
            //   .then((res) =>
            //     setAlert({
            //       type: "success",
            //       message: `Article '${values.title}' published to homepage.`,
            //     })
            //   )
            //   .catch((err) => {
            //     setAlert({ type: "danger", message: err.response.data.error });
            //     actions.setSubmitting(false);
            //   });
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
                {console.log("values", values)}{" "}
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
                    name="goal_updates"
                    render={(arrayHelpers) => {
                      return (
                        <React.Fragment>
                          {values.goal_updates.map((goal, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Form.Group>
                                  {/* <Form.Control
                                    as="select"
                                    name={`goal_updates[${index}].goal`}
                                    value={values.goal_updates[index].goal}
                                    onChange={handleChange}
                                  >
                                    <option value="" label="Choose your Goal" />
                                    <option value="goal_1" label="goal_1" />
                                    <option value="goal_2" label="goal_2" />
                                    <option value="goal_3" label="goal_3" />
                                    <option value="goal_4" label="goal_4" />
                                  </Form.Control> */}
                                  {/* <Form.Control
                                    as="input"
                                    tyoe="text"
                                    list="goal"
                                  />

                                  <Form.Control
                                    as="datalist"
                                    id="goal"
                                    name={`goal_updates[${index}].goal`}
                                    value={values.goal_updates[index].goal}
                                    onChange={handleChange}
                                  >
                                    <option value="" label="Choose your Goal" />
                                    <option value="goal_1" label="goal_1" />
                                    <option value="goal_2" label="goal_2" />
                                    <option value="goal_3" label="goal_3" />
                                    <option value="goal_4" label="goal_4" />
                                  </Form.Control> */}
                                  <input
                                    list="goals"
                                    placeholder="Choose or Create a Goal"
                                    name={`goal_updates[${index}].goal`}
                                    value={values.goal_updates[index].goal}
                                    onChange={handleChange}
                                  />
                                  <datalist
                                    name={`goal_updates[${index}].goal`}
                                    value={values.goal_updates[index].goal}
                                    onChange={handleChange}
                                    id="goals"
                                  >
                                    <option value="Chrome" />
                                    <option value="Firefox" />
                                    <option value="Internet Explorer" />
                                    <option value="Opera" />
                                    <option value="Safari" />
                                    <option value="Microsoft Edge" />
                                  </datalist>
                                </Form.Group>
                                <Form.Group>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                      values.goal_updates[
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
                            Add Goal Update
                          </Button>
                        </React.Fragment>
                      );
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Metrics</Form.Label>
                  <FieldArray
                    name="habit_updates"
                    render={(arrayHelpers) => {
                      return (
                        <React.Fragment>
                          {values.habit_updates.map((metric, index) => {
                            return (
                              <React.Fragment key={index}>
                                <Form.Group>
                                  <Form.Control
                                    as="select"
                                    name={`habit_updates[${index}].habit`}
                                    value={values.habit_updates[index].habit}
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
                                      values.habit_updates[
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
                            Add Metric Update
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
