import { Component } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';

@Component({
  selector: 'app-admin-componets',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './admin-componets.component.html',
  styleUrl: './admin-componets.component.css',
})
export class AdminComponetsComponent {}
