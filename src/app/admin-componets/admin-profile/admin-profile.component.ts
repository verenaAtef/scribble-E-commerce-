import { Component, NgModule } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../Services/user.service";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../../Elements/navbar/navbar.component";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { AdminserviceService } from "../../Services/adminservice.service";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-admin-profile",
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: "./admin-profile.component.html",
  styleUrl: "./admin-profile.component.css",
  animations: [
    trigger("paintStrokeAnimation", [
      transition("void => *", [
        animate(
          "1s",
          keyframes([
            style({ opacity: 0, transform: "scale(0.3)", offset: 0 }),
            style({ opacity: 0.5, transform: "scale(1.2)", offset: 0.5 }),
            style({ opacity: 1, transform: "scale(1)", offset: 1.0 }),
          ])
        ),
      ]),
      transition("* => void", [
        animate(
          "0.5s",
          keyframes([
            style({ opacity: 1, transform: "scale(1)", offset: 0 }),
            style({ opacity: 0.5, transform: "scale(1.2)", offset: 0.5 }),
            style({ opacity: 0, transform: "scale(0.5)", offset: 1.0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class AdminProfileComponent {
  userId: any; // Assuming userId is of type string, adjust as necessary
  adminProfile: any; // Adjust the type as per your profile data structure
  btn_img = "assets/images/Admin-img";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminProfileService: AdminserviceService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem("id");

    if (this.userId) {
      this.adminProfileService
        .getAdminProfile(this.userId)
        .subscribe((data) => {
          this.adminProfile = data;
          console.log(this.adminProfile);
        });
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
