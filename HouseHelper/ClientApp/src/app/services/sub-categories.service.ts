import { Injectable } from '@angular/core';
import { SubCategories } from '../entities/sub-categories';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entities/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private httpClient: HttpClient) { }
  createEmptyEntity(category: Category): SubCategories {
    return {
      id: '',
      name: '',
      category: category,
      description: '',
      data: [],
    };
  }
  getByCategory(category: Category) {
    const url = environment.serverUrl + 'subCategories/getByCategory';
    return this.httpClient.post<SubCategories[]>(url, category);
  }
  add(subCategory: SubCategories) {
    const url = environment.serverUrl + 'subCategories/add';
    return this.httpClient.post<boolean>(url, subCategory);
  }
  update(subCategory: SubCategories) {
    const url = environment.serverUrl + 'subCategories/update';
    return this.httpClient.post<boolean>(url, subCategory);
  }
  remove(subCategory: SubCategories) {
    const url = environment.serverUrl + 'subCategories/remove';
    return this.httpClient.post<boolean>(url, subCategory);
  }
}
