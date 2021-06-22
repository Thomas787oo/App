export interface StripeCardToken {
    id?: number;
    tokenId: string;
    cardId: string;
    last4: string;
    expMonth: string;
    expYear: string;
    name: string;
    brand: string;
}
