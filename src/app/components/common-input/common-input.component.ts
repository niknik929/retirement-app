import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { Currency } from '../../models/retirement-details.model';
import { CommonInput, DialogType } from '../../models/common-input.model';
import { RetirementManagementService } from '../../services/retirement-management.service';


@Component({
  selector: 'app-common-input',
  templateUrl: './common-input.component.html',
  styleUrl: './common-input.component.scss' 
})
export class CommonInputComponent {
    @Input()
    public inputData: CommonInput | undefined;

    @Input()
    public currencyList: Currency[] | undefined;

    dialogRef: DynamicDialogRef | undefined;

    constructor(public dialogService: DialogService, public retirementManagementService: RetirementManagementService) {}

    showDialog(title: string, selectedData?: CommonInput, allowUpdate = false) {
      this.dialogRef = this.dialogService.open(CommonDialogComponent, {        
        header: title,
        width: '40%',
        height: '345px',
        style: {
          position: 'absolute',          
          top: '200px'
        },
        contentStyle: {"max-height": "400px", "overflow": "auto"},
        baseZIndex: 10000,
        modal:true,        
        data: {           
          fieldType: selectedData?.fieldType,
          selectedCurrency: selectedData?.currency,
          selectedAccount: selectedData?.value,
          currencyList: this.currencyList,
          allowUpdate: allowUpdate
        }
      });

      this.dialogRef.onClose.subscribe(res => {
         if (res) {
            this.retirementManagementService.setUpdatedDetailData(res);
         }
      })
    }

    onIconClicked( fieldType: string, selectedData: CommonInput) {
      switch (fieldType) {
        case DialogType.ACCOUNT_NUMBER:
          this.showDialog('Change account number', selectedData, true);
          break;
        case DialogType.CHARGE_DATE:
          this.showDialog('Change charge date');
          break;  
      }
    }

    onActionButtonClicked( fieldType: string, selectedData: CommonInput) {
      switch (fieldType) {
        case DialogType.STATUS:
          this.showDialog(selectedData.actionButtonLabel!, selectedData);
          break;
        case DialogType.INVESTMENT_AMOUNT:
          this.showDialog(selectedData.actionButtonLabel!);
          break;  
        case DialogType.CURRENT_MARKET_VALUE:
          this.showDialog(selectedData.actionButtonLabel!);
          break;    
      }
    }
}


