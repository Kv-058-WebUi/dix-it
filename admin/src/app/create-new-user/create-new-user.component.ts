import { Component, OnInit } from '@angular/core';
import { CreateNewUserService } from './create-new-user.service';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.scss']
})
export class CreateNewUserComponent implements OnInit {

  constructor(
    public createNewUserService: CreateNewUserService
  ) {  }

  public createUser(form) {
    this.createNewUserService.createUser(form.value);
  }

  ngOnInit() {

  }

}
