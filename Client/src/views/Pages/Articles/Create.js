import React, { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { newsSchema } from '../../../utils/validations'; 
import Header from '../../Layouts/Header';
import Axios from '../../../utils/axios';
import Container from '../../Layouts/Container';

export default (props) => {	
	const [alert, updateAlert] = useState({ type: null, message: null });

	function setAlert(obj) {
		updateAlert(obj);
		setTimeout(() => updateAlert({ type: null, message: null }), 3000);
	}

	return (
		<React.Fragment>
			<Header title="Post article"></Header>
			<Container singleCol={true}>
				<h3>Post Article</h3>
				<hr />
				{alert.type !== null ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
				<Formik
					validationSchema={newsSchema}
					initialValues={{ title: '', fullContent: '', shortContent: '' }}
					onSubmit={(values, actions) => {
						Axios.post('/articles/create', { form: values })
						.then((res) => setAlert({ type: 'success', 	message: `Article '${values.title}' published to homepage.` }))
						.catch((err) => {
							setAlert({ type: 'danger', message: err.response.data.error });
							actions.setSubmitting(false);
						});
					}}
					render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
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
								{errors.title && touched.title && <Form.Text className="text-danger">{errors.title}</Form.Text>}
							</Form.Group>
							<Form.Group>
								<Form.Label>Summary</Form.Label>
								<CKEditor
									editor={ ClassicEditor }
									onChange={ ( event, editor ) => values.shortContent = editor.getData()}
								/>
								{errors.shortContent && touched.shortContent && <Form.Text className="text-danger">{errors.shortContent}</Form.Text>}
							</Form.Group>
							<Form.Group>
								<Form.Label>Article content</Form.Label>
								<CKEditor
									editor={ ClassicEditor }
									onChange={ ( event, editor ) => values.fullContent = editor.getData()}
								/>
								{errors.fullContent && touched.fullContent && <Form.Text className="text-danger">{errors.fullContent}</Form.Text>}
							</Form.Group>
							<Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
						</Form>
					)}
				/>
			</Container>
		</React.Fragment>
	)
}

