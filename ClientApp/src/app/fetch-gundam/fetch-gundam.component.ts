import { Component } from '@angular/core';
import { Gundam } from '../models/gundam';
import { GundamService } from '../services/gundam.service';

@Component({
  selector: 'app-fetch-gundam',
  templateUrl: './fetch-gundam.component.html'
})
export class FetchGundamComponent {
  gundam: Gundam[] = [];
  gundamToEdit?: Gundam;

  constructor(private gundamService: GundamService) {}

  ngOnInit() : void {
    this.gundamService.getGundam().subscribe((result: Gundam[]) => (this.gundam = result));
  }

  updateGundamList(gundam: Gundam[]) {
    this.gundam = gundam;
  }

  initNewGundam() {
    this.gundamToEdit = new Gundam();
  }

  editGundam(gundam: Gundam) {
    this.gundamToEdit = gundam;
  }
}
