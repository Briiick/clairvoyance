import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const GuestRoute  = ({ account, ...props }) => account == null  ? <Route {...props}/>  : <Redirect to="/"/>;
export const UserRoute  = ({ account, ...props }) => account != null  ? <Route {...props}/>  : <Redirect to="/"/>;
export const AdminRoute  = ({ account, ...props }) => account != null && account.admin != null  ? <Route {...props}/>  : <Redirect to="/"/>;