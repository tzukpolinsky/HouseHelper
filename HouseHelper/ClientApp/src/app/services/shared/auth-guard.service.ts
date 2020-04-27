import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> |Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    } else {
     const helper = new JwtHelperService();
     const isExpired = helper.isTokenExpired(token);
     if (isExpired) {
       this.router.navigate(['/login']);
       return false;
     }
    }
    return true;
  }
}
