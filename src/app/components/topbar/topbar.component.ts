import { Component } from '@angular/core';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  constructor(public titleService: TitleService) {}
}
