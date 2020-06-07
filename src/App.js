import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import Login from './pages/login';
import Register from './pages/register';
import Detail from './pages/detail';
import Dashboard from './pages/dashboard';
import Author from './pages/admin/author';
import Notfound from './pages/notfound';



function App() {
  return (
    <>
    
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/detail" exact component={Detail}/>
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/author" exact component={Author}/>
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
