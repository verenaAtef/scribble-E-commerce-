import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from "@angular/forms";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { AdminserviceService } from "../../Services/adminservice.service";
import { routes } from "../../app.routes";
import { Router } from "@angular/router";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-products",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SideNavComponent, FormsModule],
  templateUrl: "./add-products.component.html",
  styleUrl: "./add-products.component.css",
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
export class AddProductsComponent {
  product = {
    productName: "",
    price: 0,
    description: "",
    role: "",
    Image: "",
  };

  constructor(
    private adminservice: AdminserviceService,
    private router: Router,
    private readonly toast: ToastrService
  ) {}

  async onSubmit() {
    try {
      const formData = new FormData();
      formData.append("productName", this.product.productName);
      formData.append("price", this.product.price.toString());
      formData.append("description", this.product.description);
      formData.append("role", this.product.role);
      formData.append("Image", this.product.Image);
      console.log(this.product.Image);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const response = await this.adminservice.addProduct(formData);
      console.log("Product added successfully:", response);
      this.toast.success("Successful add product");
      this.router.navigate(["admin/showproducts"]);
    } catch (error) {
      console.error("Error adding product:", error);
      this.toast.error("Failed add product");
    }
  }

  onFileSelected(event: any) {
    this.product.Image = event.target.files[0];
  }
}
