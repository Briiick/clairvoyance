import React, { useState, useEffect } from 'react';
import App from './App';
import Axios from '../utils/axios';
import { connect } from 'react-redux';
import { updateAccount } from '../store/actions_creators';

const AppState = (props) => {

  const [loading, setLoading] = useState(localStorage.getItem('loggedIn') ? true : false);
  const updateAccount = props.updateAccount;

  useEffect(() => {
    if(loading) {
      Axios.get('/auth/resume').then((res) => {
        updateAccount(res.data);
        setLoading(false);
      }).catch((err) => {
        localStorage.removeItem('loggedIn');
        setLoading(false);
      })
    }
  }, [updateAccount, loading]);
  return (loading === false ? (<App account={props.account} />) : null)
}

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = dispatch => {
	return {
		updateAccount: (data) => {
			dispatch(updateAccount(data))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppState);
