import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Gundam } from '../../_models/gundam';
import { GundamService } from '../../_services/gundam.service';

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
      'RE/100',
      'FM',
      'EG'
    ];
    this.scales = [
      '1/144',
      '1/100',
      '1/60',
      '1/72',
      '1/48'
    ];
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.gundam!.imageUrl = file;
  }

  createGundam(gundam: Gundam) {
    const formData = new FormData();
    formData.append('name', gundam.name);
    formData.append('series', gundam.series);
    formData.append('grade', gundam.grade);
    formData.append('scale', gundam.scale);

    if (gundam.imageUrl) {
      formData.append('file', gundam.imageUrl, gundam.imageUrl.name);
    }

    this.gundamService
      .createGundam(formData)
      .subscribe((newGundam: Gundam[]) => this.gundamsUpdated.emit(newGundam));
  }
}
