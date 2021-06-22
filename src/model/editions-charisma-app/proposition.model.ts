export interface Proposition {
    id: number;
    budget: number;
    availabilityDate: string;
    statusForClient: PropositionStatusEnum;
    statusForPro: PropositionStatusEnum;
    pro: PropositionPro;
    unreadMessagesForClient: number;
    unreadMessagesForPro: number;
    created: string;
}

export interface PropositionPro {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    gender: PropositionGenderEnum;
}

export enum PropositionGenderEnum {
    male = 'male',
    female = 'female',
}

export enum PropositionStatusEnum {
    new = 'new',
    seen = 'seen',
    newMessage = 'new_message',
    newAvailabilityDate = 'new_availability_date',
    accepted = 'accepted',
    canceled = 'canceled',
    refused = 'refused',
}
