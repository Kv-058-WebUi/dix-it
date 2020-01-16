import { Component, OnInit } from '@angular/core';
import {UserControllerService, UserType} from './user-controller.service';
import { Observable } from 'rxjs';
import {faCog} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-controller',
  templateUrl: './user-controller.component.html',
  styleUrls: ['./user-controller.component.scss']
})
export class UserControllerComponent implements OnInit {

  faCog = faCog

  constructor(
    private userControllerService: UserControllerService
  ) {  }  

  users$: Observable<UserType[]>;
  
  getUsers() {
    this.users$ = this.userControllerService.getUsers();
  }

  ngOnInit() {
    this.getUsers()
  }
}
