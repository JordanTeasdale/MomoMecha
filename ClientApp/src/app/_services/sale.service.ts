import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sale } from '../_models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private url = "sale";
  constructor(private http: HttpClient) { }

  public getSale() : Observable<Sale[]> {
    return this.http.get<Sale[]>(`${environment.baseUrl}/${this.url}`);
  }
}
