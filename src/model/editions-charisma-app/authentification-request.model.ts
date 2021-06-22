export interface AuthenticationRequest {
    username?: string;
    password?: string;
    refresh_token?: string;
    client_id?: string;
    client_secret?: string;
    grant_type: 'password'|'refresh_token';
}