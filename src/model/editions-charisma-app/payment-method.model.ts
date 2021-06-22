export interface PaymentMethod {
    id?: number;
    paymentPlatform: PaymentMethodPlatformTypeEnum;
    stripeId: string;
    last4: string;
    expMonth: string;
    expYear: string;
    name: string;
    brand: string;
    isDefaultPaymentMethod?: boolean;
}

export enum PaymentMethodPlatformTypeEnum {
    stripe = 'stripe',
}

export enum PaymentMethodStatusEnum {
    new = 'new',
    expired = 'expired',
}
