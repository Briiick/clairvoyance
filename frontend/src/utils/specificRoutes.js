import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// setting up utility routes for different types of users to get onto blog
export const GuestRoute  = ({ account, ...props }) => account == null  ? <Route {...props}/>  : <Redirect to="/"/>;
export const UserRoute  = ({ account, ...props }) => account != null  ? <Route {...props}/>  : <Redirect to="/"/>;
export const AdminRoute  = ({ account, ...props }) => account != null && account.admin != null  ? <Route {...props}/>  : <Redirect to="/"/>;