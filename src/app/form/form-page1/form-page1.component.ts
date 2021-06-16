import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerData} from "../../model/customerData";


@Component({
  selector: 'app-form-page1',
  templateUrl: './form-page1.component.html',
  styleUrls: ['./form-page1.component.css']
})
export class FormPage1Component implements OnInit {

  form: FormGroup | undefined;
  @Output()
  formValue: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  model: CustomerData | undefined;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        linkedInUrl: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required]],
      }
    )
    if (this.model)
      this.setValues();
  }

  onSubmit() {
    this.formValue.emit(this.form?.value);
  }

  private setValues() {
    this.form?.controls.firstName.setValue(this.model?.firstName);
    this.form?.controls.lastName.setValue(this.model?.lastName);
    this.form?.controls.linkedInUrl.setValue(this.model?.linkedInUrl);
    this.form?.controls.phoneNumber.setValue(this.model?.phoneNumber);
    this.form?.controls.email.setValue(this.model?.email);
  }
}
