import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './screens/header/header.component';
import { FooterComponent } from './screens/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { DetailsComponent } from './screens/details/details.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { CommonInputComponent } from './components/common-input/common-input.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DetailsComponent, 
    CommonInputComponent,
    CommonDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    TooltipModule,
    HttpClientModule
  ],
  providers: [ DialogService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
