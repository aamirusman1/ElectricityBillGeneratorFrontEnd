import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bill } from '../bill';
import { BillServiceService } from '../bill-service.service';

@Component({
  selector: 'app-consumer-get-all-bills-form',
  templateUrl: './consumer-get-all-bills-form.component.html',
  styleUrls: ['./consumer-get-all-bills-form.component.css'],
})
export class ConsumerGetAllBillsFormComponent {
  consumerId!: number;
  Bills: Bill[] = [];
  isHidden: boolean = false;
  errorMsg!: string;
  checkBillsStatus() {
    return this.Bills.length != 0;
  }
  consumerForm = new FormGroup({
    consumerId: new FormControl('', [Validators.required]),
  });

  constructor(private billService: BillServiceService) {}

  onSubmit(data: any) {
    this.consumerId = data.consumerId;
    this.billService
      .getAllBillsConsumer(this.consumerId)
      .pipe(
        catchError((error) => {
          this.errorMsg = `Error: ${error.error.message}`;
          return of([]);
        })
      )
      .subscribe((bills) => (this.Bills = bills));
    this.isHidden = true;
  }

  get getConsumerId() {
    return this.consumerForm.get('consumerId');
  }

  onBack() {
    this.isHidden = !this.isHidden;
    this.Bills = [];
  }
}
