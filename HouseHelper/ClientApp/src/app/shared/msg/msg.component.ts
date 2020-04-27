import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from '../../services/shared/email.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Msg } from '../../entities/msg';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
})
export class MsgComponent implements OnInit, OnDestroy, OnChanges {

  @Input() msg: Msg;
  snackBarRef: any;
  destroyed = new Subject();
  constructor(private _snackBar: MatSnackBar, private emailService: EmailService) { }
  ngOnChanges() {
    this.setSnackBar();
  }
  ngOnInit() {
    this.setSnackBar();
  }
  ngOnDestroy(): void {
    this.destroyed.next();
  }
  setSnackBar() {
    this.snackBarRef = this._snackBar.open(this.msg.msg , this.msg.action, {
      duration: this.msg.duration ? this.msg.duration : 2000
    });
    this.snackBarRef.onAction().subscribe(() => {
      switch (this.msg.typeOfAction) {
        case 'errorEmail':
          this.sendErrorEmail();
          break;
        default:
          break;
      }
    });
  }
  sendErrorEmail() {
    this.emailService.sendErrorMsg(this.msg.msg)
    .pipe(takeUntil(this.destroyed))
    .subscribe(result => {
      if (result) {
        this.msg = {
          action: 'טוב לדעת',
          msg: 'המייל נשלח בהצלחה'
        };
      } else {
        this.msg = {
          action: 'נא לשלוח מייל לתמיכה',
          msg: 'קרתה תקלה בעת שליחת המייל',
        };
      }
      this.setSnackBar();
    });
  }
}
