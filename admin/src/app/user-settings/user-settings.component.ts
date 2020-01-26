import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserSettingsService } from './user-settings.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userSettingsService: UserSettingsService
    ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  public faCalendar = faCalendarAlt
    
  public updateUser(form: NgForm) {
    console.log(form.value);
    this.userSettingsService.updateUser(this.data, form.value)
  }

  public dropPassword() {
    this.userSettingsService.dropPassword(this.data.user_id)
  }

  public banUser(banReason) {
    this.userSettingsService.banUser(this.data.user_id, banReason)
  }
  public unbanUser() {
    this.userSettingsService.unbanUser(this.data.user_id)
  }

  ngOnInit() {
  }

}
