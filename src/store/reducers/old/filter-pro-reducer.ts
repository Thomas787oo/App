import {AnyAction} from 'redux';
import {SearchProRequest} from '../../../model/editions-charisma-app/old/search-pro-request.model';

const initialState: SearchProRequest = {
    prestation: [],
    hairType: [],
 };

function setProSearchRequest(state = initialState, action: AnyAction ) {
    let nextState;
    let updatedData;
    switch (action.type) {
        case 'SET_FILTER_PRESTATION':
            updatedData = action.value;
            nextState = {
                ...state,
                prestation: updatedData.prestation,
            };
            return nextState;
        case 'SET_FILTER_HAIR_TYPE':
            updatedData = action.value;
            nextState = {
                hairType: updatedData.hairType,
            };
            return nextState;
        default:
            return state;
    }
}

export default setProSearchRequest;
