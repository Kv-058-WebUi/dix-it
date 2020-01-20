import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserSettingsService } from './user-settings.service';
import { NgForm } from '@angular/forms';

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

  public body = ''  
    
  updateUser(form: NgForm) {
    console.log(form.value);
    this.userSettingsService.updateUser(this.data, form.value)
  }

  ngOnInit() {
    console.log(this.data);
  }

}
