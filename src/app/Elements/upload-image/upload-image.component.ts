import { Component } from "@angular/core";

@Component({
  selector: "app-upload-image",
  standalone: true,
  imports: [],
  templateUrl: "./upload-image.component.html",
  styleUrl: "./upload-image.component.css",
})
export class UploadImageComponent {
  imageUrl: string | ArrayBuffer | null =
    "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"; // Default image URL

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageUrl =
        "https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png"; // Reset to default image
    }
  }
}
