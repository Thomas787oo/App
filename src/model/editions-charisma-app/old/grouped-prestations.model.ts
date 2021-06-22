export interface GroupedPrestationItem {
    opened?: boolean;
    parentLabel: string;
    isAvailable: boolean; 
    choices: PrestationRowItem[];  
    image: string; 
}

export interface PrestationRowItem {
    label: string;
    value: number;
    price: string;
    isAvailable: boolean; 
}
