import {DemandHairColorEnum, DemandHairLengthEnum, DemandHairTypeEnum,} from './demand.model';

export interface SearchFilterRequest {
    hairType: DemandHairTypeEnum;
    hairLength: DemandHairLengthEnum;
    hairColor: DemandHairColorEnum;
    prestation: { value: number }[];
}
