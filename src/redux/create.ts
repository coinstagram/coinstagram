import rootReducer from './modules/reducer';
import RootState from '../type';
import rootSaga from './modules/sagas';
import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const sagaMiddleWare = createSagaMiddleware();

// const preloadedState: RootState = {}

function create(): Store<RootState> {
  const store: Store<RootState> = createStore(
    rootReducer(history),
    // preloadedState,
    composeWithDevTools(
      applyMiddleware(routerMiddleware(history), sagaMiddleWare),
    ),
  );

  sagaMiddleWare.run(rootSaga);

  return store;
}

export default create;
