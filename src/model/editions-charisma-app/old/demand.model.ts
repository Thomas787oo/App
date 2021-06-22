import {Proposition, PropositionPro} from '../proposition.model';

export interface Demand {
    id: number;
    demandType: DemandTypeEnum;
    gender: DemandGenderEnum;
    hairType: DemandHairTypeEnum;
    hairLength: DemandHairLengthEnum;
    hairColor: DemandHairColorEnum;
    completeAddress: string;
    addressZipCode: string;
    addressCity: string;
    addressLatitude: number;
    addressLongitude: number;
    availabilityDate: string[];
    budget: number;
    budgetCurrency: string;
    comment: string;
    status: DemandStatusEnum;
    created: string;
    arrived: string;
    views: number;
    clientRating: {
        rate: number,
        created: string,
    };
    proRating: {
        rate: number,
        created: string,
    };
    hairCutPicture: string;
    prestation: { id: number, label: string, type: string }[];
    propositionNumber: number;
    takenBy: PropositionPro;
    acceptedProposition: Proposition;
}

export enum DemandTypeEnum {
    instant = 'instant',
    planned = 'planned',
}

export enum DemandGenderEnum {
    male = 'male',
    female = 'female',
}

export enum DemandHairTypeEnum {
    straight = 'straight',
    curly = 'curly',
    afro = 'afro',
}

export enum DemandHairLengthEnum {
    short = 'short',
    medium = 'medium',
    long = 'long',
}

export enum DemandHairColorEnum {
    brown = 'brown',
    blond = 'blond',
    red_head = 'red_head',
}

export enum DemandStatusEnum {
    new = 'new',
    taken = 'taken',
    finished = 'finished',
    canceled = 'canceled',
    waitingForRating = 'waiting_for_rating',
}
