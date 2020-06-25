import React from 'react';
import Container from '../../Layouts/Container';
import Header from '../../Layouts/Header';

import List from './Components/List';

export default (props) => {
  return (
  <React.Fragment>
    <Header title={`Articles | Page ${props.match.params.page || 1 }`}></Header>
    <Container singleCol={true}>
      <List history={props.history} page={props.match.params.page} shortVersion={false} />
    </Container>
  </React.Fragment>)
}