import { Component } from '@angular/core';
import { Sale } from 'src/app/_models/sale';
import { SaleService } from 'src/app/_services/sale.service';

@Component({
  selector: 'app-fetch-sale',
  templateUrl: './fetch-sale.component.html'
})
export class FetchSaleComponent {
  sale: Sale[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit() : void {
    this.saleService.getSale().subscribe((result: Sale[]) => (this.sale = result));
  }
}
