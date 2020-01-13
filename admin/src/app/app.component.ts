import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
  <app-gallery></app-gallery>`,
  styles: []
})
export class AppComponent {
  title = 'admin';
}
