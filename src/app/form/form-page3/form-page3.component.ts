import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-form-page3',
  templateUrl: './form-page3.component.html',
  styleUrls: ['./form-page3.component.css']
})
export class FormPage3Component implements OnInit {

  @Output()
  formValue: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  submit: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  email: string = '';
  @Input()
  name: string = '';
  @Input()
  linkedInId: string = '';
  url: string | undefined;
  askFormId = 'futse42hq';

  ngOnInit(): void {
    this.url = `https://www.videoask.com/${this.askFormId}#contact_name=${this.name}&contact_email=${this.email}&contact_phone_number=${this.linkedInId}`;
  }

  onBack() {
    this.back.emit();
  }

  submitForm() {
    this.submit.emit();
  }
}
