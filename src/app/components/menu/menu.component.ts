import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '@components/menu-item/menu-item.component';
import { APP_ROUTES } from '@constants';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgIf, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Dashboard',
            routerLink: APP_ROUTES.DASHBOARD,
          },
          {
            label: 'Profile',
            routerLink: APP_ROUTES.PROFILE,
            routerLinkActiveOptions: {
              paths: 'subset',
              queryParams: 'ignored',
              matrixParams: 'ignored',
              fragment: 'ignored',
            },
          },
          {
            label: 'Billing',
            routerLink: APP_ROUTES.BILLING,
          },
          {
            label: 'FAQ',
            routerLink: APP_ROUTES.FAQ,
          },
          {
            label: 'Contact Us',
            routerLink: APP_ROUTES.CONTACT_US,
          },
        ],
      },
    ];
  }
}
