import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/api/users', this.jwt()).pipe(map((response) => response.json()));
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).pipe(map((response) => response.json()));
  }

  create(user: UserModel) {
    return this.http.post('/api/users', user, this.jwt()).pipe(map((response) => response.json()));
  }

  update(user: UserModel) {
    return this.http.put('/api/users/' + user.id, user, this.jwt()).pipe(map((response) => response.json()));
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).pipe(map((response) => response.json()));
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }

}
