import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';
import { url } from '../config';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiurl:string=url + 'customer/'
  constructor(private http:HttpClient) { }

  addcustomermongo(user:any):Observable<Customer>{
    const customer:Customer={
      name:user.name,
      email:user.email,
      googleId:user.id,
      profilepicture:user.picture
    }
    return this.http.post<Customer>(this.apiurl,customer  )
}
  signup(data: any): Observable<any> {
    return this.http.post(url + 'signup', data);
  }
  login(data: any): Observable<any> {
    return this.http.post(url + 'login', data);
  }
}
