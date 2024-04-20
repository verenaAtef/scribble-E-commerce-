import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  input,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { SideNavComponent } from "../../admin-componets/side-nav/side-nav.component";
import { AdminserviceService } from "../../Services/adminservice.service";
import { ToastrService } from "ngx-toastr";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-painting-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SideNavComponent, FormsModule],
  templateUrl: "./painting-form.component.html",
  styleUrls: ["./painting-form.component.css"],
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
export class PaintingFormComponent implements OnInit {
  @Input() product: any; // Input property to receive product details
  @Input() deleteProductFunction!: (userId: any) => void;
  @Output() updateProduct = new EventEmitter<any>(); // Output event to emit updated product
  showSidebarAndForm: boolean = false;
  allProducts: any[] = [];
  productId: any;
  image: any; //
  paintingForm!: FormGroup; // Reactive form for product editing

  constructor(
    private fb: FormBuilder,
    private productService: AdminserviceService,
    private readonly toast: ToastrService,
    private adminService: AdminserviceService
  ) {}

  ngOnInit(): void {
    if (this.product && this.product._id) {
      this.productId = this.product._id;
      console.log(this.productId);
      console.log(this.product);
      this.loadProductData(this.productId);
    }

    this.paintingForm = this.fb.group({
      productName: [this.product?.productName || "", Validators.required],
      role: [this.product?.role || "", Validators.required],
      price: [this.product?.price || "", Validators.required],
      Image: [""],
    });
    const storedFormData = localStorage.getItem("paintingFormData");
    if (storedFormData) {
      this.paintingForm.patchValue(JSON.parse(storedFormData));
    }
  }

  loadProductData(id: string) {
    this.productService.getProductById(id).subscribe(
      (product) => {
        this.paintingForm.patchValue(product); // Populate form with fetched product data
      },
      (error) => {
        console.error("Error loading product data:", error);
      }
    );
  }

  onSubmit() {
    if (this.paintingForm.valid) {
      const formData = new FormData();
      formData.append("productName", this.paintingForm.value.productName);
      formData.append("role", this.paintingForm.value.role);
      formData.append("price", this.paintingForm.value.price);
      formData.append("Image", this.paintingForm.value.Image); // Correctly append file data

      const updatedProduct = formData;
      localStorage.setItem("paintingFormData", JSON.stringify(formData));
      this.productService.editProduct(this.productId, updatedProduct).subscribe(
        (response) => {
          this.updateProduct.emit(response);
          this.toast.success("Successful edit Product");
        },
        (error) => {
          console.error("Error updating product:", error);
          this.toast.error("Faild edit Product ");
        }
      );
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.paintingForm.patchValue({
        Image: file,
      });
      this.paintingForm.get("Image")?.updateValueAndValidity();
    }
    console.log(this.paintingForm.get("Image"));
  }
}
