import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { TransactionService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/transaction.model';
import { ERROR_TYPE } from 'src/app/utils/ERRORS_TYPE.enum';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  public transaction!: Transaction;

  public form_submitted = false;
  public form_submitted_code = false;

  send_email: boolean = true;
  send_codigo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {}

  public transactionForm = this.fb.group({
    email: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });

  public transactionFormCode = this.fb.group({
    code: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });

  send_transfer_email() {
    this.form_submitted = true;
    // console.log(this.transactionForm.value);

    if (this.transactionForm.invalid) {
      return;
    }

    this.transactionService
      .new_transaction_by_email(this.transactionForm?.value)
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (
            resp.status === ERROR_TYPE.UNAUTHORIZED ||
            resp.status === ERROR_TYPE.BADREQUEST ||
            resp.status === ERROR_TYPE.NOTFOUND
          ) {
            swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `${resp.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log('TRANSACCION ENVIADA');
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${resp.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        (err) => {
          //Si sucede un error
          console.warn(err);
          swal.fire('Error', 'err0r', 'error');
        }
      );
  }

  send_transfer_by_code() {
    this.form_submitted_code = true;
    // console.log(this.transactionForm.value);

    if (this.transactionFormCode.invalid) {
      return;
    }

    this.transactionService
      .new_transaction_by_code(this.transactionFormCode?.value)
      .subscribe(
        (resp: any) => {
          console.log(resp);

          if (
            resp.status === ERROR_TYPE.UNAUTHORIZED ||
            resp.status === ERROR_TYPE.BADREQUEST ||
            resp.status === ERROR_TYPE.NOTFOUND
          ) {
            swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `${resp.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            console.log('TRANSACCION ENVIADA');
            swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `${resp.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        (err) => {
          //Si sucede un error
          console.warn(err);
          swal.fire('Error', 'err0r', 'error');
        }
      );
  }

  ngOnInit(): void {
    this.transactionService.getUserTransactions().subscribe(
      (resp: any) => {},
      (error) => {
        console.log(error);
      }
    );
    // throw new Error('Method not implemented.');
  }

  toggleFormulario(formulario: string) {
    if (formulario === 'send_email') {
      this.send_email = true;
      this.send_codigo = false;
    } else if (formulario === 'send_codigo') {
      this.send_email = false;
      this.send_codigo = true;
    }
  }
}
