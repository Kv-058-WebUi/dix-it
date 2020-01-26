import { Component, OnInit, Inject } from '@angular/core';
import {UserControllerService, UserType} from './user-controller.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {faEdit, faBan} from '@fortawesome/free-solid-svg-icons';
import { ViewEncapsulation } from '@angular/core';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';

@Component({
  selector:'app-ban-form',
  template: `
  <div class='ban-form'>
    <h1 class='ban-form__title'>Ban {{data.nickname}}?</h1>
    <form>
      <textarea
      placeholder='Ban reason...'
      name='banReason'
      ngModel
      #banForm='ngModel'
      ></textarea>
      <div class='ban-form__buttons'> 
        <button (click)='banUser(data, banFrom.value)'>Ban user</button>
        <button>cancel</button>
      </div>
    </form>
  </div>
  `,
  styleUrls: ['./user-controller.component.scss'],
})
export class BanForm {
  constructor(
    private userControllerService: UserControllerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}

@Component({
  selector: 'app-user-controller',
  templateUrl: './user-controller.component.html',
  styleUrls: ['./user-controller.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserControllerComponent implements OnInit {

  public faEdit = faEdit;
  public faBan = faBan;

  constructor(
    private userControllerService: UserControllerService,
    public dialog: MatDialog
  ) {  }  

  users$: Observable<UserType[]>;
  users: UserType[] = [];

  showSpinner = false;
  
  getUsers() {
    this.showSpinner = true;
    this.users$ = this.userControllerService.getUsers();
    this.users$.subscribe(res => {
      this.users = res;
      this.showSpinner = false;
    })
  }

  openBanDialog(user) {
    const dialogRef = this.dialog.open(BanForm, {
      panelClass:'user-controller__modal',
      width: '437px',
      height: '267px',
      data: user
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  openDialogAndRememberUser(user: UserType) {
    const dialogRef = this.dialog.open(UserSettingsComponent, {
      panelClass: 'user-controller__modal',
      width: '736px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
  openCreateUserDialog() {
    const dialogRef = this.dialog.open(CreateNewUserComponent, {
      panelClass: 'user-controller__modal',
      width: '440px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  ngOnInit() {
    this.getUsers()
  }
}
