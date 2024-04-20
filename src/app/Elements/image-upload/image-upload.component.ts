import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-image-upload',
    standalone:true,
    imports:[CommonModule],
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  imageUrl: string = '';
  @Output() imageChanged = new EventEmitter<string>();

  previewImage(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      const reader = new FileReader();

      reader.onload = () => {
          this.imageUrl = reader.result as string;
          this.imageChanged.emit(this.imageUrl); 
      };

      if (file) {
          reader.readAsDataURL(file);
      }
  }
}











