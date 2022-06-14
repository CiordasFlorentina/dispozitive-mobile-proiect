import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import cartReducer from './Reducers/cartReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cartItems']
};

const reducers = combineReducers({
    cartItems: persistReducer(persistConfig, cartReducer)
})


export const store: any = createStore(reducers, applyMiddleware(thunk))
export const persistor = persistStore(store);
