import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Backlog } from 'src/app/_models/backlog';
import { BacklogService } from 'src/app/_services/backlog.service';

@Component({
  selector: 'app-edit-backlog',
  templateUrl: './edit-backlog.component.html'
})
export class EditBacklogComponent implements OnInit {
  @Input() backlog?: Backlog;
  @Output() backlogsUpdated = new EventEmitter<Backlog[]>();

  series: string[] = [];
  grades: string[] = [];
  scales: string[] = [];

  constructor(private backlogService: BacklogService) {}

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

  createBacklog(backlog: Backlog) {
    this.backlogService
      .createBacklog(backlog)
      .subscribe((newBacklog: Backlog[]) => this.backlogsUpdated.emit(newBacklog));
  }
}

