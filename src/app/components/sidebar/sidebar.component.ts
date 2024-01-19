import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '@components/menu/menu.component';
import { LayoutService } from '@services/layout/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  timeout: ReturnType<typeof setTimeout> | null = null;

  @ViewChild('menuContainer') menuContainer!: ElementRef;
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef
  ) {}

  onMouseEnter() {
    if (!this.layoutService.state.anchored) {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.layoutService.state.sidebarActive = true;
    }
  }

  onMouseLeave() {
    if (!this.layoutService.state.anchored) {
      if (!this.timeout) {
        this.timeout = setTimeout(() => (this.layoutService.state.sidebarActive = false), 300);
      }
    }
  }

  anchor() {
    this.layoutService.state.anchored = !this.layoutService.state.anchored;
  }
}
