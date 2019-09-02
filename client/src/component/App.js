import React from 'react';
import '../styles/App.scss';
import '../styles/form.css';
import DashBoard from './DashBoard';
import Register from './Register';
import Login from './Login';
import AddTodos from './AddTodos';
import EditTodos from './EditTodos';
import Todos from './TodosForm';
import NoMatch from './NoMatch';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export class App extends React.Component {
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

export default App;
