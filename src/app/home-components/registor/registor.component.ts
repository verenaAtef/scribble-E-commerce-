import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../Services/auth.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import axios from "axios";
import { routes } from "../../app.routes";
import { ToastrService } from "ngx-toastr";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
@Component({
  selector: "app-registor",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: "./registor.component.html",
  styleUrl: "./registor.component.css",
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
  providers: [HttpClient],
})
export class RegistorComponent {
  userName: any;
  Email: any;
  Password: any;
  passwordVisible = false;

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  regValidation = new FormGroup({
    userName: new FormControl("samah", [Validators.required]),
    Email: new FormControl("hfhgf@bkjl.com", [
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
  get NameValid() {
    return this.regValidation.controls["userName"].valid;
  }
  get EmailValid() {
    return this.regValidation.controls["Email"].valid;
  }
  get PasswoedValid() {
    return this.regValidation.controls["Password"].valid;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly toast: ToastrService
  ) {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  signup() {
    const userData = {
      userName: this.userName,
      Email: this.Email,
      Password: this.Password,
    };

    console.log("hello");

    axios
      .post("https://scrippleback.onrender.com", userData)
      .then((response) => {
        console.log("Registration successful:", response.data.Email);
        const userId = response.data._id;
        console.log(userId);
        this.toast.success("Successful Register");
        this.router.navigate(["login"]);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        this.toast.error("failed register");
      });
  }
}

// ngOnInit(): void {}

// signup(): void {
//   const userData = {
//     userName: this.userName,
//     Email: this.Email,
//     Password: this.Password,
//   };

//   this.authService.signup(userData).subscribe(
//     (response) => {
//       console.log("Signup successful:", response);
//       console.log("samah sginup now");
//     },
//     (error) => {
//       console.error("Signup failed:", error);
//     }
//   );
// }
