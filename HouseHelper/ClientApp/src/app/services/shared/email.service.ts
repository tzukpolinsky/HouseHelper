import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }
  sendErrorMsg(msg: string) {
    debugger;
    const url = environment.serverUrl + 'email/errorEmail';
    return this.httpClient.post<Boolean>(url, msg);
  }
}
