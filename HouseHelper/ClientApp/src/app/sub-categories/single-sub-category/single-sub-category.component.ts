import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubCategories } from '../../entities/sub-categories';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { Category } from '../../entities/category';

@Component({
  selector: 'app-single-sub-category',
  templateUrl: './single-sub-category.component.html',
})
export class SingleSubCategoryComponent implements OnInit {
  @Input() subCategory: SubCategories;
  @Output() subCategorySubmited = new EventEmitter<SubCategories>();
  constructor(private subCategoryService: SubCategoriesService) { }

  ngOnInit() {
    const category: Category = JSON.parse(localStorage.getItem('currentCategory'));
    this.subCategory = this.subCategory ? this.subCategory :
    this.subCategoryService.createEmptyEntity(category);
  }
  addData() {
    this.subCategory.data.push({
      description: '',
      creationDate: new Date(),
    });
    this.subCategory.data.sort((x, y) => y.creationDate.getTime() - x.creationDate.getTime());
  }
  emitSubCategory() {
    this.subCategorySubmited.emit(this.subCategory);
  }
}
