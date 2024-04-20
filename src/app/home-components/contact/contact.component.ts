import { Component } from "@angular/core";
import { NavbarComponent } from "../../Elements/navbar/navbar.component";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
@Component({
  selector: "app-contact",
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
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
export class ContactComponent {
  firstName: any;
  lastName: any;
  Email: any;
  Phone: any;
  constructor() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }
  regValidation = new FormGroup({
    firstName: new FormControl(null, [
      Validators.pattern("/^[a-zA-Z]{3,}$/"),
      Validators.required,
    ]),
    lastName: new FormControl(null, [
      Validators.pattern("/^[a-zA-Z]{3,}$/"),
      Validators.required,
    ]),
    Phone: new FormControl(null, []),
    Email: new FormControl(null, [
      Validators.pattern(
        "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)*@" +
          "[A-Za-z0-9-]+(.[A-Za-z0-9]+)*(.[A-Za-z]{2,})$"
      ),
      Validators.required,
    ]),
    message: new FormControl(null, Validators.required),
  });
  get firstNameValid() {
    return this.regValidation.controls["firstName"].valid;
  }
  get lastNameValid() {
    return this.regValidation.controls["lastName"].valid;
  }
  get phoneValid() {
    return this.regValidation.controls["Phone"].valid;
  }
  get messageValid() {
    return this.regValidation.controls["message"].valid;
  }
  get EmailValid() {
    return this.regValidation.controls["Email"].valid;
  }
}
