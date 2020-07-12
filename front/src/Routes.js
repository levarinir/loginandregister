import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './component/login';
import App from './App';
import Signup from './component/signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
