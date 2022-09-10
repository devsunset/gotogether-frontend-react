import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminLayout from 'layouts/Admin.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';

const root = ReactDOM.createRoot(document.getElementById('root'));

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; // 로그인 상태가 아니라면 아무것도 안함

    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          path="/gotogether"
          render={(props) => <AdminLayout {...props} />}
        />
        <Redirect from="/" to="/gotogether/home" />
      </Switch>
    </BrowserRouter>
  </Provider>,
);

serviceWorker.unregister();

serviceWorker.unregister();
