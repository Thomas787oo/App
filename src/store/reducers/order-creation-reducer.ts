import {AnyAction} from 'redux';
import {
    OrderCreationRequest,
    OrderCreationRequestOrderDetail, OrderDetailService
} from '../../model/editions-charisma-app/order/order-creation-request.model';
import {
    OrderGenderEnum,
    OrderHairColorEnum,
    OrderHairLengthEnum,
    OrderHairTypeEnum,
} from '../../model/editions-charisma-app/order/order.model';
import {addNewDetailWithGender, removeDetailWithGender} from '../../services/editions-charisma-app/order-creation.service';

const initialState: OrderCreationRequest = {
    addressZipCode: null,
    addressCity: null,
    addressLatitude: null,
    addressLongitude: null,
    completeAddress: null,
    availabilityDate: [],
    orderFor: 'me',
    clientFirstName: null,
    clientLastName: null,
    clientGender: null,
    budget: null,
    comment: null,
    demandType: null,
    details: [],
 };

function setOrderCreationRequest(state = initialState, action: AnyAction ) {
    let nextState = state;
    const details = state.details;
    const availabilityDates = state.availabilityDate;
    switch (action.type) {
        case 'ADD_DETAIL_INFO':
            const genderToAdd: OrderGenderEnum = action.value;
            const addDetailResult = addNewDetailWithGender(genderToAdd, details);
            nextState = {
                ...state,
                details: addDetailResult.updatedDetails,
            };
            break;
        case 'REMOVE_DETAIL_INFO':
            const genderToRemove: OrderGenderEnum = action.value;
            const removeDetailResult = removeDetailWithGender(genderToRemove, details);
            nextState = {
                ...state,
                details: removeDetailResult.updatedDetails,
            };
            break;
        case 'CANCEL_ORDER':
            nextState = {
                ...state,
                addressZipCode: null,
                addressCity: null,
                addressLatitude: null,
                addressLongitude: null,
                availabilityDate: [],
                budget: null,
                comment: null,
                completeAddress: null,
                demandType: null,
                details: [],
            };
            break;
        case 'SET_HAIR_LENGTH':
            const hairLengthRequest: { hairLength: OrderHairLengthEnum, index: number, gender: OrderGenderEnum } = action.value;
            const hairLengthRequestDetails = [];
            details.map((detail) => {
                if (detail.gender === hairLengthRequest.gender && detail.index === hairLengthRequest.index) {
                    detail.hairLength = hairLengthRequest.hairLength;
                }
                hairLengthRequestDetails.push(detail);
            });
            nextState = {
                ...state,
                details: hairLengthRequestDetails,
            };
            break;
        case 'SET_HAIR_TYPE':
            const hairTypeRequest: { hairType: OrderHairTypeEnum, index: number, gender: OrderGenderEnum } = action.value;
            const hairTypeRequestDetails = [];
            details.map((detail) => {
                if (detail.gender === hairTypeRequest.gender && detail.index === hairTypeRequest.index) {
                    detail.hairType = hairTypeRequest.hairType;
                }
                hairTypeRequestDetails.push(detail);
            });
            nextState = {
                ...state,
                details: hairTypeRequestDetails,
            };
            break;
        case 'SET_HAIR_COLOR':
            const hairColorRequest: { hairColor: OrderHairColorEnum, index: number, gender: OrderGenderEnum } = action.value;
            const hairColorRequestDetails = [];
            details.map((detail) => {
                if (detail.gender === hairColorRequest.gender && detail.index === hairColorRequest.index) {
                    detail.hairColor = hairColorRequest.hairColor;
                }
                hairColorRequestDetails.push(detail);
            });
            nextState = {
                ...state,
                details: hairColorRequestDetails,
            };
            break;
        case 'ADD_PRESTATION':
            const addPrestationRequest: { service: OrderDetailService, index: number, gender: OrderGenderEnum  } = action.value;
            const addPrestationRequestDetails = [];
            details.map((detail: OrderCreationRequestOrderDetail) => {
                if (detail.gender === addPrestationRequest.gender && detail.index === addPrestationRequest.index) {
                    detail.services.push(addPrestationRequest.service);
                }
                addPrestationRequestDetails.push(detail);
            });
            nextState = {
                ...state,
                details: addPrestationRequestDetails,
            };
            break;
        case 'REMOVE_PRESTATION':
            const removePrestationRequest: { service: OrderDetailService, index: number, gender: OrderGenderEnum  } = action.value;
            const removePrestationRequestDetails = [];
            details.map((detail: OrderCreationRequestOrderDetail) => {
                if (detail.gender === removePrestationRequest.gender && detail.index === removePrestationRequest.index) {
                    detail.services = detail.services
                        .filter((service) => service.value !== removePrestationRequest.service.value);
                }
                removePrestationRequestDetails.push(detail);
            });
            nextState = {
                ...state,
                details: removePrestationRequestDetails,
            };
            break;
        case 'ADD_AVAILABILITY_DATE':
            const addAvailabilityDateRequest: string = action.value;
            const addAvailabilityDates = [];
            availabilityDates.map((date) => {
                addAvailabilityDates.push(date);
            });
            addAvailabilityDates.push(addAvailabilityDateRequest);
            nextState = {
                ...state,
                availabilityDate: addAvailabilityDates,
            };
            break;
        case 'REMOVE_AVAILABILITY_DATE':
            const removeAvailabilityDateRequest: string = action.value;
            const removeAvailabilityDates = [];
            availabilityDates.map((date) => {
                if (date !== removeAvailabilityDateRequest) {
                    removeAvailabilityDates.push(date);
                }
            });
            nextState = {
                ...state,
                availabilityDate: removeAvailabilityDates,
            };
            break;
        case 'SET_ADDRESS':
            const addressRequest: {
                addressZipCode: string,
                addressCity: string,
                addressLatitude: number,
                addressLongitude: number,
                completeAddress: string,
            } = action.value;
            nextState = {
                ...state,
                addressZipCode: addressRequest.addressZipCode,
                addressCity: addressRequest.addressCity,
                addressLatitude: addressRequest.addressLatitude,
                addressLongitude: addressRequest.addressLongitude,
                completeAddress: addressRequest.completeAddress,
            };
            break;
        case 'SET_CLIENT_INFO':
            const clientInfoRequest: {
                clientFirstName: string,
                clientLastName: string,
                clientGender: OrderGenderEnum,
            } = action.value;
            nextState = {
                ...state,
                clientFirstName: clientInfoRequest.clientFirstName,
                clientLastName: clientInfoRequest.clientLastName,
                clientGender: clientInfoRequest.clientGender,
            };
            break;
        default:
            break;
    }
    return nextState;
}

export default setOrderCreationRequest;
