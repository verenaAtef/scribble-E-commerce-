import { Component } from "@angular/core";
import { UserProileComponent } from "./user-proile/user-proile.component";

@Component({
  selector: "app-user-components",
  standalone: true,
  imports: [UserProileComponent],
  templateUrl: "./user-components.component.html",
  styleUrl: "./user-components.component.css",
})
export class UserComponentsComponent {}
