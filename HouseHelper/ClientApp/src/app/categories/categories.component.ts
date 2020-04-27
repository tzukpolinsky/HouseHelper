import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter, ViewContainerRef, TemplateRef, Renderer2 } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category';
import { Subject, Subscription, fromEvent } from 'rxjs';
import {takeUntil, filter, take} from 'rxjs/operators';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Msg } from '../entities/msg';
import { User } from '../entities/user';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  newCategory: Category;
  editCategory: Category;
  deleteCategory: Category;
  categories: Category[];
  currentCategory: Category;
  msg: Msg;
  sub: Subscription;
  overlayRef: OverlayRef | null;
  menuPostion: any;
  @Output() displayMsg = new EventEmitter<Msg>();
  @Output() displaySubCategories = new EventEmitter<Category>();
  destroyed = new Subject();
  @ViewChild('contextMenu', {static: true }) contextMenu: TemplateRef<any>;
  @ViewChild('addCategorySwal', {static: true }) private addCategorySwal: SwalComponent;
  @ViewChild('updateCategorySwal', {static: true }) private updateCategorySwal: SwalComponent;
  @ViewChild('deleteCategorySwal', {static: true }) private deleteCategorySwal: SwalComponent;
  constructor(private categoriesService: CategoriesService, public readonly swalTargets: SwalPortalTargets ,
              public overlay: Overlay, public viewContainerRef: ViewContainerRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.newCategory = this.categoriesService.createEmptyEntity();
    this.getByUser(this.newCategory.user);
    this.setCloseMenuEvent();
    this.renderer.listen('window', 'click', (e: Event) => {
      this.close();
    });
  }
  ngOnDestroy(): void {
    this.destroyed.next();
  }
  getByUser(user: User) {
    this.categoriesService.getByUser(this.newCategory.user).
    pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      this.categories = result;
      this.displayCategory(result[0]);
    });
  }
  displayCategory(category: Category) {
    localStorage.setItem('currentCategory' , JSON.stringify(category));
    this.currentCategory = category;
    this.displaySubCategories.emit(category);
  }
  onContextMenu(event: MouseEvent, category: Category) {
    event.preventDefault();
    this.close();
    this.menuPostion = {
      x: event.x,
      y: event.y
    };
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.menuPostion)
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.contextMenu, this.viewContainerRef, {
      $implicit: category
    }));
  }
  add() {
    if (this.newCategory && this.newCategory.name !== '') {
    this.categoriesService.add(this.newCategory)
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.getByUser(this.newCategory.user);
        this.msg = {
          msg: 'הקטוגריה נוספה בהצלחה',
          action: 'יופי',
          duration: 3000
        };
      } else {
        this.msg = {
          msg: 'קרתה תקלה במהלך הוספת הקטגוריה',
          action: 'שלח מייל',
          duration: 3000,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
    } else {
      this.getNewCategoryPopUp();
    }
  }
  update() {
    this.categoriesService.update(this.editCategory).
    pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.categories.find(x => x.id === this.editCategory.id).name = this.editCategory.name;
        this.msg = {
          action: 'יופי',
          msg: 'הקטגוריה עודכנה בהצלחה',
        };
      } else {
        this.msg = {
          action: 'שלח מייל',
          msg: 'קרתה תקלה בעת עדכון הקטגוריה',
          duration: 3000,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
  }
  delete() {
    this.categoriesService.remove(this.deleteCategory).
    pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.getByUser(this.deleteCategory.user);
        this.msg = {
          action: 'יופי',
          msg: 'הקטגוריה נמחקה בהצלחה',
        };
      } else {
        this.msg = {
          action: 'שלח מייל',
          msg: 'קרתה תקלה בעת מחיקת הקטגוריה',
          duration: 3000,
          typeOfAction: 'errorEmail'
        };
      }
      this.displayMsg.emit(this.msg);
    });
  }
  getNewCategoryPopUp() {
    this.newCategory = this.categoriesService.createEmptyEntity();
    this.addCategorySwal.fire();
  }
  getUpdateCategoryPopUp(category: Category) {
    this.editCategory = category;
    this.updateCategorySwal.fire();
  }
  getDeleteCategoryPopUp(category: Category) {
    this.deleteCategory = category;
    this.deleteCategorySwal.fire();
  }
  clearCategory() {
    this.newCategory = this.categoriesService.createEmptyEntity();
  }
  setCloseMenuEvent() {
    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close());
  }
  close() {
    // tslint:disable-next-line:no-unused-expression
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
