import React from 'react';
import '../styles/App.scss';
import '../styles/form.css';
import AppRouter from '../routers/AppRouter';
import { getUser } from '../actions/auth';
import configureStore from '../store/configStore';
import { Provider } from 'react-redux';

const store = configureStore();

export class App extends React.Component {
  componentDidMount() {
    store.dispatch(getUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppRouter />
        </div>
      </Provider>
    );
  }
}

export default App;
