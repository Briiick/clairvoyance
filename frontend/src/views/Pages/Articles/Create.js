import React, { useState } from "react";
import { Formik } from "formik";
import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { newsSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import Axios from "../../../utils/axios";
import Container from "../../Layouts/Container";

export default (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });
  const [addGoals, setAddGoals] = useState({
    0: { goal: "Choose Goal", content: "" },
  });

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }
  const addGoal = () => {
    console.log(addGoals);

    var newGoals = addGoals;
    newGoals[Object.keys(newGoals).length] = {
      goal: "Choose Goal",
      content: "",
    };
    setAddGoals(newGoals);
  };

  const editGoal = (goalKey, value, content) => {
    console.log(addGoals);

    var newGoals = addGoals;
    newGoals[goalKey][value] = content;
    setAddGoals(newGoals);
  };
  console.log(addGoals);
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
          validationSchema={newsSchema}
          initialValues={{ title: "", fullContent: "", shortContent: "" }}
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
          }) => {
            console.log("render");
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
                {Object.keys(addGoals).map((key) => {
                  console.log(key);
                  return (
                    <React.Fragment key={key}>
                      <Form.Group>
                        <DropdownButton
                          id="dropdown-basic-button"
                          title={addGoals[key].goal}
                        >
                          <Dropdown.Item href="#/action-1">
                            Goal 1
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-2">
                            Goal 2
                          </Dropdown.Item>
                          <Dropdown.Item href="#/action-3">
                            Goal 3
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="4">
                            Create New Goal
                          </Dropdown.Item>
                        </DropdownButton>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Summary</Form.Label>
                        <CKEditor
                          editor={ClassicEditor}
                          onChange={(event, editor) => {
                            values.shortContent = editor.getData();
                            editGoal(key, "content", editor.getData());
                          }}
                        />
                        {errors.shortContent && touched.shortContent && (
                          <Form.Text className="text-danger">
                            {errors.shortContent}
                          </Form.Text>
                        )}
                      </Form.Group>
                    </React.Fragment>
                  );
                })}
                <Button variant="primary" onClick={addGoal}>
                  Add Goal
                </Button>

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
