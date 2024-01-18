import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '@services/router/router.service';

@Component({
  selector: 'app-back-link',
  standalone: true,
  imports: [],
  templateUrl: './back-link.component.html',
  styleUrl: './back-link.component.scss',
})
export class BackLinkComponent {
  @Output() handleBack = new EventEmitter();
  @Input() backTo: string | undefined;
  @Input() defaultBackTo: string | undefined;
  @Input() title = '';

  constructor(
    private location: Location,
    private router: Router,
    private routerService: RouterService
  ) {}

  onClick() {
    if (this.handleBack.observers.length) {
      this.handleBack.emit();
    } else if (this.backTo) {
      this.router.navigate([this.backTo]);
    } else if (this.routerService.hasBack) {
      this.location.back();
    } else {
      this.router.navigate([this.defaultBackTo]);
    }
  }
}
