export interface ProfileUpdateRequest {
    firstName?: string;
    lastName?: string;
    phoneMain?: string;
    avatar?: string;
    currentPassword?: string;
    plainPassword?: {
        first: string,
        second: string,
    };
}