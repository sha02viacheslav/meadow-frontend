import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  public title = signal('');

  constructor() {}

  setTitle(title: string) {
    this.title.set(title);
  }
}
