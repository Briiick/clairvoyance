import React, { useState, useEffect } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { newsSchema } from "../../../utils/validations";
import Header from "../../Layouts/Header";
import { getGoals, getHabits } from "../../../utils/axios";
import Container from "../../Layouts/Container";
import { createPost } from "../../../utils/axios";

export default (props) => {
  const [alert, updateAlert] = useState({ type: null, message: null });
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);

  function setAlert(obj) {
    updateAlert(obj);
    setTimeout(() => updateAlert({ type: null, message: null }), 3000);
  }

  return (
    <React.Fragment>
      <Header title="Add Update"></Header>
      <Container singleCol={true}>
        {alert.type !== null ? (
          <Alert variant={alert.type}>{alert.message}</Alert>
        ) : null}

        <Formik
          enableReinitialize
          // validationSchema={newsSchema}
          initialValues={{
            title: "",
            update: "",
            future: "",
          }}
          onSubmit={(values, actions) => {
            // const response = await createNote(title, blocks, flashcards);
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
                  <Form.Label>Update</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      values.update = editor.getData();
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Future</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      values.future = editor.getData();
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
