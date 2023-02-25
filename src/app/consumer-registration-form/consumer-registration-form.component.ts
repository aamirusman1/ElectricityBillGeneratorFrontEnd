import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BillServiceService } from '../bill-service.service';
import { Consumer } from '../consumer';

@Component({
  selector: 'app-consumer-registration-form',
  templateUrl: './consumer-registration-form.component.html',
  styleUrls: ['./consumer-registration-form.component.css'],
})
export class ConsumerRegistrationFormComponent {
  consumer: Consumer = new Consumer(0, '', '', '', '');
  isHidden: boolean = false;
  errorMsg!: string;
  checkStatus() {
    return (
      this.consumer.consumerId != 0 && this.consumer.consumerId != undefined
    );
  }
  consumerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    city: new FormControl('', Validators.required),
    ctype: new FormControl('', [Validators.required]),
  });

  constructor(private billService: BillServiceService) {}

  onSubmit(data: any) {
    this.consumer.consumerName = data.name;
    this.consumer.area = data.area;
    this.consumer.city = data.city;
    this.consumer.connectionType = data.ctype;
    this.billService
      .registerConsumer(this.consumer)
      .pipe(
        catchError((error) => {
          this.errorMsg = `Error: ${error.error.message}`;
          return of([]);
        })
      )
      .subscribe(
        (consumer) => (this.consumer = consumer as unknown as Consumer)
      );
    this.isHidden = true;
  }
  get getName() {
    return this.consumerForm.get('name');
  }

  get getArea() {
    return this.consumerForm.get('name');
  }

  get getCity() {
    return this.consumerForm.get('name');
  }
  get getType() {
    return this.consumerForm.get('name');
  }
  onBack() {
    this.isHidden = !this.isHidden;
    this.consumer = new Consumer(0, '', '', '', '');
  }
}
