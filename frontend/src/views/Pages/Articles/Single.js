import React, { useState, useEffect } from 'react';
import Header from '../../Layouts/Header';
import Container from '../../Layouts/Container';
import Loading from '../../Loading';
import Axios from '../../../utils/axios';

export default (props) => {
  const [loading, setLoading] = useState(true);
  
  const [article, setArticle] = useState({
    title: 'Fetching article',
    shortContent: '',
    fullContent: 'Loading..',
    author: {}
  });

  const Slug = props.match.params.slug;
  const Redirect = props.history.replace;

  useEffect(() => {
    const getArticle = async () => { 
      const result = await Axios.get(`/articles/fetchOne/${Slug}`);
      if(result.data !== null) {
        setArticle(result.data);
        setLoading(false);
      } else {
        Redirect('/');
      }
    }
    getArticle();
  }, [Redirect, Slug]);

  return (
    <React.Fragment>
      <Loading waiting={loading}>
        <Header title={`Article - ${article.title}`} />
        <Container singleCol={true}>
          <h1>{article.title}</h1>
          <div dangerouslySetInnerHTML={{__html: article.fullContent}}></div>
          <b>Article written by {article.author.username}</b>
        </Container>
      </Loading>
    </React.Fragment>
  )
}