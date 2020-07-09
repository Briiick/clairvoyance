import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// react container 
export default (props) => {
  return (
    <Container fluid="md">
      <Row>
        {
          props.singleCol === true ? 
            (<Col>{props.children}</Col>) : (<React.Fragment>{props.children}</React.Fragment>)
        }
      </Row>
    </Container>
  )
}