import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { LayoutService } from '@services/layout/layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(public layoutService: LayoutService) {}

  get containerClass() {
    return {
      'layout-light': this.layoutService.config().colorScheme === 'light',
      'layout-primarycolor-menu': this.layoutService.config().menuTheme === 'primaryColor',
      'layout-overlay': this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-slim': this.layoutService.config().menuMode === 'slim',
      'layout-slim-plus': this.layoutService.config().menuMode === 'slim-plus',
      'layout-horizontal': this.layoutService.config().menuMode === 'horizontal',
      'layout-reveal': this.layoutService.config().menuMode === 'reveal',
      'layout-drawer': this.layoutService.config().menuMode === 'drawer',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config().inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config().ripple,
      'layout-sidebar-active': this.layoutService.state.sidebarActive,
      'layout-sidebar-anchored': this.layoutService.state.anchored,
    };
  }
}
