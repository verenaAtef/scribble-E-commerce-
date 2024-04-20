import { Component } from "@angular/core";
import { ContactComponent } from "./contact/contact.component";
import { RegistorComponent } from "./registor/registor.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "../Elements/navbar/navbar.component";

@Component({
  selector: "app-home-components",
  standalone: true,
  imports: [
    ContactComponent,
    RegistorComponent,
    LoginComponent,
    AboutComponent,
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: "./home-components.component.html",
  styleUrl: "./home-components.component.css",
})
export class HomeComponentsComponent {}
