import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadCardComponent } from './upload-card/upload-card.component';
import { ReviewCardsListComponent } from './review-cards-list/review-cards-list.component';
import { UserControllerComponent} from './user-controller/user-controller.component';
import { AdminComponent } from './admin/admin.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    UserControllerComponent,
    UserSettingsComponent,
    CreateNewUserComponent,
    UploadCardComponent,
    AdminComponent,
    ReviewCardsListComponent,
    GalleryComponent,
    ForbiddenComponent
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
    MatInputModule,
    MatGridListModule,
    ScrollingModule,
    HttpClientModule,
    MatTabsModule,
    MatTooltipModule,
    ImageCropperModule,
    FormsModule
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
