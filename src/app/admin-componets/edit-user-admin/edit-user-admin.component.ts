import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminserviceService } from "../../Services/adminservice.service";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "../../Elements/image-upload/image-upload.component";
import { UploadImageComponent } from "../../Elements/upload-image/upload-image.component";
import { switchMap } from "rxjs";
import { blob } from "stream/consumers";
import { ToastrService } from "ngx-toastr";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-edit-user-admin",
  standalone: true,
  imports: [
    SideNavComponent,
    CommonModule,
    UploadImageComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: "./edit-user-admin.component.html",
  styleUrl: "./edit-user-admin.component.css",
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
export class EditUserAdminComponent {
  userId: any;
  editProfile: FormGroup;
  Image: any;

  userName: any;
  role: any;
  Email: any;
  isActive: any;
  baseUrl = "https://scrippleback.onrender.com";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminserviceService,
    private readonly toast: ToastrService
  ) {
    this.userId = this.route.snapshot.params["id"];
    this.editProfile = new FormGroup({
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
      role: new FormControl("user"),
      isActive: new FormControl(true),
      Image: new FormControl(["", Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  getImageUrl() {
    console.log("this.Image:", this.Image);
    if (!this.Image) {
      return "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png";
    } else {
      return `${this.baseUrl}/${this.Image}`;
    }
  }

  async getUserDetails(): Promise<void> {
    try {
      const userData = await this.adminService
        .getUserById(this.userId)
        .toPromise();
      if (userData && userData.userName && userData.Email) {
        this.editProfile.patchValue({
          userName: userData.userName,
          Email: userData.Email,
          Password: userData.Password,
          isActive: userData.isActive,
          role: userData.role,
          Image: userData.Image,
        });
        this.Image = userData.Image;
      } else {
        console.error("Error: User data is missing or incomplete.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  async onSubmit(): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("userName", this.editProfile.get("userName")!.value);
      formData.append("Email", this.editProfile.get("Email")!.value);
      formData.append("role", this.editProfile.get("role")!.value);
      formData.append("isActive", this.editProfile.get("isActive")!.value);
      formData.append("Image", this.editProfile.get("Image")!.value);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await this.adminService.updateUser(
        this.userId,
        formData
      );
      console.log("User updated successfully:", response);
      this.toast.success("successful edit user");
      this.router.navigate(["/admin/users"]);
    } catch (error) {
      console.error("Error updating user:", error);
      this.toast.error("Failed to edit user");
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        // Update the value of the 'Image' form control with the selected file
        this.editProfile.patchValue({
          Image: file,
        });

        // Trigger validation and value updates for the 'Image' form control
        reader.readAsDataURL(file);
        this.editProfile.get("Image")?.markAsDirty();
        this.editProfile.get("Image")?.markAsTouched();
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  }

  reset() {
    this.editProfile.reset();
    this.Image = "";
  }
}
