import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gundam } from '../models/gundam';

@Injectable({
  providedIn: 'root'
})
export class GundamService {
  private url = "gundams";
  constructor(private http: HttpClient) { }

  public getGundam() : Observable<Gundam[]> {
    return this.http.get<Gundam[]>(`${environment.baseUrl}/${this.url}`);
  }
  public createGundam(formData: FormData) : Observable<Gundam[]> {
    return this.http.post<Gundam[]>(`${environment.baseUrl}/${this.url}`, formData);
  }
  public deleteGundam(gundam: Gundam): Observable<Gundam[]> {
    return this.http.delete<Gundam[]>(
      `${environment.baseUrl}/${this.url}/${gundam.id}`
    );
  }
}
