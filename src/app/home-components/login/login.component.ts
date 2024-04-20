import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import axios from "axios";
import { AuthService } from "../../Services/auth.service";
import { ErrorHandlingServiceService } from "../../Services/error-handling-service.service";
import { ToastrService } from "ngx-toastr";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
// import { AuthService } from "../../Services/auth.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
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
export class LoginComponent {
  error: any;
  Email: any;
  Password: any;
  role: string = "user";
  passwordVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: ErrorHandlingServiceService,
    private readonly toast: ToastrService
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  regValidation = new FormGroup({
    Email: new FormControl(null, [
      Validators.pattern(
        "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@" +
          "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$"
      ),
      Validators.required,
    ]),
    Password: new FormControl(null, [
      Validators.pattern("^[a-zA-Z0-9]{8,}$"),
      Validators.required,
    ]),
  });

  get EmailValid() {
    return this.regValidation.controls["Email"].valid;
  }

  get PasswoedValid() {
    return this.regValidation.controls["Password"].valid;
  }
  login(): void {
    this.authService
      .login(this.Email, this.Password)
      .then(() => {
        console.log("Role:", this.authService.role); // Debug: Log the role
        if (this.authService.role === "admin") {
          console.log("admin");
          this.toast.success("Successful login");

          this.router.navigate(["/Homedashboard", this.authService.id]);
        } else this.router.navigate(["/userProfile", this.authService.id]);
      })
      .catch((error: { response: { data: { message: any } } }) => {
        this.error = error.response.data.message;
        this.toast.error("Failed login");
      });
  }
}
