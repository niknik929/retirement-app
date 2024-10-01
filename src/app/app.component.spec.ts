import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './screens/header/header.component';
import { FooterComponent } from './screens/footer/footer.component';
import { DetailsComponent } from './screens/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { CommonInputComponent } from './components/common-input/common-input.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientModule,
        ButtonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        DropdownModule,
        DynamicDialogModule,
        
      ],
      declarations: [
        AppComponent,
        DetailsComponent,
        HeaderComponent,
        FooterComponent,
        CommonInputComponent,
        CommonDialogComponent
      ],
      providers: [
        DialogService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'retirementApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('retirementApp');
  });
});
