import { Component, Input } from '@angular/core';
import { FavUser } from 'src/app/_models/favUser';
import { FavUserService } from 'src/app/_services/fav-user.service';

import { Gundam } from 'src/app/_models/gundam';
import { Backlog } from 'src/app/_models/backlog';
import { WishList } from 'src/app/_models/wishList';

import { GundamService } from 'src/app/_services/gundam.service';
import { BacklogService } from 'src/app/_services/backlog.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html'
})
export class FetchUserComponent {
  @Input() favUser?: FavUser;

  userName: string = "";
  favUsers: FavUser[] = [];
  gundams: Gundam[] = [];
  backlogs: Backlog[] = [];
  wishlist: WishList[] = [];

  constructor(private gundamService: GundamService, private backlogService: BacklogService, private wishlistService: WishlistService, private favUserService: FavUserService) {}

  ngOnInit() : void {
    this.favUserService.getFavUser().subscribe((result: FavUser[]) => (this.favUsers = result));
  }

  createFavUser() {
    let newFavUser: FavUser = { userName: this.userName };
    this.favUserService.createFavUser(newFavUser).subscribe((result: FavUser[]) => {
      this.favUsers = result;
    });
  }

  deleteFavUser(favUser: FavUser) {
    if (window.confirm('Mobile Suit Pilot, do you truly wish to annihilate this target?')) {
      this.favUserService
        .deleteFavUser(favUser)
        .subscribe((favUsers: FavUser[]) => (this.favUsers = favUsers));
    }
  }

  search() {
    this.gundamService.getUserGundam(this.userName).subscribe((result: Gundam[]) => (this.gundams = result));
    this.backlogService.getUserBacklog(this.userName).subscribe((result: Backlog[]) => (this.backlogs = result));
    this.wishlistService.getUserWishList(this.userName).subscribe((result: Gundam[]) => (this.wishlist = result));
  }
}
