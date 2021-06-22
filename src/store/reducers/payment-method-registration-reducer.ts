// store/reducers/payment-method-registration-reducer.ts

import {AnyAction} from 'redux';
import {PaymentMethodForm} from '../../model/editions-charisma-app/payment-method/payment-method-form.model';

const initialState: PaymentMethodForm = {
    fullName: null,
    creditCard: null,
    validity: null,
    ccv: null,
    cardSave: false,
};

function setPaymentMethodRegistration(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'ADD_PAYMENT_METHOD_DATA':
            const request: PaymentMethodForm = action.value;
            nextState = {
                ...state,
                fullName: request.fullName,
                creditCard: request.creditCard,
                validity: request.validity,
                ccv: request.ccv,
                cardSave: request.cardSave,
            };
            return nextState;
        case 'CLEAR_PAYMENT_METHOD_DATA':
            nextState = initialState;
            return nextState;
        default:
            return state;
    }
}

export default setPaymentMethodRegistration;
