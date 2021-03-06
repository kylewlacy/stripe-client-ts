/**
 * Created by ronze on 1/22/2017.
 */

export interface StripeError {
    type: string;
    code?: string;
    message: string;
    param: string;
}

export interface StripeCreateTokenResponse {
    id: string; // Token identifier
    created: number; // Timestamp of when token was created
    livemode: boolean; // Whether this token was created with a live API key
    type: string;
    object: 'token'; // Type of object, always "token"
    used: boolean; // Whether this token has been used
    error?: StripeError;
    client_ip: string;
}

export interface StripeCardCreateTokenResponse extends StripeCreateTokenResponse {
    card: { // Dictionary of the card used to create the token
        name: string;
        address_line1: string;
        address_line2: string;
        address_city: string;
        address_state: string;
        address_zip: string;
        address_country: string;
        country: string;
        exp_month: number;
        exp_year: number;
        last4: string;
        object: 'card';
        brand: string;
        funding: string;
    }
}

export interface StripeCardOptions {
    number: string;
    cvc?: number;
    exp_month?: number|string;
    exp_year?: number|string;
    exp?: string;
    name?: string;
    address_line1?: string;
    address_line2?: string;
    address_city?: string;
    address_state?: string;
    address_zip?: string;
    address_country?: string;
}
export type StripeResponseHandler<T> = (
    status: string, // https://stripe.com/docs/api#errors
    response: T
) => void;

export interface StripeCard {
    createToken(options: StripeCardOptions, stripeResponseHandler: StripeResponseHandler<StripeCardCreateTokenResponse>): void;
    validateCardNumber(cardNum: string): boolean;
    validateExpiry(month: string|number, year?: string|number): boolean;
    validateCVC(cvc: string): boolean;
    cardType(cardNum: string): 'Visa'|'Mastercard'|'American Express'|'Discover'|'Diners Club'|'JCB'|'Unknown';
}

export interface StripeBankAccountCreateTokenResponse extends StripeCreateTokenResponse {
    bank_account: { // Dictionary of the bank account used to create the token
        country: string;
        bank_name: string;
        last4: string;
        validated: boolean;
        object: 'bank_account';
    }
}
export interface StripeBankAccountOptions {
    country: string;
    currency: string;
    routing_number: string;
    account_number: string;
    account_holder_name: string;
    account_holder_type: 'individual'|'company';
}

export interface StripeBankAccount {
    createToken(options: StripeBankAccountOptions, stripeResponseHandler: StripeResponseHandler<StripeBankAccountCreateTokenResponse>): void;
    validateRoutingNumber(routingNumber: string, country: string): boolean;
}

export interface StripePiiDataOptions {
    personal_id_number: string;
}

export interface StripePiiData {
    createToken(options: StripePiiDataOptions, stripeResponseHandler: StripeResponseHandler<StripeCreateTokenResponse>): void;
}

export interface StripeApplePay {
    checkAvailability(cb: (available: boolean) => void): void;
    buildSession(options: any, onSuccessHandler: (...args: any[]) => any, onErrorHandler: (...args: any[]) => any): void;
}

export interface StripeInterface {
    setPublishableKey(publishableKey: string): void;
    card: StripeCard;
    bankAccount: StripeBankAccount;
    piiData: StripePiiData;
    applePay: StripeApplePay;
}