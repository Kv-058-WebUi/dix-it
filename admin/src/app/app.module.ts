import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadCardComponent } from './upload-card/upload-card.component';
import { UserControllerComponent } from './user-controller/user-controller.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component'

@NgModule({
  declarations: [
    AppComponent,
    UploadCardComponent,
    UserControllerComponent,
    AdminComponent,
    UserSettingsComponent,
    CreateNewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,                            
    ReactiveFormsModule, 
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    UserControllerComponent,
    UserSettingsComponent,
    CreateNewUserComponent
  ]
})
export class AppModule { }
