import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Account, Currency } from '../../models/retirement-details.model';
import { RetirementManagementService } from '../../services/retirement-management.service';
import { DialogType } from '../../models/common-input.model';


@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrl: './common-dialog.component.scss'
})
export class CommonDialogComponent {
    
    dialogData: any;
    dialogType!: string;
    allowUpdate = false;
    accountList: Account[] = [];
    currencyList: Currency[] = [];

    selectedCurrency: Currency | undefined;
    selectedAccount: Account | undefined;    

    constructor( public ref: DynamicDialogRef, 
                 public config: DynamicDialogConfig,
                 public retirementManagementService: RetirementManagementService) {
        this.dialogData = this.config.data;
        
        if (this.dialogData) {                   
          this.dialogType = this.dialogData.fieldType;          
          this.currencyList = this.dialogData.currencyList;
          this.allowUpdate = this.dialogData.allowUpdate;
          this.selectedCurrency = this.currencyList.find( item => item.code === this.dialogData.selectedCurrency);
          
          this.initForm(this.dialogType);
        }        
    }

    initForm( dialogType: string) {
      switch(dialogType) {          
          case DialogType.ACCOUNT_NUMBER:
            if (this.selectedCurrency) {              
              this.retirementManagementService.getAccountListByCurrency(this.selectedCurrency.code)
                .subscribe(res => {
                  if (res) {                    
                    this.accountList = res;
                    this.selectedAccount = this.accountList.find( item => item.accountNumber === this.dialogData.selectedAccount);
                  }                  
                })
            }
            break;
      }
    }

    onCancelClicked() {
       this.ref.close();
    }

    onSubmit() {
      const updatedFormData = {
         fieldType: this.dialogType, 
         currency: this.selectedCurrency?.code,
         accountNumber: this.selectedAccount?.accountNumber
      }      
      this.ref.close(updatedFormData);
    }
}
