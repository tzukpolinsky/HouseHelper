import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entities/category';
import { environment } from '../../environments/environment';
import { SubCategoriesService } from './sub-categories.service';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }
  createEmptyEntity(): Category {
    return {
      id: '',
      subCategories: [],
      name: '',
      user: JSON.parse(localStorage.getItem('user'))
    };
  }
  getByUser(user: User) {
    const url = environment.serverUrl + 'categories/getByUser';
    return this.httpClient.post<Category[]>(url, user);
  }
  add(category: Category) {
    const url = environment.serverUrl + 'categories/add';
    return this.httpClient.post<boolean>(url, category);
  }
  update(category: Category) {
    const url = environment.serverUrl + 'categories/update';
    return this.httpClient.post<boolean>(url, category);
  }
  remove(category: Category) {
    const url = environment.serverUrl + 'categories/remove';
    return this.httpClient.post<boolean>(url, category);
  }
}
