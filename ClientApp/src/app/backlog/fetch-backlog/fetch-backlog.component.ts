import { Component } from '@angular/core';
import { Backlog } from 'src/app/_models/backlog';
import { BacklogService } from 'src/app/_services/backlog.service';

@Component({
  selector: 'app-fetch-backlog',
  templateUrl: './fetch-backlog.component.html'
})
export class FetchBacklogComponent {
  backlogs: Backlog[] = [];
  backlogToEdit?: Backlog;

  constructor(private backlogService: BacklogService) {}

  ngOnInit() : void {
    this.backlogService.getBacklog().subscribe((result: Backlog[]) => (this.backlogs = result));
  }

  updateBacklogList(newBacklog: Backlog[]) {
    this.backlogs = newBacklog;
    window.location.reload()
  }

  toggleEditForm() {
    if (this.backlogToEdit) {
      this.backlogToEdit = undefined;
    } else {
      this.backlogToEdit = new Backlog();
    }
  }

  deleteBacklog(backlog: Backlog) {
    if (window.confirm('Mobile Suit Pilot, do you truly wish to annihilate this target?')) {
      this.backlogService
        .deleteBacklog(backlog)
        .subscribe((backlogs: Backlog[]) => (this.backlogs = backlogs));
    }
  }
}
