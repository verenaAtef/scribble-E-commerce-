import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  menuVisible: boolean = false;
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
  constructor(private router: Router, private authService: AuthService) {}
  logout(): void {
    console.log("logout");
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(["/login"]); // Navigate to the login page or any other desired route
  }
}
