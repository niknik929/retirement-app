import { Component } from '@angular/core';
import { Currency, RetirementDetails } from '../../models/retirement-details.model';
import { RetirementManagementService } from '../../services/retirement-management.service';
import { tap } from 'rxjs';
import { CommonInput, DialogType } from '../../models/common-input.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'  
})
export class DetailsComponent {
    detailData: RetirementDetails | undefined;
    fields: CommonInput[] = [];
    dialogRef: DynamicDialogRef | undefined;
    currencyList: Currency[] = [];

    constructor(private retirementManagementService: RetirementManagementService, public dialogService: DialogService) {
       this.retirementManagementService.getManagementDetailsByUserId('A2024000001').pipe(
        tap( res => {
          if (res) {
            this.detailData = res as RetirementDetails;
            this.fields = this.constructManagementDetailScreen(this.detailData);
          }
        })
       ).subscribe();

       this.retirementManagementService.getMockCurrencyList().subscribe(res => {
           this.currencyList = res as Currency[];
       })

       this.retirementManagementService.getUpdatedDetailData().subscribe( updatedData => {
           if (updatedData) {
              const updatedFormData = Object.assign({}, this.detailData);
              
              switch (updatedData.fieldType) {
                 case DialogType.ACCOUNT_NUMBER:
                   updatedFormData.accountNumber = updatedData.accountNumber;
                   updatedFormData.currency = updatedData.currency;
                   break;
              }
              this.detailData = Object.assign({}, updatedFormData);
              this.fields = this.constructManagementDetailScreen(this.detailData);
           }  
       })
    }

    public constructManagementDetailScreen( detailData: RetirementDetails ): CommonInput[] {
       const fields: CommonInput[] = [];
       if (detailData) {
          if (detailData.creationDate) {
             const item = {
              fieldType: DialogType.CREATION_DATE,              
              titleLabel: 'Creation date',
              value: detailData.creationDate,              
            } as CommonInput;     
             fields.push(item);
          }          
          if (detailData.investmentAmount) {
            const item = {
              fieldType: DialogType.INVESTMENT_AMOUNT,
              inputType: 'amount',
              titleLabel: 'Investment amount',
              value: detailData.investmentAmount,
              currency: detailData.currency,
              actionType: 'action-button',
              actionButtonLabel: 'Adjust amount',
              additionalMessage: detailData.investmentFrequency != null ? this.getInvestmentFrequency(detailData.investmentFrequency) : ''
            } as CommonInput;     
            fields.push(item);
          }
          if (detailData.accountNumber) {
            const item = {
              fieldType: DialogType.ACCOUNT_NUMBER,
              titleLabel: 'Account number',
              value: detailData.accountNumber,
              currency: detailData.currency,
              actionType: 'action-icon'
            } as CommonInput;            
            fields.push(item);
          }
          if (detailData.accumulatedInvestmentAmount) {
            const item = {
              fieldType: DialogType.ACCUMULATED_INVESTMENT_AMOUNT,
              inputType: 'amount',
              titleLabel: 'Accumulated investment amount',
              value: detailData.accumulatedInvestmentAmount,
              currency: detailData.currency              
            } as CommonInput;      
            fields.push(item);
          }
          if (detailData.chargeDate) {
            const item = {
              fieldType: DialogType.CHARGE_DATE,              
              titleLabel: 'Charge date',
              value: detailData.chargeDate,
              actionType: 'action-icon',
              additionalMessage: detailData.nextPaymentDate != null ? this.getNextPaymentDate(detailData.nextPaymentDate) : ''
            } as CommonInput;     
            fields.push(item);
          }
          if (detailData.currentMarketValue) {
            const item = {
              fieldType: DialogType.CURRENT_MARKET_VALUE,
              inputType: 'amount',
              titleLabel: 'Current market value',
              value: detailData.currentMarketValue,
              currency: detailData.currency,
              actionType: 'action-button',
              actionButtonLabel: 'Redemption'              
            } as CommonInput;    
            fields.push(item);
          }
          if (detailData.status) {
            const item = {
              fieldType: DialogType.STATUS,              
              titleLabel: 'Status',
              value: detailData.status,              
              actionType: 'action-button',
              actionButtonLabel: 'Suspension of investment'              
            } as CommonInput;
            fields.push(item);
          }
       }
       return fields;
    }

    getNextPaymentDate( paymentDate: string): string {      
      return paymentDate != null ? '( Next payment date : ' + paymentDate + ')' : '';
    }

    getInvestmentFrequency( frequency: string): string {      
      return frequency != null ? '(' + frequency + ')' : '';
    }

}
