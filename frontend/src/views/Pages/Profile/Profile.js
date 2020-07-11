import React, { useState, useEffect } from "react";
import Header from "../../Layouts/Header";
import Container from "../../Layouts/Container";
import Loading from "../../Loading";
import Axios from "../../../utils/axios";

export default (props) => {
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState({});

  /// Don't know what this is
  const Slug = props.match.params.slug;
  const Redirect = props.history.replace;

  useEffect(() => {
    const getPost = async () => {
      const result = await Axios.get(`/articles/fetchOne/${Slug}`);
      if (result.data !== null) {
        setPost(result.data);
        setLoading(false);
      } else {
        Redirect("/");
      }
    };
    getPost();
  }, [Redirect, Slug]);
  ///^ idk what these r

  return (
    <React.Fragment>
      <Loading waiting={loading}>
        <Header title={`Post - ${post.title}`} />
        <Container singleCol={true}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.fullContent }}></div>
          <b>Post written by {post.author.username}</b>
        </Container>
      </Loading>
    </React.Fragment>
  );
};
