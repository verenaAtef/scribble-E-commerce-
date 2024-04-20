import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-upper-nav",
  standalone: true,
  imports: [],
  templateUrl: "./upper-nav.component.html",
  styleUrl: "./upper-nav.component.css",
})
export class UpperNavComponent {
  name: any;
  img: any;
  notify: any;
  massage: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    (this.name = "Merna Awad"),
      (this.img = "assets/dashboard-img/profile-img.png");
    (this.notify = 5), (this.massage = 7);
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
