import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";

export default (props) => {
  return (
    <React.Fragment key={i}>
      <Form.Group>
        <DropdownButton id="dropdown-basic-button" title="Goal">
          <Dropdown.Item href="#/action-1">Goal 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Goal 2</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Goal 3</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Create New Goal</Dropdown.Item>
        </DropdownButton>
      </Form.Group>
      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => (values.shortContent = editor.getData())}
        />
        {errors.shortContent && touched.shortContent && (
          <Form.Text className="text-danger">{errors.shortContent}</Form.Text>
        )}
      </Form.Group>
    </React.Fragment>
  );
};
