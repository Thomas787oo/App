export interface ChargeDemandRequest {
    demand: number;
    proposition: number;
    paymentMethodType: PaymentMethodTypeEnum;
    paymentMethodId: number;
}

export enum PaymentMethodTypeEnum {
    temporaryPaymentMethod = 'temporary_payment_method',
    permanentPaymentMethod = 'permanent_payment_method',
}
