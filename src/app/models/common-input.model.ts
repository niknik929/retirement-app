export interface CommonInput {
    fieldType: string;
    titleLabel?: string;
    inputType?: string;
    value?: any;
    currency?: string;
    actionType: 'action-icon' | 'action-button'
    action?: string;
    actionButtonLabel?: string;
    additionalMessage?: string;    
}

export enum DialogType {
   CREATION_DATE = 'creationDate',
   ACCOUNT_NUMBER = 'accountNumber',
   CHARGE_DATE = 'chargeDate', 
   STATUS = 'accountStatus',
   INVESTMENT_AMOUNT = 'investmentAmount',
   ACCUMULATED_INVESTMENT_AMOUNT = 'accuInvestmentAmount',
   CURRENT_MARKET_VALUE = 'marketValue'
}