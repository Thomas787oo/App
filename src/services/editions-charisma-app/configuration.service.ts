import {Service, ServiceList} from '../../model/editions-charisma-app/old/service-list.model';
import {getApiService} from './api.service';
import AsyncStorage from '@react-native-community/async-storage';

export const getPrestationList = (): Promise<Array<ServiceList>> => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/configuration/get-prestation-list`,
            { method: 'get' },
        )
        .then((result: any) => {
            storePrestationList((result && result.data ? result.data : []));
            return result && result.data ? result.data : [];
        });
};

export const getStoredPrestationList = async (): Promise<Array<ServiceList>> => {
    try {
        const value = await AsyncStorage.getItem('prestation-list');
        if (value !== null) {
            // We have data!!
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        // Error retrieving data
        return [];
    }
};

export const storePrestationList = async(prestationList: Array<ServiceList>) => {
    try {
        await AsyncStorage.setItem(
            'prestation-list',
            JSON.stringify(prestationList),
        );
    } catch (error) {
        // Error saving data
    }
};

export const findPrestationById = (id: number, prestationList: Array<ServiceList>): Service => {
    let prestationListIndex = 0;
    while (prestationListIndex < prestationList.length) {
        const seekChoice = prestationList[prestationListIndex].choices.find((choice) => choice.value === id);
        if (seekChoice) {
            return seekChoice;
        } else {
            prestationListIndex++;
        }
    }
}
