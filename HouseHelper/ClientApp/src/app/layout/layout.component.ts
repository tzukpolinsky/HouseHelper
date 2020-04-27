import { Component, OnInit } from '@angular/core';
import { Msg } from '../entities/msg';
import { Category } from '../entities/category';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  title = 'houseHelper';
  msg: Msg;
  image: string;
  currentCategory: Category;
  opened = false;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.image = localStorage.getItem('bg-image');
  }
  toggleSideBar() {
    this.opened = !this.opened;
  }
  displayMsg(msg: Msg) {
    this.msg = msg;
  }
  displaySubCategories(category: Category) {
    if (!this.currentCategory || this.currentCategory.id !== category.id) {
      this.currentCategory = category;
    }
  }
  logout() {
    this.userService.logout();
    location.reload(true);
  }
}
