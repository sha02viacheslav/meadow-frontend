import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from '@services/title/title.service';
import { MenuItem } from 'primeng/api';
import { APP_ROUTES } from '@constants';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet, TabMenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  routeItems: MenuItem[] = [];

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('PROFILE SETTINGS');

    this.routeItems = [
      { label: 'Account', routerLink: APP_ROUTES.ACCOUNT },
      { label: 'Password', routerLink: APP_ROUTES.PASSWORD },
      { label: 'Documents', routerLink: APP_ROUTES.DOCUMENTS },
    ];
  }
}
