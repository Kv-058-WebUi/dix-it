import { Component, NgModule } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserControllerComponent } from '../user-controller/user-controller.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(UserControllerComponent, {
      panelClass: 'user-controller__modal'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
