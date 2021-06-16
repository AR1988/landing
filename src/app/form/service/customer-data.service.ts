import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomerData} from "../../model/customerData";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  private readonly hostUrl = '/api/'
  private readonly addEndpoint = this.hostUrl + 'customer-data'
  // private readonly getEndpoint = this.addEndpoint;
  private readonly submitEndpoint = this.hostUrl + 'customer-data/submit'

  constructor(private client: HttpClient) {
  }

  add(body: CustomerData): Observable<{ formId: string }> {
    return this.client.post<{ formId: string }>(this.addEndpoint, body, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
  }

  update(body: CustomerData): Observable<void> {
    return this.client.put<void>(this.addEndpoint, body, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
  }

  submitForm(body: CustomerData): Observable<void> {
    return this.client.put<void>(this.submitEndpoint, body, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
  }

  // getDataById(id: string): Observable<CustomerData> {
  //   return this.client.get<CustomerData>(this.getEndpoint, {headers: new HttpHeaders().set('Content-Type', 'application/json')})
  // }
}
