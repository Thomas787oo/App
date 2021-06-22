import {getApiService} from './api.service';
import {Demand, DemandStatusEnum} from '../../model/editions-charisma-app/old/demand.model';

export const findActiveOrders = (): Promise<Array<Demand>> => {
    return findOrdersByStatus([DemandStatusEnum.new, DemandStatusEnum.taken], 100, 1, 'created|ASC');
};

export const findOrdersByStatus = (status: Array<DemandStatusEnum>,
                                   recordNumber: number,
                                   page: number,
                                   orderBy: string): Promise<Array<Demand>> => {
    const formKey = 'api_demand_filter_type';
    const statusParametersAsString = status.map((oneStatus, index) => `${formKey}[status][${index}]=${oneStatus}`).join('&');
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/find?&${statusParametersAsString}&${formKey}[orderBy]=${orderBy}&${formKey}[record_number]=${recordNumber}&page=${page}`,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

export const getOrder = (id: number) => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/get?id=${id}`,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};

export const rateOrder = (data: { demand: number, rate: number, comment: string}) => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/rate`,
            { method: 'post', body : JSON.stringify(data) },
        )
        .then((result: any) => {
            return result;
        });
};

export const cancelOrder = (data: { id: number}) => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/demand/cancel`,
            { method: 'post', body : JSON.stringify(data) },
        )
        .then((result: any) => {
            return result;
        });
};

