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
    new NavigationItem("#/pages/dashboard", {},"icon-home", "Dashboard", true,[]),
    new NavigationItem("#/pages/items", {},"icon-layers", "Items", false,[]),
    new NavigationItem("javascript:;", {},"icon-list", "Products", false,
                     [
                        new SubMenuItem("#/pages/product/list", "icon-eye","View", false),
                        new SubMenuItem("#/pages/product/edit", "icon-pencil","Edit", false)
                     ]),
    new NavigationItem("#/pages/charts", {},"icon-chart", "Charts", false,[]),
    new NavigationItem("#/pages/reports", {},"icon-doc", "Reports", false,[]),
    new NavigationItem("#/pages/settings", {},"icon-settings", "Settings", false,[]),
    new NavigationItem("#/pages/profile", {},"icon-user", "Profile", false,[])
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
