import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import { compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}
console.log(middlewares)
export const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
