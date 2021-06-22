import {combineReducers, createStore} from 'redux';
import setAuthenticationTokens from './reducers/authentication-reducer';
import setResetPasswordEmail from './reducers/forgot-password-reducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import setDemandCreationRequest from './reducers/old/demand-form-reducer';
import setChargeDataForDemand from './reducers/charge-data-for-demand-reducer';
import setUserInformation from './reducers/user-information-reducer';
import setProSearchRequest from './reducers/old/filter-pro-reducer';
import setOrderCreationRequest from './reducers/order-creation-reducer';
import setOrderCreationStepManagerRequest from './reducers/order-creation-step-manager-reducer';
import setPaymentMethodRegistration from './reducers/payment-method-registration-reducer';

const persistConfig: any = {
    key: 'root',
    storage: AsyncStorage,
};

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    setAuthenticationTokens: persistReducer(authPersistConfig, setAuthenticationTokens),
    setResetPasswordEmail: setResetPasswordEmail,
    setDemandCreationRequest: setDemandCreationRequest,
    setChargeDataForDemand: setChargeDataForDemand,
    setUserInformation: setUserInformation,
    setProSearchRequest: setProSearchRequest,
    setOrderCreationRequest: setOrderCreationRequest,
    setOrderCreationStepManagerRequest: setOrderCreationStepManagerRequest,
    setPaymentMethodRegistration: setPaymentMethodRegistration,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initStore = () => {
    const store = createStore(persistedReducer)
    const persistedStore = persistStore(store)
    return { store, persistedStore };
};

export const mainStore = initStore();

export default mainStore;
