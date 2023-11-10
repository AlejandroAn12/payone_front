import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Egresos } from 'src/app/interfaces/egresos.interface';
import { Ingresos } from 'src/app/interfaces/ingresos.interface';
import { Transaction } from 'src/app/interfaces/transaction.interface';
import { Balance } from 'src/app/models/balance.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { TransactionService } from 'src/app/services/transactions.service';
import { ERROR_TYPE } from 'src/app/utils/ERRORS_TYPE.enum';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
  hidden_transaction = false;

  public balance!: Balance;
  public transactions!: Transaction;
  public count: number = 0;
  public egresos: Egresos[] = [];
  public ingresos: Ingresos[] = [];
  public user!: User;
  public data: Transaction[] = [];
  limit : number = 4;
  offset : number = 0;
  startDate !: string;
  endDate !: string;

  opcionSeleccionada: string = 'all';
  datos: any;

  opcionesUrl: { [key: string]: string }  = 
    {
    all: `${base_url}/transactions/my-transaction?limit=${this.limit}&offset=${this.offset}`,
    egresos: `${base_url}/transactions/my-transaction-outgoing`,
    ingresos: `${base_url}/transactions/my-transaction-incoming`
    };

  constructor(
    private balanceService: BalanceService,
    private transactionService: TransactionService,
    private readonly authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.user = authService.user;
  }

  ngOnInit(): void {
    
    // this.getAllTransactions();
    this.cargarDatos();
    this.findByDate();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      //TODO: PILAS
      // this.downloadPdf(id);
    });
    // this.getAllTransactions();
    this.balanceService.getBalanceUserLogged().subscribe(
      (resp: any) => {
        // console.log('BALANCE', resp)
        this.balance = resp.balance;
      },
      (error) => {
        console.log(error);
      }
    );
    // throw new Error('Method not implemented.');
  }

  cargarDatos() {
    const url = this.opcionesUrl[this.opcionSeleccionada];
    this.transactionService.getAllTransactions(url)
      .subscribe((data: any) => {
        console.log('DATOS OPCION', data)
        if (
            data.transactions.length === 0
          ) {
            this.hidden_transaction = true;
          }

        this.datos = data.transactions;
      });
  }

  findByDate(){
    const params = {startDate: this.startDate, endDate: this.endDate};
    this.transactionService.getTransactionByDateRange(params.startDate, params.endDate).subscribe((results: any) => {
      
      // console.log('DATE', results.transactions.message);
      if(results.transactions.status === ERROR_TYPE.NOTFOUND){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `${results.transactions.name}`,
          text: `${results.transactions.message}`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
      this.datos = results.transactions;
    },(err) => {
      console.error(err)
      // this.loading = false;
      // Swal.fire('Error', err.error, 'error');
    })
  }


//   getAllTransactions() {
//     this.transactionService.getUserTransactions().subscribe((data: any) => {

//       if (
//         data.transactions.length === 0
//       ) {
//         this.hidden_transaction = true;
//       }

//       this.data = data.transactions;
//     });
//   }

  //TODO: HABILITAR CUANDO SE SELCIONE POR ID DE TRANSACCION
  // downloadPdf(transactionId: string): void {
  //   // Realiza una llamada HTTP para obtener el PDF del backend
  //   this.transactionService.downloadPdf(transactionId);
  // }
}
