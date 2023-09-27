import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public backlog: Gundams[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Gundams[]>(baseUrl + 'gundams').subscribe(result => {
      this.backlog = result;
    }, error => console.error(error));
  }
}

interface Gundams {
  name: string;
  series: string;
  grade: string;
  scale: number;
}
