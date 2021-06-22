import {getApiService} from './api.service';


export const getDemandTracking = () => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/tracking`,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};

export const createDemand = (data) => {
    const body = JSON.stringify({
        demandType: data.demandType,
        gender: data.gender,
        hairType: data.hairType,
        hairLength: data.hairLength,
        hairColor: data.hairColor,
        prestation: data.prestation,
        availabilityDate: data.availabilityDate,
        budget: data.budget,
        completeAddress: data.completeAddress,
        addressZipCode: data.addressZipCode,
        addressCity: data.addressCity,
        addressLatitude: data.addressLatitude,
        addressLongitude: data.addressLongitude,
        comment: data.comment,
        hairCutPicture: data.hairCutPicture,
    });
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/create`,
            { method: 'post', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};
