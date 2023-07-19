import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { TransactionService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  public form_submitted = false;


  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ){}

  public transactionForm = this.fb.group({
    receiver: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    comment: ['', [Validators.required]]
  });

  new_transaction(){

    this.form_submitted = true
    console.log(this.transactionForm.value);

    if(this.transactionForm.invalid){
      return;
    }

    this.transactionService.new_transaction(this.transactionForm?.value)
    .subscribe((resp: any) => {
      console.log(resp)

      if(resp.status === 400){
        swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${resp.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        console.log('TRANSACCION ENVIADA');
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${resp.message}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
      

    }, (err) => {
      //Si sucede un error
      console.warn(err)
      swal.fire('Error', 'err0r', 'error')
    })
  }

}
