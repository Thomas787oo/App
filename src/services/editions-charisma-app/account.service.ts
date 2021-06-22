import {UserClient} from '../../model/editions-charisma-app/user-client.model';
import {getApiService} from './api.service';

export const fetchProfile = (): Promise<UserClient> => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/account/profile`,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

export const updatePassword = (data: {
    currentPassword: string,
    plainPassword: {
        first: string,
        second: string,
    },
}) => {
    const body = JSON.stringify(data);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/account/profile/update/password`,
            { method: 'patch', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

export const updateEmail = (data: { emailForEmailUpdate: string }) => {
    const body = JSON.stringify(data);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/account/profile/update/email`,
            { method: 'patch', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

export const updateEmailConfirm = (data: { emailCodeForEmailUpdate: string }) => {
    const body = JSON.stringify(data);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/account/profile/update/email/confirm`,
            { method: 'patch', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};
