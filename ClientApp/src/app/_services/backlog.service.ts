import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Backlog } from '../_models/backlog';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private url = "backlog";
  constructor(private http: HttpClient) { }

  public getBacklog() : Observable<Backlog[]> {
    return this.http.get<Backlog[]>(`${environment.baseUrl}/${this.url}`);
  }
  public getUserBacklog(userName: string) : Observable<Backlog[]> {
    return this.http.get<Backlog[]>(`${environment.baseUrl}/${this.url}/${userName}`);
  }
  public createBacklog(backlog: Backlog) : Observable<Backlog[]> {
    return this.http.post<Backlog[]>(`${environment.baseUrl}/${this.url}`, backlog);
  }
  public deleteBacklog(backlog: Backlog): Observable<Backlog[]> {
    return this.http.delete<Backlog[]>(
      `${environment.baseUrl}/${this.url}/${backlog.id}`
    );
  }
}
