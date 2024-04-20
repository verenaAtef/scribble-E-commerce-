import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HomeComponentsComponent } from "./home-components/home-components.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { log } from "console";
import { AuthService } from "./Services/auth.service";
import axios from "axios";
import { ToastrModule, ToastrService, provideToastr } from "ngx-toastr";
import { ToasterService } from "./Services/toaster.service";
import { provideAnimations } from "@angular/platform-browser/animations";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HomeComponentsComponent, HttpClientModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  providers: [HttpClient, ToasterService, ToastrService],
})
export class AppComponent {
  title = "frontproject";
  // dataFromBackend: any;

  // constructor(private http: HttpClient) {}

  // ngOnInit() {
  //   this.http.get<any>("http://localhost:5000/").subscribe({
  //     next: (response) => {
  //       // this.dataFromBackend = response;
  //       console.log(response, "sucess to connection with fronend");
  //       console.log("sucess to xonnectiom with angular");
  //     },
  //     error: (error) => {
  //       console.error("Error fetching data from backend:", error);
  //     },
  //   });
  // }
}
