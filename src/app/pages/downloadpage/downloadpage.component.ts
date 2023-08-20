import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-downloadpage',
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.css'],
})
export class DownloadpageComponent {
  constructor(private transactionService: TransactionService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.downloadPdf(id);
    });
  }

  downloadPdf(id: string): void {
    // Realiza una llamada HTTP para obtener el PDF del backend
    this.transactionService.getTransactionById(id);
  }
}
