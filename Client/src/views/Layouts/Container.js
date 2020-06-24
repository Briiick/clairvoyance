import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default (props) => {
  return (
    <Container>
      <Row>
        {
          props.singleCol === true ? 
            (<Col>{props.children}</Col>) : (<React.Fragment>{props.children}</React.Fragment>)
        }
      </Row>
    </Container>
  )
}