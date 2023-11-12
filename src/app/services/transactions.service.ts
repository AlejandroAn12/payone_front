import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';
import { Transaction } from '../interfaces/transaction.interface';
import * as moment from 'moment';
import {format} from 'date-fns';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // private date = new Date();
  public timestamp = format(new Date(), 'yyyyMMdd_HHmmss'); // Genera un timestamp único en formato "YYYYMMDD_HHmmss"
  private pdfName = `transaccion_${this.timestamp}`; // Nombre del archivo PDF
  offset: number = 0;
  limit: number = 0;

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


  getAllTransactions(url :string){
    return this.http.get<any[]>(url);
  }

  getUserTransactions() {
    return this.http.get(`${base_url}/transactions/my-transaction?limit=${this.limit}&offset=${this.offset}`);
  }

  getTransactionByDateRange(startDate: string, endDate: string){
    return this.http.get(`${base_url}/transactions/my-transaction-date?startDate=${startDate}&endDate=${endDate}`);
  }

  getTransactionByID(id: string){
    return this.http.get(`${base_url}/transactions/id/${id}`)
  }

  getPDFTransactionById(id: string) {
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
