import {
    OrderGenderEnum,
    OrderHairColorEnum,
    OrderHairLengthEnum,
    OrderHairTypeEnum,
    OrderTypeEnum,
} from './order.model';

export interface OrderCreationRequest {
    addressSelected: 'mine'|'else';
    addressCity: string;
    addressLatitude: number;
    addressLongitude: number;
    addressZipCode: string;
    availabilityDate: string[];
    clientProfileSelected: 'mine'|'else';
    clientFirstName: string;
    clientLastName: string;
    clientGender: OrderGenderEnum;
    budget: number;
    comment: string;
    completeAddress: string;
    demandType: OrderTypeEnum;
    details: OrderCreationRequestOrderDetail[];
}

export interface OrderCreationRequestOrderDetail {
    fullName: string;
    gender: OrderGenderEnum;
    hairType: OrderHairTypeEnum;
    hairLength: OrderHairLengthEnum;
    hairColor: OrderHairColorEnum;
    index: number;
    services: OrderDetailService[];
}

export interface OrderDetailService {
    value: number;
    label: string;
}

export const OrderGenderLabels = {
    male: 'homme',
    female: 'femme',
    children: 'enfant',
}
