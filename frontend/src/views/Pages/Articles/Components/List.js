import React, {useState, useEffect} from 'react';
import Axios from '../../../../utils/axios';
import Loading from '../../../Loading';
import Article from './Summary';
import Pagination from '../../../Layouts/Pagination';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(props.shortVersion === false && props.page ? props.page : 1);

  useEffect(() => {
    const getPagination = async () => {
      await Axios.get('/articles/getCountedNews').then((res) => {
        const totalPages = Math.ceil(res.data / 10);
        setPages(totalPages);
        if(page > totalPages) {
          setPage(totalPages);
        }
      });
    } 

    const getData = async () => await Axios.get(`/articles/fetchAll/${page}`).then((res) => {
      setArticles(res.data);
      setLoading(false);
    }).catch((err) => setLoading(false));
    
    setLoading(true);
    getPagination();
    if(pages > 0) {
      getData();
    } else {
      setLoading(false);
    }
  }, [page, pages])
  
  const updatePage = (page) => {
    props.history.replace( `/articles/${page}` );
    setPage(page);
  };

  return (
    <React.Fragment>
      <Loading waiting={loading} >
        { articles.map((article, index) => <Article shortVersion={props.shortVersion} key={index} article={article} />) }
        { articles.length < 1 ? (<p className="lead">No news articles to show up!</p>) : null}
        { !props.shortVersion ? (
          <Pagination current={page - 1} counting={pages} whenClicked={props.shortVersion === false && props.page ? updatePage : setPage} />
        ) : articles.length > 1 ? (<Link to="/articles/1">
        <Button variant="primary" className="mb-3">See all the news</Button>
      </Link>) : null}
      </Loading>
    </React.Fragment> 
  )
}