import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GuestRoute, AdminRoute } from "../utils/specificRoutes";

// Pages
import NoMatch from "./Pages/404";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Articles from "./Pages/Articles";
import Article from "./Pages/Articles/Single";
import PostArticle from "./Pages/Articles/Create";
import Profile from "./Pages/Profile/Profile";

const App = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/articles/:page" exact component={Articles} />
        <Route path="/article/:slug" exact component={Article} />
        <Route
          path="/profile/:id"
          exact
          component={Profile}
          account={props.account}
        />
        <AdminRoute
          path="/post-article"
          exact
          component={PostArticle}
          account={props.account}
        />
        <GuestRoute
          path="/auth/login"
          exact
          component={Login}
          account={props.account}
        />
        <GuestRoute
          path="/auth/register"
          exact
          component={Register}
          account={props.account}
        />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default App;
