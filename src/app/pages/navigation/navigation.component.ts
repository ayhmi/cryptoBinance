import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export class SubMenuItem {
   constructor(public url: string, public icon: string, public itemName: string, public selected: boolean) {}
}

export class NavigationItem {
  constructor(public url: string, public safeurl: SafeUrl, public icon: string, public itemName: string, public selected: boolean, public submenus:Array<SubMenuItem>) {}
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})

export class NavigationComponent implements OnInit {
  navItems: NavigationItem[] =
  [
    new NavigationItem("#/pages/BTCUSDT", {},"icon-home", "BTCUSDT", true,[]),
    new NavigationItem("#/pages/ETHBTC", {},"icon-layers", "ETHBTC", false,[])
  ];

   constructor(private sanitizer: DomSanitizer) { }

   ngOnInit() {
      this.navItems.forEach(page => {
         page.safeurl = this.sanitizer.bypassSecurityTrustUrl(page.url);
      });

   }

   pageSelected(item: NavigationItem) {
      var current = this.navItems.find(x => x.selected == true);
      current.submenus.forEach(submenu => {
         submenu.selected = false;
      });

      current.selected = false;
      item.selected=true;
   }

   submenuSelected(item: NavigationItem, submenu : SubMenuItem) {
      item.submenus.forEach(page => {
         page.selected = false;
         });
      item.selected=true;
      submenu.selected=true;
   }
}
