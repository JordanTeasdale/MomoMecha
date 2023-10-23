import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WishList } from '../_models/wishList';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private url = "wishList";
  constructor(private http: HttpClient) { }

  public getWishList() : Observable<WishList[]> {
    return this.http.get<WishList[]>(`${environment.baseUrl}/${this.url}`);
  }
  public createWishList(wishlist: WishList) : Observable<WishList[]> {
    return this.http.post<WishList[]>(`${environment.baseUrl}/${this.url}`, wishlist);
  }
  public deleteWishList(wishlist: WishList): Observable<WishList[]> {
    return this.http.delete<WishList[]>(
      `${environment.baseUrl}/${this.url}/${wishlist.id}`
    );
  }
}
