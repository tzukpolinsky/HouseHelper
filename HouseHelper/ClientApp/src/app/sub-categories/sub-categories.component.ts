import { Component, OnInit, Input, ViewChild , Output, EventEmitter } from '@angular/core';
import { SubCategories } from '../entities/sub-categories';
import {takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Category } from '../entities/category';
import { Msg } from '../entities/msg';
import { SubCategoriesService } from '../services/sub-categories.service';
import { SwalPortalTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
})
export class SubCategoriesComponent implements OnInit {
  @Input() category: Category;
  @Output() displayMsg = new EventEmitter<Msg>();
  msg: Msg;
  destroyed = new Subject();
  deleteSubCategory: SubCategories;
  editSubCategory: SubCategories;
  @ViewChild('newSub', {static: true }) private newSub: SwalComponent;
  @ViewChild('editSub', {static: true }) private editSub: SwalComponent;
  @ViewChild('deleteSub', {static: true }) private deleteSub: SwalComponent;

  constructor(private subCategoriesService: SubCategoriesService, public readonly swalTargets: SwalPortalTargets) { }

  ngOnInit() {
  }
  getByCategory() {
    this.subCategoriesService.getByCategory(this.category)
    .pipe(takeUntil(this.destroyed)).
    subscribe(result => this.category.subCategories = result);
  }
  add(sub: SubCategories) {
    this.subCategoriesService.add(sub)
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.getByCategory();
        this.newSub.dismiss();
        this.msg = {
          action: 'טוב לדעת',
          msg: 'תת הקטגוריה נוצרה בהצלחה'
        };
      } else {
        this.msg = {
          action: 'שלח מייל שגיאה',
          msg: 'קרתה תקלה בעת הוספת התת קטגוריה',
          duration: 3500,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
  }
  update(sub: SubCategories) {
    this.subCategoriesService.update(sub)
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.category.subCategories.find(x => x.id)[0] = sub;
        this.msg = {
          action: 'טוב לדעת',
          msg: 'תת הקטגוריה עודכנה בהצלחה'
        };
      } else {
        this.msg = {
          action: 'שלח מייל שגיאה',
          msg: 'קרתה תקלה בעת עדכון התת קטגוריה',
          duration: 3500,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
  }
  remove() {
    this.subCategoriesService.remove(this.deleteSubCategory)
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.category.subCategories = this.category.subCategories.filter(x => x.id !== this.deleteSubCategory.id);
        this.msg = {
          action: 'טוב לדעת',
          msg: 'תת הקטגוריה נמחקה בהצלחה'
        };
      } else {
        this.msg = {
          action: 'שלח מייל שגיאה',
          msg: 'קרתה תקלה בעת מחיקת התת קטגוריה',
          duration: 3500,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
  }
  getDeleteSubCategoryPopUp(sub: SubCategories) {
    this.deleteSubCategory = sub;
    this.deleteSub.fire();
  }
  createNewSubCategory() {
    this.newSub.fire();
  }
  viewSubCategory(subCategory: SubCategories) {
    this.editSubCategory = subCategory;
    this.editSub.fire();
  }

}
