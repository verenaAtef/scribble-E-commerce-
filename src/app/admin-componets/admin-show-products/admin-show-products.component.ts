import { Component, Input, Output } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AdminserviceService } from "../../Services/adminservice.service";
import { CommonModule } from "@angular/common";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { PaintingFormComponent } from "../../Elements/painting-form/painting-form.component";
import { FormsModule } from "@angular/forms";
import { log } from "console";
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-admin-show-products",
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    RouterModule,
    PaintingFormComponent,
    FormsModule,
  ],
  templateUrl: "./admin-show-products.component.html",
  styleUrl: "./admin-show-products.component.css",
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
export class AdminShowProductsComponent {
  showEditFormFlag: boolean = false;
  selectedUser: any;
  allProducts: any;
  sortBy: string = "";
  filtertBy: string = "";
  baseUrl = "https://scrippleback.onrender.com"; // Your backend server URL

  getImageUrl(imageFilename: string): string {
    return `${this.baseUrl}/${imageFilename}`;
  }
  constructor(
    private adminService: AdminserviceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.adminService.getAllProducts().subscribe((data) => {
      this.allProducts = data;
    });
  }
  @Input() deleteProduct(userId: any) {
    console.log("hello");
    this.allProducts = this.allProducts.filter(
      (user: any) => user._id !== userId
    );
    this.adminService
      .deleteProducts(userId)
      .then(() => {
        console.log("Products deleted successfully from backend.");
        this.showEditFormFlag = false;
      })
      .catch((error) => {
        console.error("Error deleting user from backend:", error);
      });
  }
  ///////////div show edit
  showEditForm(product: any) {
    this.showEditFormFlag = true;
    this.selectedUser = { ...product };
  }

  closeEditForm() {
    this.showEditFormFlag = false;
  }

  updateProductDetails(updatedProduct: any) {
    const index = this.allProducts.findIndex(
      (p: { id: any }) => p.id === updatedProduct.id
    );
    if (index !== -1) {
      this.allProducts[index] = { ...updatedProduct };
    }
    this.showEditFormFlag = false;
  }

  ///here sorting the products
  sortAllProducts(): void {
    this.adminService.sortAllProducts(this.sortBy).subscribe((data) => {
      this.allProducts = data;
    });
  }
  onSortChange(event: any): void {
    this.sortBy = event.target.value;
    this.sortAllProducts();
  }
  // filterProducts(event: any) {
  //   const filterValue = event.target.value;
  //   this.adminService.filterProducts(filterValue).subscribe((products) => {
  //     console.log(products);
  //     console.log(products[0].role);
  //     this.allProducts = products;
  //   });
  // }

  filterProducts(event: Event) {
    const target = event.target as HTMLSelectElement;
    const category = target.value;

    if (category === "") {
      this.adminService.getAllProducts().subscribe(
        (products: any[]) => {
          console.log(products);
          this.allProducts = products;
        },
        (error) => {
          console.error("Error retrieving all products:", error);
        }
      );
    } else {
      this.adminService.filterProducts(category).subscribe(
        (products: any[]) => {
          console.log(products);
          this.allProducts = products;
        },
        (error) => {
          console.error("Error filtering products:", error);
        }
      );
    }
  }
}
