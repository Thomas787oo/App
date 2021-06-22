import {DemandHairTypeEnum} from './demand.model';

export interface SearchProRequest {
    hairType: DemandHairTypeEnum[];
    prestation: number[];
}

export interface HairTypeChoice {
    label: string;
    value: DemandHairTypeEnum;
    checked: boolean;
}

export interface PrestationChoices {
    parentLabel: string;
    opened: boolean;
    choices: {
        label: string,
        value: number,
        checked: boolean,
    }[];
}
