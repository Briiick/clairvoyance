import React from 'react';
import Img from '../assets/images/loading.gif';

export default (props) => {
  return props.waiting === true ? (
     <div className="d-flex justify-content-center align-items-center mt-2 mt-lg-5 p-2 p-lg-5">
       <img className="img-fluid" alt="Loading" src={Img}></img>
    </div>
  ) : props.children
}