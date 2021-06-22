// store/reducers/forgot-password-reducer.ts

import {AnyAction} from 'redux';

const initialState = { email: null }

function setResetPasswordEmail(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'SET_EMAIL':
            const email = action.value;
            nextState = {
                ...state,
                email: email,
            };
            return nextState;
        default:
            return state;
    }
}

export default setResetPasswordEmail;
