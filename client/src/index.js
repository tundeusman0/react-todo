import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './styles/App.scss';
import './styles/form.css';
import AppRouter from './routers/AppRouter';
import { getUser } from './actions/auth';
import configureStore from './store/configStore';

const store = configureStore();

class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
