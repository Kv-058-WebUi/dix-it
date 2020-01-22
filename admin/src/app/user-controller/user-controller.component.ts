import { Component, OnInit } from '@angular/core';
import {UserControllerService, UserType} from './user-controller.service';

import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import { ViewEncapsulation } from '@angular/core';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';


@Component({
  selector: 'app-user-controller',
  templateUrl: './user-controller.component.html',
  styleUrls: ['./user-controller.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserControllerComponent implements OnInit {

  faCog = faCog

  constructor(
    private userControllerService: UserControllerService,
    public dialog: MatDialog
  ) {  }  

  users$: Observable<UserType[]>;
  users: UserType[] = [];

  showSpinner = false;

  getCurrentUser(user: UserType) {
    return user;
  }
  
  getUsers() {
    this.showSpinner = true;
    this.users$ = this.userControllerService.getUsers();
    this.users$.subscribe(res => {
      this.users = res;
      this.showSpinner = false;
    })
  }

  openDialogAndRememberUser(user: UserType) {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      panelClass: 'user-controller__modal',
      height: '400px',
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateNewUserComponent, {
      panelClass: 'user-controller__modal',
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.getUsers()
  }
}
