import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WishList } from 'src/app/_models/wishList';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-edit-wishlist',
  templateUrl: './edit-wishlist.component.html'
})
export class EditWishlistComponent implements OnInit {
  @Input() wishlist?: WishList;
  @Output() wishListUpdated = new EventEmitter<WishList[]>();

  series: string[] = [];
  grades: string[] = [];
  scales: string[] = [];

  constructor(private wishListService: WishlistService) {}

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

  createWishList(wishList: WishList) {
    this.wishListService
      .createWishList(wishList)
      .subscribe((newWishList: WishList[]) => this.wishListUpdated.emit(newWishList));
  }
}
