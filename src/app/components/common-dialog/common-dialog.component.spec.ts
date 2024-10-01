import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialogComponent } from './common-dialog.component';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';

describe('CommonDialogComponent', () => {
  let component: CommonDialogComponent;
  let fixture: ComponentFixture<CommonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDialogComponent],
      imports: [
        DynamicDialogModule,
        HttpClientModule
      ],
      providers: [
        DynamicDialogRef, DynamicDialogConfig
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
