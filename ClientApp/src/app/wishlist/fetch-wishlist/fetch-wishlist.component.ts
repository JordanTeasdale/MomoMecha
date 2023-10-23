import { Component } from '@angular/core';
import { WishList } from 'src/app/_models/wishList';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-fetch-wishlist',
  templateUrl: './fetch-wishlist.component.html'
})
export class FetchWishlistComponent {
  wishlist: WishList[] = [];
  wishListToEdit?: WishList;

  constructor(private wishListService: WishlistService) {}

  ngOnInit() : void {
    this.wishListService.getWishList().subscribe((result: WishList[]) => (this.wishlist = result));
  }

  updateWishList(newWishList: WishList[]) {
    this.wishlist = newWishList;
    window.location.reload()
  }

  toggleEditForm() {
    if (this.wishListToEdit) {
      this.wishListToEdit = undefined;
    } else {
      this.wishListToEdit = new WishList();
    }
  }

  deleteWishList(wishList: WishList) {
    if (window.confirm('Mobile Suit Pilot, do you truly wish to annihilate this target?')) {
      this.wishListService
        .deleteWishList(wishList)
        .subscribe((wishLists: WishList[]) => (this.wishlist = wishLists));
    }
  }
}
