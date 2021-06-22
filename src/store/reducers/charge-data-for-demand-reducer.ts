// store/reducers/charge-data-for-demand-reducer.ts

import {AnyAction} from 'redux';
import {PaymentMethodTypeEnum} from '../../model/editions-charisma-app/old/charge-demand-request.model';

const initialState = {
    data: {
        demand: null,
        proposition: null,
        paymentMethodType: null,
        paymentMethodId: null,
    },
}

function setChargeDataForDemand(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'SET_CHARGE_DATA_FOR_A_DEMAND':
            const request: {
                demand: number,
                proposition: number,
                paymentMethodType: PaymentMethodTypeEnum,
                paymentMethodId: number,
            } = action.value;
            nextState = {
                ...state,
                data: request,
            };
            return nextState;
        case 'REMOVE_CHARGE_DATA_FOR_A_DEMAND':
            nextState = {
                ...state,
                initialState,
            };
            return nextState;
        default:
            return state;
    }
}

export default setChargeDataForDemand;
