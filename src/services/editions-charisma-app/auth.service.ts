import {default as appSettings} from '../../app/editions-charisma-app/app-config.json';

export const retrievePassword = (formData) => {
    const ENDPOINT_URL = `${appSettings.API_BASE_URL}api/public/authentication/retrieve-password`;
    const header = new Headers({
        'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
         email : formData.email,
    });

    return fetch(ENDPOINT_URL, { method: 'POST', body: body, headers: header})
    .then(res  => {
        if (res.status !== 200) {
          res.json();
          return Promise.reject(res);
        }
        return res.json();
    });
};

export const retrievePasswordConfirm = (formData: {
    email: string,
    emailCodeForPasswordUpdate: string,
    plainPassword: {
        first: string,
        second: string,
    },
}) => {
    const ENDPOINT_URL = `${appSettings.API_BASE_URL}api/public/authentication/retrieve-password/confirm`;
    const header = new Headers({
        'Content-Type': 'application/json',
    });

    const body = JSON.stringify(formData);

    return fetch(ENDPOINT_URL, { method: 'POST', body: body, headers: header})
        .then(res  => {
            if (res.status !== 200) {
                res.json();
                return Promise.reject(res);
            }
            return res.json();
        });
};

export const registerUser = (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: any;
}) => {
    const ENDPOINT_URL = `${appSettings.API_BASE_URL}api/public/authentication/register`;
    const header = new Headers({
        'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
        type: 'user_client',
        confirmationMode: 'code',
        username: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneMain: formData.phone,
        email : formData.email,
        completeAddress: formData.address.completeAddress,
        addressZipCode: formData.address.addressZipCode,
        addressCity: formData.address.addressCity,
        addressLatitude: formData.address.addressLatitude,
        addressLongitude: formData.address.addressLongitude,
    });

    return fetch(ENDPOINT_URL, { method: 'POST', body: body, headers: header})
    .then(res  => {
        if (res.status !== 200) {
          res.json();
          return Promise.reject(res);
        }
        return res.json();
    });
};

export const registerUserConfirm = (formData: {
    confirmationCode: string;
    email: string;
    plainPassword: {
        first: string,
        second: string,
    };
}) => {
    const ENDPOINT_URL = `${appSettings.API_BASE_URL}api/public/authentication/register/confirm`;
    const header = new Headers({
        'Content-Type': 'application/json',
    });

    const body = JSON.stringify({
        type: 'user_client',
        confirmationCode: formData.confirmationCode,
        email: formData.email,
        plainPassword: formData.plainPassword,
    });

    return fetch(ENDPOINT_URL, { method: 'POST', body: body, headers: header})
        .then(res  => {
            if (res.status !== 200) {
                res.json();
                return Promise.reject(res);
            }
            return res.json();
        });
};
