import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadCardComponent } from './upload-card/upload-card.component';
import { AdminComponent } from './admin/admin.component';
import { ReviewCardsListComponent } from './review-cards-list/review-cards-list.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: AdminComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UploadCardComponent,
    AdminComponent,
    ReviewCardsListComponent,
    ReviewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
