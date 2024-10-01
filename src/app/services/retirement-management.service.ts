import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { Account, Currency, RetirementDetails } from "../models/retirement-details.model";


@Injectable({
 providedIn: 'root'
})
export class RetirementManagementService {

    private mockRetirementDetailsDataUrl = 'mockdata/retirement-mock-data.json';
    private mockCurrencyListUrl = 'mockdata/currency-mock-data.json';
    private mockAccountListUrl = 'mockdata/accounts-mock-data.json';
    
    private updateFormDataSubject$ = new BehaviorSubject<any>(undefined);

    constructor(private http: HttpClient) {}
    
    getMockDetailData(): Observable<RetirementDetails[]> {
        return this.http.get<RetirementDetails[]>(this.mockRetirementDetailsDataUrl);
    }

    getMockCurrencyList(): Observable<Currency[]> {
        return this.http.get<Currency[]>(this.mockCurrencyListUrl).pipe(
            map(data => data.sort((a,b)=> a.code.localeCompare(b.code)))
        );
    }

    getMockAccountList(): Observable<Account[]> {
        return this.http.get<Account[]>(this.mockAccountListUrl);
    }

    getManagementDetailsByUserId(userId: string): Observable<RetirementDetails | undefined> {
        return this.getMockDetailData().pipe(
            map(data => data.find(item => item.userId === userId)), 
            catchError(error => {
                console.error(error);
                return of(undefined);
            })
        );
    }

    getAccountListByCurrency( currencyCode: string): Observable<Account[] | undefined> {
        return this.getMockAccountList().pipe(
            map( data => data.filter( item => item.currency === currencyCode)),
            catchError( error => {
                console.log(error);
                return of(undefined);
            })
        )
    }

    // Simulate modification    
    setUpdatedDetailData( updatedData: any) {
        this.updateFormDataSubject$.next(updatedData);
    }
    
    getUpdatedDetailData(): Observable<any> {
        return this.updateFormDataSubject$;
    }
}