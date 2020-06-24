import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default (props) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title className="text-primary">
          <Link to={`/article/${props.article.slug}`}>
          {props.article.title}            
          </Link>
        </Card.Title>
        <Card.Text dangerouslySetInnerHTML={{__html: props.article.shortContent}}></Card.Text>
      </Card.Body>
    </Card>
  )
}