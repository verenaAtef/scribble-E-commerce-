import { Component } from "@angular/core";
import { AdminserviceService } from "../../Services/adminservice.service";
import { Router } from "@angular/router";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [SideNavComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: "./add-user.component.html",
  styleUrl: "./add-user.component.css",
  animations: [
    trigger("paintStrokeAnimation", [
      transition("void => *", [
        animate(
          "1s",
          keyframes([
            style({ opacity: 0, transform: "scale(0.5)", offset: 0 }),
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
export class AddUserComponent {
  User = {
    userName: "",
    Email: "",
    Password: "",
    Image: "",
  };

  constructor(
    private adminservice: AdminserviceService,
    private router: Router,
    private readonly toast: ToastrService
  ) {}

  async onSubmit() {
    try {
      const formData = new FormData();
      formData.append("userName", this.User.userName);
      formData.append("Email", this.User.Email);
      formData.append("Password", this.User.Password);
      if (this.User.Image) {
        formData.append("Image", this.User.Image);
      }
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await this.adminservice.addUser(formData);
      console.log("Product added successfully:", response);
      this.toast.success("Successful,you added new user");
      this.router.navigate(["admin/users"]);
    } catch (error) {
      console.error("Error adding product:", error);
      this.toast.error("Failed to add user,Check validation");
    }
  }

  onFileSelected(event: any) {
    this.User.Image = event.target.files[0];
  }
}
