import { CommonModule } from "@angular/common";
import { UploadImageComponent } from "../../Elements/upload-image/upload-image.component";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  NgModel,
  ReactiveFormsModule,
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update-user-profile",
  standalone: true,
  imports: [
    UploadImageComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./update-user-profile.component.html",
  styleUrl: "./update-user-profile.component.css",
})
export class UpdateUserProfileComponent {
  userName: string = "SamahSalah";
  Email: string = `samah@sjg.com`;
  Age: number = 24;
  Password: string = "samahsalah";
  Phone: number = 1004283651;

  editadmin = {
    userName: this.userName,
    Email: this.Email,
    Age: this.Age,
    Password: this.Password,
    Phone: this.Phone,
  };

  editProfile = new FormGroup({
    userName: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z]{3,}$"),
    ]),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Phone: new FormControl("", [Validators.pattern("^01[0-2]\\d{1,8}$")]),
    Age: new FormControl("", [Validators.min(4), Validators.max(80)]),
    Password: new FormControl("", [
      Validators.minLength(4),
      Validators.maxLength(30),
    ]),
  });

  get Namevalid() {
    return this.editProfile.controls["userName"].valid;
  }

  get Emailvalid() {
    return this.editProfile.controls["Email"].valid;
  }

  get Phonevalid() {
    return this.editProfile.controls["Phone"].valid;
  }

  get Agevalid() {
    return this.editProfile.controls["Age"].valid;
  }

  get Passwordvalid() {
    return this.editProfile.controls["Password"].valid;
  }
  reset() {
    this.userName = "";
    this.Email = ``;
    this.Age = 0;
    this.Password = "";
    this.Phone = 0;
    console.log("resert");
  }
  constructor(private readonly toast: ToastrService) {}

  upload() {
    window.confirm("do tou want to upped data");
  }
}
