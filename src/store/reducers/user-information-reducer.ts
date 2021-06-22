// store/reducers/user-information-reducer.ts

import {AnyAction} from 'redux';
import {UserClient} from '../../model/editions-charisma-app/user-client.model';

const initialState: UserClient = null;

function setUserInformation(state = initialState, action: AnyAction ) {
    let nextState;
    let userData: UserClient;
    switch (action.type) {
        case 'SET_USER_INFORMATION':
            userData = action.value;
            nextState = userData;
            return nextState;
        case 'REMOVE_USER_INFORMATION':
            userData = null;
            nextState = userData;
            return nextState;
        default:
            return state;
    }
}

export default setUserInformation;
