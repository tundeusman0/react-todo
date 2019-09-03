import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DashBoard from '../component/DashBoard';
import Register from '../component/Register';
import Login from '../component/Login';
import AddTodos from '../component/AddTodos';
import EditTodos from '../component/EditTodos';
import Todos from '../component/TodosForm';
import NoMatch from '../component/NoMatch';

const history = createBrowserHistory();

export class AppRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/add-todo" component={AddTodos} />
            <Route exact path="/edit-todo" component={EditTodos} />
            <Route exact path="/Todos" component={Todos} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
