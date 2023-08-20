import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { Transaction } from '../interfaces/transaction.interface';
import { Observable, timestamp } from 'rxjs';


const base_url = environment.base_url;




@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private date = new Date();
  private timestamp = this.date.getMilliseconds(); // Formato de fecha y hora
    private pdfName = `transaccion_${this.timestamp}.pdf`; // Nombre del archivo PDF

  private transaction!: Transaction;

  constructor(private router: Router, private http: HttpClient) {}

  new_transaction_by_email(formData: Transaction) {
    return this.http.post(`${base_url}/transactions/new-transaction`, formData);
  }

  new_transaction_by_code(formData: Transaction) {
    return this.http.post(
      `${base_url}/transactions/new-transaction-code`,
      formData
    );
  }

  getUserTransactions() {
    return this.http.get(`${base_url}/transactions/my-transaction`);
  }

  getTransactionById(id: string) {
    return this.http.get(`${base_url}/transactions/${id}/download`);
  }

  downloadPdf(transactionId: string) {
    const url = `${base_url}/transactions/${transactionId}/download`;
    this.http.get(url, { responseType: 'blob' }).subscribe((response) => {
      this.descargarArchivo(response);
    });
  }

  private descargarArchivo(response: Blob) {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.pdfName}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
