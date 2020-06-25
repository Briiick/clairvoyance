import React from 'react';
import Header from '../Layouts/Header'

export default (props) => {

  setTimeout(() => props.history.replace( '/' ), 3000);

  return (
    <React.Fragment>
      <Header title="404 Not Found" />
      <div className="text-center">
        <h1 className="display-4">404 Not found.</h1>
        <h4 className="display-5">Go back to homepage..</h4>
      </div>
    </React.Fragment>
  )
}