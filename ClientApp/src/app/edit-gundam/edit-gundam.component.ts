import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gundam } from '../models/gundam';
import { GundamService } from '../services/gundam.service';

@Component({
  selector: 'app-edit-gundam',
  templateUrl: './edit-gundam.component.html'
})
export class EditGundamComponent implements OnInit {
  @Input() gundam?: Gundam;
  @Output() gundamsUpdated = new EventEmitter<Gundam[]>();

  constructor(private gundamService: GundamService) {}

  ngOnInit(): void { }

  createGundam(gundam: Gundam) {
      this.gundamService
        .createGundam(gundam)
        .subscribe((newGundam: Gundam[]) => this.gundamsUpdated.emit(newGundam));
  }
}
