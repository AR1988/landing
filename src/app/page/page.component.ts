import {Component} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormComponent} from "../form/form.component";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  constructor(private modalService: NgbModal) {
  }

  openForm(): void {
    this.modalService.open(FormComponent, {size: 'lg'});
  }
}
