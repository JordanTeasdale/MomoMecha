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

  series: string[] = [];
  grades: string[] = [];
  scales: string[] = [];

  constructor(private gundamService: GundamService) {}

  ngOnInit(): void {
    this.series = [
      'Universal Century',
      'Witch From Mercury',
      'IBO',
      'Build Fighters/Divers',
      'Gundam Wing',
      'Gundam Seed',
      'Gundam 00',
      'Gundam Thunderbolt',
      'G Gundam',
      'Gundam Age',
      'Gundam F91'
    ];
    this.grades = [
      'MG',
      'RG',
      'PG',
      'HG',
      'SD',
      'RE',
      'Entry'
    ];
    this.scales = [
      '1/144',
      '1/100',
      '1/60',
      '1/72'
    ];
  }

  createGundam(gundam: Gundam) {
      this.gundamService
        .createGundam(gundam)
        .subscribe((newGundam: Gundam[]) => this.gundamsUpdated.emit(newGundam));
  }
}
