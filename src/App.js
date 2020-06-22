import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'

import './App.css';

import Login from './pages/login';
import Landing from './pages/landing';
import Test from './pages/test';
import Register from './pages/register';
import Detail from './pages/detail';
import Dashboard from './pages/dashboard';
import Book from './pages/book'
import Author from './pages/admin/author';
import Genre from './pages/admin/genre';
import Transaction from './pages/admin/transaction';
import User from './pages/admin/user';
import Status from './pages/admin/status';
import UserHistory from './pages/userHistory';
import Profile from './pages/profile';
import Notfound from './pages/notfound';

import store from './redux/store'



class App extends Component {
 
  render(){

      return (
        <>
        <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/test" exact component={Test}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/detail/:id" exact component={Detail}/>
            <Route path="/dashboard" exact component={Dashboard}/>
            <Route path="/book" exact component={Book}/>
            <Route path="/author" exact component={Author}/>
            <Route path="/genre" exact component={Genre}/>
            <Route path="/transaction" exact component={Transaction}/>
            <Route path="/user" exact component={User}/>
            <Route path="/status" exact component={Status}/>
            <Route path="/userhistory" exact component={UserHistory}/>
            <Route path="/profile" exact component={Profile}/>
            <Route component={Notfound} />
          </Switch>
        </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
