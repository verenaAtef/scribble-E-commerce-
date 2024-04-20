import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { SharedServiceService } from "../../Services/shared-service.service";
import { AdminserviceService } from "../../Services/adminservice.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-dash-board",
  standalone: true,
  imports: [SideNavComponent, CommonModule, FormsModule],
  templateUrl: "./dash-board.component.html",
  styleUrl: "./dash-board.component.css",
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
export class DashBoardComponent implements OnInit {
  allUsers: any[] = [];
  baseUrl = "https://scrippleback.onrender.com";
  constructor(
    private sharedService: SharedServiceService,
    private adminrService: AdminserviceService
  ) {}
  ngOnInit(): void {
    this.adminrService.getAllUsers().subscribe((data) => {
      for (let i = 0; i < 3; i++) {
        this.allUsers.push(data[i]);
      }
      console.log(this.allUsers);
    });
  }
  getImageUrl(imageFilename: string): string {
    if (!imageFilename) {
      // If imageFilename is empty or null, return the default image URL
      return "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png";
    } else {
      // If imageFilename is provided, return the full URL based on the base URL and image filename
      return `${this.baseUrl}/${imageFilename}`;
    }
  }
}
