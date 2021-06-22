export interface UserClient {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    phoneMain: string;
    gender: 'female'|'male';
    hairType: 'straight'|'curly'|'afro';
    completeAddress: string;
    addressCity: string;
    addressZipCode: string;
    addressLatitude: number;
    addressLongitude: number;
    sponsorshipCode: number;
}
