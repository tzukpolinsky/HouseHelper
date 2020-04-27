import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil, take} from 'rxjs/operators';
import { User } from '../entities/user';
import { Msg } from '../entities/msg';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit, OnDestroy {
  currentUser: User;
  newUser: User;
  msg: Msg;
  image: string;
  isAdd = false;
  destroyed = new Subject();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.userService.createEmptyEntity();
    this.newUser = this.userService.createEmptyEntity();
    this.image = localStorage.getItem('bg-image');
  }
  ngOnDestroy(): void {
    this.destroyed.next();

  }
  add() {
    this.userService.add(this.newUser).pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result.isSuccess) {
        this.msg = {
          action: 'יופי',
          msg: result.msg,
        };
        setTimeout(() => {
          this.isAdd = false;
        }, 2000);
      } else {
        this.msg = {
          action: 'שלח מייל שגיאה',
          msg: result.msg,
          duration: 3500,
          typeOfAction: 'errorEmail'
        };
      }
    });
  }
  login() {
    if (this.currentUser.password !== '' && this.currentUser.userName !== '') {
      this.userService.login(this.currentUser)
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
          if (result.isSuccess) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            this.router.navigate(['/']);
          } else {
            this.msg = {
              action: '',
              msg: result.msg,
              duration: 5000,
            };
          }
      });
    } else {
      this.msg = {
        action: '',
        msg: 'נא למלא את כל השדות',
        duration: 5000,
      };
    }
  }
}
