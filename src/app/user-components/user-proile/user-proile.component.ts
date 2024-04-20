import { Component, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../Services/user.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UpperNavComponent } from "../../Elements/upper-nav/upper-nav.component";

@Component({
  selector: "app-user-proile",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, UpperNavComponent],
  templateUrl: "./user-proile.component.html",
  styleUrl: "./user-proile.component.css",
})
export class UserProileComponent {
  @Output() userProfile: any;
  image: any;
  userId: any;
  constructor(
    private route: ActivatedRoute,
    private userProfileService: UserService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params["id"];
    this.userProfileService.getUserProfile(this.userId).subscribe((data) => {
      this.userProfile = data;
      console.log(this.userProfile);
    });
    this.image = this.image
      ? this.userProfile.image
      : "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png";
  }
}
