import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { UploadCardComponent } from './upload-card/upload-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    UploadCardComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }