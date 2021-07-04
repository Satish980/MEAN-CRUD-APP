import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/operators';

import { Notices } from './notices.model';

declare var M : any
@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  selectedNotice!: Notices
  notices!: Notices[];
  readonly baseURL = 'http://localhost:3000/notices';

  constructor(private http: HttpClient) { }

  postNotice(notice : Notices){
    return this.http.post(this.baseURL, notice)
  }

  getNoticesList(){
    M.toast({html: "Get Notices", classes: 'rounded'})
    return this.http.get(this.baseURL)
  }

  putNotice(notice : Notices){
    console.log("putNotices Called with data" + JSON.stringify(notice))
    return this.http.put(this.baseURL + '/' +notice._id,notice)
  }

  deletNotice(_id: string){
    console.log("deleteNotice Called with id" + _id)
    return this.http.delete(this.baseURL + '/' + _id)
  }
}
