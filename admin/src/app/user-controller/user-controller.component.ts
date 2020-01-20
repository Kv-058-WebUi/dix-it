import { Component, OnInit } from '@angular/core';
import {UserControllerService, UserType} from './user-controller.service';

import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {faCog} from '@fortawesome/free-solid-svg-icons';
import { ViewEncapsulation } from '@angular/core';
import { UserSettingsComponent } from '../user-settings/user-settings.component';


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

  banUser(user: UserType) {
    const {user_id} = user
    this.userControllerService.banUser(user_id)
  }

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
      panelClass: 'user-controller__modal-settings',
      height: '400px',
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  ngOnInit() {
    this.getUsers()
  }
}
