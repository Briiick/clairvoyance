import React, { useState, useEffect } from "react";
import Header from "../../Layouts/Header";
import Container from "../../Layouts/Container";
import Loading from "../../Loading";
import Axios from "../../../utils/axios";

export default (props) => {
  const [loading, setLoading] = useState(false);
  //   const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "name",
    posts: [],
    metrics: [],
  });

  /// Don't know what this is
  const Slug = props.match.params.slug;
  const Redirect = props.history.replace;

  useEffect(() => {
    const getProfile = async () => {
      const result = await Axios.get(`/articles/fetchOne/${Slug}`);
      if (result.data !== null) {
        setProfile(result.data);
        setLoading(false);
      } else {
        Redirect("/");
      }
    };
    getProfile();
  }, [Redirect, Slug]);
  ///^ idk what these r

  return (
    <React.Fragment>
      <Loading waiting={loading}>
        <Header title={`Profile - ${profile.profile}`} />
        <Container singleCol={true}>
          <div>Image</div>
          <h1>{profile.name}</h1>
          <h2>Metrics</h2>
          {profile.metrics.length > 0 ? (
            profile.metrics.map((post) => {
              return (
                <React.Fragment>
                  <div>Metric title</div>
                  <div>Metric value</div>
                </React.Fragment>
              );
            })
          ) : (
            <div>No Tracked Metrics Yet</div>
          )}
          <h2>Posts</h2>
          {profile.posts.length > 0 ? (
            profile.posts.map((post) => {
              return (
                <React.Fragment>
                  <div>Post title</div>
                  <div>Post desc</div>
                </React.Fragment>
              );
            })
          ) : (
            <div>No Posts Yet</div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: profile.fullContent,
            }}
          ></div>
        </Container>
      </Loading>
    </React.Fragment>
  );
};
