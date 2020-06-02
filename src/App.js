import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';

import Login from './pages/login';
import Register from './pages/register';
import Detail from './pages/detail';
import Dashboard from './pages/dashboard';



function App() {
  return (
    <>
    
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/detail" exact component={Detail}/>
          <Route path="/dashboard" exact component={Dashboard}/>
        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;
