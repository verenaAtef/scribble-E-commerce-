import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Route, Router, RouterModule } from "@angular/router";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-side-nav",
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: "./side-nav.component.html",
  styleUrl: "./side-nav.component.css",
})
export class SideNavComponent {
  constructor(private router: Router, private authService: AuthService) {}
  logout(): void {
    console.log("logout");
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(["/login"]); // Navigate to the login page or any other desired route
  }
}
