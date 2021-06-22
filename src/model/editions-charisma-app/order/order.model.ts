import {Proposition, PropositionPro} from '../proposition.model';

export interface Order {
    acceptedProposition: Proposition;
    addressCity: string;
    addressLatitude: number;
    addressLongitude: number;
    addressZipCode: string;
    availabilityDate: string[];
    arrived: string|null;
    budget: number;
    budgetCurrency: string;
    clientRating: OrderRate|null;
    comment: string;
    completeAddress: string;
    created: string;
    demandType: OrderTypeEnum;
    details: OrderDetail[];
    id: number;
    proRating: OrderRate|null;
    propositionNumber: number;
    status: OrderStatusEnum;
    takenBy: PropositionPro;
    views: number;
}

export interface OrderDetail {
    fullName: string;
    gender: OrderGenderEnum;
    hairType: OrderHairTypeEnum;
    hairLength: OrderHairLengthEnum;
    hairColor: OrderHairColorEnum;
    id: number;
    services: OrderDetailService[];
}

export interface OrderDetailService {
    id: number;
    label: string;
    type: string;
}

export interface OrderRate {
    created: string;
    rate: number;
}

export enum OrderTypeEnum {
    instant = 'instant',
    planned = 'planned',
}

export enum OrderGenderEnum {
    male = 'male',
    female = 'female',
    children = 'children',
}

export enum OrderHairTypeEnum {
    straight = 'straight',
    curly = 'curly',
    afro = 'afro',
}

export enum OrderHairLengthEnum {
    short = 'short',
    medium = 'medium',
    long = 'long',
}

export enum OrderHairColorEnum {
    brown = 'brown',
    blond = 'blond',
    red_head = 'red_head',
}

export enum OrderStatusEnum {
    new = 'new',
    taken = 'taken',
    finished = 'finished',
    canceled = 'canceled',
    waitingForRating = 'waiting_for_rating',
}
