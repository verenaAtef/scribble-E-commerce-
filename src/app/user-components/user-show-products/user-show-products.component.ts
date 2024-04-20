import { Component, OnInit } from "@angular/core";
import { UserService } from "../../Services/user.service";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-user-show-products",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-show-products.component.html",
  styleUrl: "./user-show-products.component.css",
})
export class UserShowProductsComponent implements OnInit {
  allProducts: any;
  sortBy: string = "";
  constructor(private usrerService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.usrerService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }
}
