import React from 'react'
import Header from '../Layouts/Header';
import Container from '../Layouts/Container';
import List from './Articles/Components/List';
import { Col } from 'react-bootstrap';

export default (props) => {
  return (
    <React.Fragment>
      <Header title="Homepage"></Header>
      <Container singleCol={false}>
       <Col lg={8}>
        <List shortVersion={true} className="mb-3" />
       </Col>
      </Container>
    </React.Fragment>      
  )
}