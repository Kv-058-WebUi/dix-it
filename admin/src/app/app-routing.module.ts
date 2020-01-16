import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {UploadCardComponent} from './upload-card/upload-card.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path: 'upload', component: UploadCardComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
