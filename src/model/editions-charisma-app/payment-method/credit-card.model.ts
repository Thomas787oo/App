export interface CreditCard {
    type: CreditCardTypeEnum;
    stripeToken: string;
    obfuscatedCardNumber: string;
    expiryMonth: string;
    expiryYear: string;
}

export enum CreditCardTypeEnum {
    stripe = 'stripe',
}
