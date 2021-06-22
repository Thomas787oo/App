export interface CreditCardStripeRegistrationRequest {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvc: string;
    name: string;
}
