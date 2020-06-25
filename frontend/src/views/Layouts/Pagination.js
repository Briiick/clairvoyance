import React from 'react';
import { Pagination } from 'react-bootstrap';

export default (props) => {
  return (
    <Pagination>
      { 
        Array.from({ length: props.counting }).map((_, index) => 
          <Pagination.Item 
            active={props.current === index} 
            onClick={() => props.whenClicked(index + 1)} 
            key={index}>
            {index + 1} 
          </Pagination.Item>)
      }
    </Pagination>
  )
}