import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

import { TransactionService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/models/transaction.model';
import { ERROR_TYPE } from 'src/app/utils/ERRORS_TYPE.enum';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { ContactUserInterface } from 'src/app/interfaces/contact_user.interface';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  // userForm!: FormGroup;
  users: UserInterface[] = [];
  contacts: ContactUserInterface[] = [];

  public transaction!: Transaction;

  public form_submitted = false;
  public form_submitted_code = false;

  send_email: boolean = true;
  send_codigo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly contactUserService: ContactsService
  ) {}

  // public userForm = this.fb.group({
  //   selectedUserId: [''], // Este campo contendrá el ID del usuario seleccionado
  // });

  public transactionForm = this.fb.group({
    // email: ['', [Validators.email]],
    amount: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    email: [''],
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

    // Obtiene el valor de selectedUserId desde el formulario
    // const selectedUserId = this.transactionForm.get('email')?.value;

    // Otros datos del formulario, como monto, descripción, etc.
    // const transactionData = {
    //   email: selectedUserId, // Agrega el usuario seleccionado al objeto de datos de la transacción
    //   // Otras propiedades del formulario
    // };

    this.transactionService
      .new_transaction_by_email(this.transactionForm?.value)
      .subscribe(
        (resp: any) => {
          //  this.transactionForm.get('selectedUserId')?.value;
          console.log('DATOS ENVIADOS', resp);

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

    this.contactUserService
      .getContactsUser()
      .subscribe((contacts: any) => {
        // if (contacts.response.statusCode === ERROR_TYPE.NOTFOUND) {
        //   console.log('MENSAJE', contacts.response.message);
        // }
        // console.log('ERROR', contacts.response)
        console.log('LISTA DE CONTACTOS', contacts)
        this.contacts = contacts;
      });

    // this.userService.getUsers().subscribe((users: UserInterface[]) => {
    //   // console.log('users', users);
    //   this.users = users;
    // });
  }

  onUserSelectionChange(event: any) {
    // Obtiene el valor seleccionado del evento
    const selectedUserId = event.target.value;

    // Actualiza el valor de selectedUserId en el formulario
    this.transactionForm.get('email')?.setValue(selectedUserId);
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
