import { Component, NgModule, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { UserControllerComponent } from '../user-controller/user-controller.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
