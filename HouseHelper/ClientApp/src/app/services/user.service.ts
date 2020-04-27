import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  createEmptyEntity(): User {
    return {
      userName: '',
      password: '',
      name: '',
      id: '',
    };
  }
  add(user: User) {
    user.password = btoa(user.password);
    const url = environment.serverUrl + 'users/add';
    return this.httpClient.post<any>(url, user);
  }
  login(user: User) {
    user.password = btoa(user.password);
    const url = environment.serverUrl + 'users/login';
    return this.httpClient.post<any>(url, user);
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
  getBgImg() {
    return this.httpClient.get<any>('/assets/img/bg.jpg', { observe: 'body', responseType: 'blob' as 'json' });
  }
}
