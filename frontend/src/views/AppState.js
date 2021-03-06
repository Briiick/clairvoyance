import React, { useState, useEffect } from "react";
import App from "./App";
import { API } from "../utils/axios";
import { connect } from "react-redux";
import { updateAccount } from "../store/actions_creators";

// maintain state using redux
const AppState = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(
    localStorage.getItem("loggedIn") ? true : false
  );
  const updateAccount = props.updateAccount;

  useEffect(() => {
    if (loading) {
      API.get("/users/user/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("clairovoyanceToken")}`,
        },
      })
        .then((res) => {
          updateAccount(res.data);
          setLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("loggedIn");
          setLoading(false);
        });
    }
  }, [updateAccount, loading]);
  return loading === false ? <App account={props.account} /> : null;
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => {
      dispatch(updateAccount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppState);
