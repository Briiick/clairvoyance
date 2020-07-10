import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateAccount } from '../../../store/actions_creators';
import { Alert, Col, Form, Button, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { loginSchema } from '../../../utils/validations';
import Axios from '../../../utils/axios';
import Container from '../../Layouts/Container';
import { Link } from 'react-router-dom';


const Login = (props) => {	
	const [alert, updateAlert] = useState({ type: null, message: null });

	function setAlert(obj) {
		updateAlert(obj);
		setTimeout(() => updateAlert({ type: null, message: null }), 3000);
	}

	return (
		<React.Fragment>
		<Container singleCol={true}>
			<div className={"align-middle"}>
			<Row className={"justify-content-center"}>
			<Col xs={3} sm={3} md={3} lg={3}>
				<h1 className={"text-center"}>login</h1>
				<br />
				{alert.type !== null ? <Alert variant={alert.type}>{alert.message}</Alert> : null}
				<Formik
					validationSchema={loginSchema}
					initialValues={{ email: '', password: '' }}
					onSubmit={(values, actions) => {
						Axios.post('/auth/login', { form: values }).then((res) => {
							updateAlert({
								type: 'success',
								message: `You have successfully logged in. You'll be redirected to homepage..`
							});
							localStorage.setItem('loggedIn', true);
							props.updateAccount(res.data);
						}).catch((err) => {
							setAlert({ type: 'danger', message: err.response.data.error });
							actions.setSubmitting(false);
						});
					}}
					render={({ values, errors, status, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Control
									type="text"
									name="email"
									placeholder="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
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
								{errors.password && touched.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
							</Form.Group>
							<Button variant="primary" type="submit" disabled={isSubmitting}>submit</Button>
						</Form>
					)}
				/>
				<div className={"align-middle"}>
					<p>want to register? <Link to="/auth/register">click here.</Link></p>
				</div>
			</Col>
			</Row>
			</div>
		</Container>
		</React.Fragment>
	)
}

const mapStateToProps = state => {
  return {
    account: state.account
  }
}
const mapDispatchToProps = dispatch => {
	return {
		updateAccount: (data) => {
			dispatch(updateAccount(data))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);