import { NavbarComponent } from "./../../Elements/navbar/navbar.component";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
@Component({
  selector: "app-about",
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
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
export class AboutComponent {
  constructor() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  img = "assets/images/Admin-img.png";
  description = "Team Leader";
  name = "Samah Salah";
  images = [
    {
      url: "assets/images/Mask group (1).png",
      name: "Sarah Hassan",
      description: "Frontend Devoloper",
    },
    {
      url: "assets/images/Mask group (2).png",
      name: "Merna Awad",
      description: "Backend Devoloper",
    },
    {
      url: "assets/images/Admin-img.png",
      name: "Samah Salah",
      description: "Team Leader",
    },
    {
      url: "assets/images/Mask group (4).png",
      name: "Verena Atef",
      description: "Frontend Devoloper",
    },
    {
      url: "assets/images/Mask group.png",
      name: "Mostafa Ahmed",
      description: "UI & UX",
    },
  ];
  handleClick(name: string) {
    const person = this.images.find(
      (image) => image.name.toLowerCase() === name.toLowerCase()
    );
    if (person) {
      this.img = person.url;
      this.name = person.name;
      this.description = person.description;
    }
  }
}
