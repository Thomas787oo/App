// store/reducers/authentication-reducer.ts

import {AnyAction} from 'redux';
import {AuthenticationResponse} from '../../model/editions-charisma-app/authentification-response.model';

const initialState = { authenticationData: null }

function setAuthenticationTokens(state = initialState, action: AnyAction ) {
    let nextState;
    let authenticationData: AuthenticationResponse;
    switch (action.type) {
        case 'SET_AUTHENTICATION_DATA':
            authenticationData = action.value;
            nextState = {
                ...state,
                authenticationData: authenticationData,
            };
            return nextState;
        case 'REMOVE_AUTHENTICATION_DATA':
            authenticationData = null;
            nextState = {
                ...state,
                authenticationData: authenticationData,
            };
            return nextState;
        default:
            return state;
    }
}

export default setAuthenticationTokens;
