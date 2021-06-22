export interface ServiceList {
    opened: boolean;
    parentLabel: string;
    choices: Service[];
}

export interface Service {
    label: string;
    value: number;
    checked: boolean;
}
