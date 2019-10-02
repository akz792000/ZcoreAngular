/**
 * 
 * @author Ali Karimizandi
 * @since 2017 
 *
 */

import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

/**
 * component
 */

@Component({
  // moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent implements OnInit {

  currentUser: UserModel;
  users: UserModel[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }

}
