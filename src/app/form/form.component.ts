import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerData} from "../model/customerData";
import {CustomerDataService} from "./service/customer-data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  page: number = 1;
  model: CustomerData | undefined;
  errorMsg: string | undefined;
  id: { formId: string } | undefined;

  subscriptions: Subscription[] = [];

  constructor(private customerDataService: CustomerDataService) {
  }

  ngOnInit(): void {
  }

  addToModel($event: any) {
    if (this.id === undefined) {
      this.model = {...this.model, ...$event}
    } else {
      this.model = {...this.model, ...this.id, ...$event}
    }
    this.sendModelToApi();
  }

  sendModelToApi() {
    this.errorMsg = undefined;
    if (this.model === undefined) {
      return;
    }

    if (this.id === undefined) {
      const addSubscription: Subscription = this.customerDataService.add(this.model)
        .subscribe(value => {
            this.id = value
            this.page++;
          },
          error => this.callbackError(error));
      this.subscriptions.push(addSubscription)

    } else {
      const updateSubscription: Subscription = this.customerDataService.update(this.model)
        .subscribe(() => this.page++,
          error => this.callbackError(error));
      this.subscriptions.push(updateSubscription)
    }
  }

  submitForm(): void {
    if (this.model === undefined) {
      return;
    }

    const submitFormSubscription: Subscription = this.customerDataService.submitForm(this.model)
      .subscribe(() => this.page = 1,
        error => this.callbackError(error));
    this.subscriptions.push(submitFormSubscription)
  }

  private callbackError(error: HttpErrorResponse) {
    this.errorMsg = 'Can not save'
    console.error(error);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }
}
