import { Component } from '@angular/core';
import { Gundam } from '../../_models/gundam';
import { GundamService } from '../../_services/gundam.service';

@Component({
  selector: 'app-fetch-gundam',
  templateUrl: './fetch-gundam.component.html'
})
export class FetchGundamComponent {
  gundams: Gundam[] = [];
  gundamToEdit?: Gundam;

  constructor(private gundamService: GundamService) {}

  ngOnInit() : void {
    this.gundamService.getGundam().subscribe((result: Gundam[]) => (this.gundams = result));
  }

  updateGundamList(newGundam: Gundam[]) {
    this.gundams = newGundam;
    window.location.reload()
  }

  toggleEditForm() {
    if (this.gundamToEdit) {
      this.gundamToEdit = undefined;
    } else {
      this.gundamToEdit = new Gundam();
    }
  }

  deleteGundam(gundam: Gundam) {
    if (window.confirm('Mobile Suit Pilot, do you truly wish to annihilate this target?')) {
      this.gundamService
        .deleteGundam(gundam)
        .subscribe((gundams: Gundam[]) => (this.gundams = gundams));
    }
  }
}
