import {AnyAction} from 'redux';
import {DemandCreationRequest} from '../../../model/editions-charisma-app/old/demand-creation-request.model';
import {
    DemandGenderEnum,
    DemandHairColorEnum,
    DemandHairLengthEnum,
    DemandHairTypeEnum,
    DemandTypeEnum,
} from '../../../model/editions-charisma-app/old/demand.model';

const initialState: DemandCreationRequest = {
    demandType: null,
    gender: null,
    hairType: null,
    hairLength: null,
    hairColor: null,
    completeAddress: null,
    addressZipCode: null,
    addressCity: null,
    addressLatitude: null,
    addressLongitude: null,
    availabilityDate: [],
    budget: null,
    comment: null,
    hairCutPicture: null,
    prestation: [],
 };

function setDemandCreationRequest(state = initialState, action: AnyAction ) {
    let nextState;
    switch (action.type) {
        case 'SET_DATA_FROM_STEP_ONE':
            const dataStepOne: {
                demandType: DemandTypeEnum,
                gender: DemandGenderEnum,
                hairType: DemandHairTypeEnum,
                hairLength: DemandHairLengthEnum,
                hairColor: DemandHairColorEnum,
                prestation: number[],
            } = action.value;
            nextState = {
                ...state,
                demandType: dataStepOne.demandType,
                gender: dataStepOne.gender,
                hairType: dataStepOne.hairType,
                hairLength: dataStepOne.hairLength,
                hairColor: dataStepOne.hairColor,
                prestation: dataStepOne.prestation,
            };
            return nextState;
        case 'SET_DATA_FROM_STEP_TWO':
            const dataStepTwo: {
                availabilityDate: {date: string}[],
                budget: number,
                completeAddress: string,
                addressZipCode: string,
                addressCity: string,
                addressLatitude: number,
                addressLongitude: number,
                comment: string,
            } = action.value;
            nextState = {
                ...state,
                availabilityDate: dataStepTwo.availabilityDate,
                budget: dataStepTwo.budget,
                completeAddress: dataStepTwo.completeAddress,
                addressZipCode: dataStepTwo.addressZipCode,
                addressCity: dataStepTwo.addressCity,
                addressLatitude: dataStepTwo.addressLatitude,
                addressLongitude: dataStepTwo.addressLongitude,
                comment: dataStepTwo.comment,
            };
            return nextState;
        case 'SET_DATA_FROM_STEP_VALIDATION_EMPTY_DATA':
            return initialState;
        default:
            return state;
    }
}

export default setDemandCreationRequest;
