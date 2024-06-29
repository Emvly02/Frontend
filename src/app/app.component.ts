import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, SidenavComponent, DashboardComponent]
})
export class AppComponent {
  title = 'Frontend';
  showSidenar: boolean = true;

  // Abonniert Ereignisse des Routers, um Änderungen in der Navigation zu überwachen
  // Überprüft, ob das Ereignis das Ende einer Navigation darstellt
  // Die Sidenar wird ausgeblendet, wenn die URL '/login' oder '/register' ist
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSidenar = !['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
