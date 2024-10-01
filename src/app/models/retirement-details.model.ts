export interface RetirementDetails {
    userId: string;
    creationDate?: string;
    accountNumber?: string;
    chargeDate?: string;
    currency?: string;
    investmentAmount?: number;
    accumulatedInvestmentAmount?: number;
    currentMarketValue?: number;
    status?: string;
    nextPaymentDate?: string;
    investmentFrequency?: string;
}

export interface Currency {
    code: string;
    description?: string;
}

export interface Account {
    id?: string;
    accountNumber?: string;
    currency?: string;
    balance?: number;
}

