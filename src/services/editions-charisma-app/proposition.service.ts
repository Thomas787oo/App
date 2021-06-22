import {Proposition, PropositionStatusEnum} from '../../model/editions-charisma-app/proposition.model';
import {getApiService} from './api.service';

export const findActivePropositions = (demandId: number): Promise<Array<Proposition>> => {
    return findPropositionsByStatus([
        PropositionStatusEnum.new,
        PropositionStatusEnum.seen,
        PropositionStatusEnum.newMessage,
        PropositionStatusEnum.newAvailabilityDate,
        PropositionStatusEnum.accepted,
    ], demandId, 100, 1, 'created|ASC');
};

export const findPropositionsByStatus = (status: Array<PropositionStatusEnum>,
                                    demand: number,
                                    recordNumber: number,
                                    page: number,
                                    orderBy: string): Promise<Array<Proposition>> => {
    const formKey = 'api_demand_proposition_filter_type';
    const statusParametersAsString = status.map((oneStatus, index) => `${formKey}[statusForClient][${index}]=${oneStatus}`).join('&');
    const endPointUrl = `api/proposition/find?${formKey}[demand]=${demand}&${statusParametersAsString}&${formKey}[orderBy]=${orderBy}&${formKey}[record_number]=${recordNumber}&page=${page}`;
    return getApiService()
        .executeAuthenticatedRequest(
            endPointUrl,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

export const getProposition = (id: number) => {
    return getApiService()
        .executeAuthenticatedRequest(
            `api/proposition/get?id=${id}`,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};

export const refuseProposition = (id: number) => {
    const body = JSON.stringify({
        id: id,
    });
    return getApiService()
        .executeAuthenticatedRequest(
            `api/proposition/refuse`,
            { method: 'post', body: body },
    )
        .then((result: any) => {
            return result && result.data ? result.data : null;
    });
};
