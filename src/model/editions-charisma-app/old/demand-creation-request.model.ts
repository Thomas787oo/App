import {
    DemandGenderEnum,
    DemandHairColorEnum,
    DemandHairLengthEnum,
    DemandHairTypeEnum,
    DemandTypeEnum,
} from './demand.model';

export interface DemandCreationRequest {
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
    availabilityDate: { date: string }[];
    budget: number;
    comment: string;
    hairCutPicture: string;
    prestation: { value: number }[];
}
