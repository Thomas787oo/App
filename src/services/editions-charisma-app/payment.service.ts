import * as env from '../../app/editions-charisma-app/app-config.json';
import {getApiService} from './api.service';
import {CreditCardStripeRegistrationRequest} from '../../model/editions-charisma-app/payment-method/credit-card-stripe-registration-request.model';
import {ChargeDemandRequest} from '../../model/editions-charisma-app/old/charge-demand-request.model';
import {PaymentMethod, PaymentMethodStatusEnum} from '../../model/editions-charisma-app/payment-method.model';
import {StripeCardToken} from '../../model/editions-charisma-app/stripe-card-token.model';

export const findActivePaymentMethod = (): Promise<Array<PaymentMethod>> => {
    return findPaymentMethodByStatus([
        PaymentMethodStatusEnum.new,
        PaymentMethodStatusEnum.expired,
    ], 100, 1, 'created|ASC');
};

/**
 * The method sends HTTP requests to our API.
 * We save partially the payment details of the user on our server
 * stripe token, obfuscated card number, expiry month and expiry year
 * @param status Array<PaymentMethodStatusEnum>
 * @param recordNumber number
 * @param page number
 * @param orderBy number
 * @return {Promise<Response>}
 */
export const findPaymentMethodByStatus = (status: Array<PaymentMethodStatusEnum>,
                                  recordNumber: number,
                                  page: number,
                                  orderBy: string): Promise<Array<PaymentMethod>> => {
    const formKey = 'api_demand_proposition_filter_type';
    const statusParametersAsString = status.map((oneStatus, index) => `${formKey}[status][${index}]=${oneStatus}`).join('&');
    const endPointUrl = `api/payment/method/find?${statusParametersAsString}&${formKey}[orderBy]=${orderBy}&${formKey}[record_number]=${recordNumber}&page=${page}`;
    return getApiService()
        .executeAuthenticatedRequest(
            endPointUrl,
            { method: 'get' },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

/**
 * The method sends HTTP requests to our API.
 * We save partially the payment details of the user on our server
 * stripe token, obfuscated card number, expiry month and expiry year
 * @param request PaymentMethod
 * @return {Promise<Response>}
 */
export const createPaymentMethod = (request: PaymentMethod): Promise<Array<any>> => {
    const body = JSON.stringify(request);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/payment/method/create`,
            { method: 'post', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : [];
        });
};

/**
 * The method sends HTTP requests to our API.
 * We save partially the payment details of the user on our server
 * stripe token, last 4 numbers of card, expiry month and expiry year
 * @param request StripeCardToken
 * @return {Promise<Response>}
 */
export const createCardToken = (request: StripeCardToken): Promise<Array<any>> => {
    const body = JSON.stringify(request);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/payment/token/create`,
            { method: 'post', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};

/**
 * The method sends HTTP requests to our API.
 * We save partially the payment details of the user on our server
 * stripe token, obfuscated card number, expiry month and expiry year
 * @param request ChargeDemandRequest
 * @return {Promise<Response>}
 */
export const createChargeForDemand = (request: ChargeDemandRequest): Promise<{ status: string}> => {
    const body = JSON.stringify(request);
    return getApiService()
        .executeAuthenticatedRequest(
            `api/payment/charge`,
            { method: 'post', body: body },
        )
        .then((response: { status: string}) => {
            response;
        });
};

/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
export const saveTemporaryCreditCardOnStripe = (creditCardData: CreditCardStripeRegistrationRequest) => {
    const card = {
        'card[number]': creditCardData.number,
        'card[exp_month]': creditCardData.expiryMonth,
        'card[exp_year]': creditCardData.expiryYear,
        'card[cvc]': creditCardData.cvc,
        'card[name]': creditCardData.name,
    };
    return fetch('https://api.stripe.com/v1/tokens', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${env.STRIPE_PUBLISHABLE_KEY}`,
        },
        method: 'post',
        body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&'),
    }).then(response => response.json());
};

/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */
export const savePermanentCreditCardOnStripe = (creditCardData: CreditCardStripeRegistrationRequest) => {
    const card = {
        'type': 'card',
        'card[number]': creditCardData.number,
        'card[exp_month]': creditCardData.expiryMonth,
        'card[exp_year]': creditCardData.expiryYear,
        'card[cvc]': creditCardData.cvc,
    };
    return fetch('https://api.stripe.com/v1/payment_methods', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${env.STRIPE_PUBLISHABLE_KEY}`,
        },
        method: 'post',
        body: Object.keys(card)
            .map(key => key + '=' + card[key])
            .join('&'),
    }).then(response => response.json());
};

/**
 * The method sends HTTP requests to our API.
 * We save remove a payment method
 * @param paymentMethod PaymentMethod
 * @return {Promise<Response>}
 */
export const removePaymentMethod = (paymentMethod: PaymentMethod): Promise<Array<any>> => {
    const body = JSON.stringify({ id : paymentMethod.id });
    return getApiService()
        .executeAuthenticatedRequest(
            `api/payment/method/remove`,
            { method: 'post', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};

/**
 * The method sends HTTP requests to our API.
 * We save remove a payment method
 * @param paymentMethod PaymentMethod
 * @return {Promise<Response>}
 */
export const markPaymentMethodAsDefault = (paymentMethod: PaymentMethod): Promise<Array<any>> => {
    const body = JSON.stringify({ id : paymentMethod.id });
    return getApiService()
        .executeAuthenticatedRequest(
            `api/payment/method/markasdefault`,
            { method: 'post', body: body },
        )
        .then((result: any) => {
            return result && result.data ? result.data : null;
        });
};
