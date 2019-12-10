import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import user from './modules/user';
import review from './modules/review';
import exhibition from './modules/exhibition';

const middlewares = [thunk];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

const reducer = persistCombineReducers(persistConfig, {
    user,
    review,
    exhibition
});

const configureStore = () => {
    let store = createStore(reducer, applyMiddleware(...middlewares));
    let persistor = persistStore(store);
    return { store, persistor }
};

export default configureStore; 