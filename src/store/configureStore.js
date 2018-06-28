import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './../reducers'
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

export const configureStore = (preloadedState) => {
    const middlewares = [promise, reduxThunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = compose(...storeEnhancers);

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    return store;
}