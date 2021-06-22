export interface StripeCardTokenRegistrationSuccessResponse {
    card: StripeCardToken;
    client_ip: string;
    created: number;
    id: string;
    livemode: boolean;
    object: 'token'|'';
    type: 'card'|'';
    used: boolean;
}

interface StripeCardToken {
    address_city: string;
    address_country: string;
    address_line1: string;
    address_line1_check: string;
    address_line2: string;
    address_state: string;
    address_zip: string;
    address_zip_check: string;
    brand: 'Visa'|'';
    country: string;
    cvc_check: 'unchecked'|'';
    dynamic_last4: string;
    exp_month: number;
    exp_year: number;
    funding: 'credit'|'';
    id: string;
    last4: number;
    name: string;
    object: 'card'|'';
    tokenization_method: string;
}

export interface StripeCardPaymentMethodRegistrationSuccessResponse {
    card: StripeCardPaymentMethod;
    created: number;
    id: string;
    livemode: boolean;
    object: 'payment_method'|'';
    type: 'card'|'';
}

interface StripeCardPaymentMethod {
    brand: 'Visa'|'';
    country: string;
    exp_month: number;
    exp_year: number;
    funding: 'credit'|'';
    last4: number;
}

export interface CreditCardStripeRegistrationErrorResponse {
    error: {
        code: CreditCardStripeRegistrationErrorCodeEnum,
        decline_code?: string,
        doc_url: string,
        message: string,
        param: CreditCardStripeRegistrationErrorParamEnum,
        type: CreditCardStripeRegistrationErrorTypeEnum,
    };
}

export enum CreditCardStripeRegistrationErrorCodeEnum {
    incorrect_number = 'incorrect_number',
    invalid_expiry_month = 'invalid_expiry_month',
    invalid_expiry_year = 'invalid_expiry_year',
    incorrect_cvc = 'incorrect_cvc',
    invalid_card_type = 'invalid_card_type',
    expired_card = 'expired_card',
    card_declined = 'card_declined',
}

export enum CreditCardStripeRegistrationErrorParamEnum {
    number = 'number',
    expiry_month = 'expiry_month',
    expiry_year = 'expiry_year',
    cvc = 'cvc',
    name = 'name',
}

export enum CreditCardStripeRegistrationErrorTypeEnum {
    card_error = 'card_error',
}
