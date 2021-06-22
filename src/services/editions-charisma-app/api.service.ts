import {AuthenticationRequest} from '../../model/editions-charisma-app/authentification-request.model';
import * as env from '../../app/editions-charisma-app/app-config.json';
import mainStore from '../../store/configure-store';
import {AuthenticationResponse} from '../../model/editions-charisma-app/authentification-response.model';

export const apiBaseURL = env.API_BASE_URL;
export const apiClientId = env.API_CLIENT_ID;
export const apiClientSecret = env.API_CLIENT_SECRET;

export class ApiService {

    public executeAuthenticatedRequest = (endPointUrl, request, sessionExpiredCallback?): Promise<any|'no_session'|'session_expired'|'request_failed'> => {

        const tokens = mainStore.store.getState().setAuthenticationTokens.authenticationData;

        console.log('tokens yes', tokens);

        if (tokens === null) {
            return Promise.reject('no_session');
        }
        const requestUrl = `${apiBaseURL}${endPointUrl}`;
        request.headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokens.access_token}`};
        return fetch(requestUrl, request)
            .then((result) =>  {
                if (result.status === 401 ) {
                    return this.refreshSession(tokens.refresh_token).then(() => {
                        return this.executeAuthenticatedRequest(endPointUrl, request);
                    }, (error) => {
                        if (error === 'request_failed') {
                            return Promise.reject('request_failed');
                        }
                        if (sessionExpiredCallback !== undefined) {
                            sessionExpiredCallback();
                        }
                        return Promise.reject(error);
                    });
                } else if (result.status !== 200 ) {
                    return Promise.reject(result);
                }
                return result.json();
            });
    };

    public authenticate = (data: AuthenticationRequest): Promise<AuthenticationResponse> => {
        data.client_id = apiClientId;
        data.client_secret = apiClientSecret;
        return fetch(`${apiBaseURL}oauth/v2/token`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify(data),
            })
            .then((result) =>  {
                if (result.status !== 200 ) {
                    return Promise.reject(result);
                }
                return result.json();
            })
            .then((result: any) => {
                return result;
            });
    };

    public refreshSession = (refreshToken: string, logoutOnExpired: boolean = true) => {
        return this.authenticate({
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        }).then((authenticationResponse) => {
            const action = { type: 'SET_AUTHENTICATION_DATA', value : authenticationResponse };
            mainStore.store.dispatch(action);
            return Promise.resolve(authenticationResponse);
        }, (error) => {
            if ([400, 401].includes(error.status)) {
                console.log('error', error);
                if (logoutOnExpired) {
                    // Clear authentication data
                    const actionA = { type: 'REMOVE_AUTHENTICATION_DATA' };
                    mainStore.store.dispatch(actionA);
                    // Clear user data
                    const actionB = { type: 'REMOVE_USER_INFORMATION' };
                    mainStore.store.dispatch(actionB);
                    // Clear explore steps data
                    const actionC = { type: 'RESET_STEPS' };
                    mainStore.store.dispatch(actionC);
                    // Clear explore data
                    const actionD = { type: 'CANCEL_ORDER' };
                    mainStore.store.dispatch(actionD);
                    console.log('dispatch logout actions', actionA, actionB, actionC, actionD);
                }
                return Promise.reject('session_expired');
            }
            return Promise.reject('request_failed');
        });
    };

    public queryParams = (params) => {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    };

}

let apiServiceInstance;

export const getApiService = () => {
    if (!apiServiceInstance) {
        apiServiceInstance = new ApiService();
    }
    return apiServiceInstance;
};
