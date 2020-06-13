import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import Login from './pages/login';
import Landing from './pages/landing';
import Register from './pages/register';
import Detail from './pages/detail';
import Dashboard from './pages/dashboard';
import Author from './pages/admin/author';
import Genre from './pages/admin/genre';
import Transaction from './pages/admin/transaction';
import User from './pages/admin/user';
import Status from './pages/admin/status';
import Notfound from './pages/notfound';



class App extends Component {
 
  render(){

      return (
        <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/detail/:id" exact component={Detail}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/author" exact component={Author}/>
            <Route path="/genre" exact component={Genre}/>
            <Route path="/transaction" exact component={Transaction}/>
            <Route path="/user" exact component={User}/>
            <Route path="/status" exact component={Status}/>
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
