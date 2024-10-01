import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonInputComponent } from './common-input.component';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';

describe('CommonInputComponent', () => {
  let component: CommonInputComponent;
  let fixture: ComponentFixture<CommonInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonInputComponent],
      imports: [
        HttpClientModule
      ],
      providers: [DialogService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
