import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AdminserviceService } from "../../Services/adminservice.service";

import { FormsModule, NgModel } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SideNavComponent } from "../side-nav/side-nav.component";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
@Component({
  selector: "app-show-users",
  standalone: true,
  imports: [CommonModule, SideNavComponent, RouterModule, FormsModule],
  templateUrl: "./show-users.component.html",
  styleUrl: "./show-users.component.css",
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
  encapsulation: ViewEncapsulation.None,
})
export class ShowUsersComponent {
  allUsers: any;
  baseUrl = "https://scrippleback.onrender.com";
  sortBy = " ";
  getImageUrl(imageFilename: string): string {
    if (!imageFilename) {
      // If imageFilename is empty or null, return the default image URL
      return "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png";
    } else {
      // If imageFilename is provided, return the full URL based on the base URL and image filename
      return `${this.baseUrl}/${imageFilename}`;
    }
  }
  constructor(
    private adminrService: AdminserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.adminrService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
    });
  }

  deleteUser(userId: any) {
    this.allUsers = this.allUsers.filter((user: any) => user._id !== userId);

    this.adminrService
      .deleteUser(userId)
      .then(() => {
        console.log("User deleted successfully from backend.");
      })
      .catch((error) => {
        console.error("Error deleting user from backend:", error);
      });
  }

  editUser() {}
  ///  delete
  sortAllProducts(): void {
    this.adminrService.sortAllUsers(this.sortBy).subscribe((data) => {
      this.allUsers = data;
    });
  }
  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.sortAllProducts();
  }
  filterUsers(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;

    if (category === "") {
      this.adminrService.getAllUsers().subscribe(
        (users: any[]) => {
          console.log(users);
          this.allUsers = users;
        },
        (error) => {
          console.error("Error retrieving all users:", error);
        }
      );
    } else {
      this.adminrService.filterUsers(category).subscribe(
        (users: any[]) => {
          console.log(users);
          this.allUsers = users;
        },
        (error) => {
          console.error("Error filtering users:", error);
        }
      );
    }
  }
}
