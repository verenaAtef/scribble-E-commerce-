import { Injectable } from "@angular/core";
import axios from "axios";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminserviceService {
  constructor() {}
  /// get admin Profile
  getAdminProfile(userId: string): Observable<any> {
    return new Observable((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/admin/profile/${userId}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  //////// here admin sort products
  sortAllProducts(sortBy: string): Observable<any> {
    const url = `https://scrippleback.onrender.com/admin/sortproduct/${sortBy}`;

    return new Observable((observer) => {
      axios
        .get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  ///////admin sort user
  sortAllUsers(sortBy: string): Observable<any> {
    const url = `https://scrippleback.onrender.com/admin/sortusers/${sortBy}`;

    return new Observable((observer) => {
      axios
        .get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  ////filter Products by catogries
  filterProducts(sortBy: string): Observable<any> {
    const url = `https://scrippleback.onrender.com/admin/filterProducts/${sortBy}`;

    return new Observable((observer) => {
      axios
        .get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  //// get user to admin

  getAllUsers(): Observable<any> {
    return new Observable((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/admin/users/`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /// delete user
  deleteUser(userId: any): Promise<any> {
    return axios
      .delete(`https://scrippleback.onrender.com/admin/deleteuser/${userId}`)
      .then(() => {
        console.log("User deleted successfully.");
        // Return the ID of the deleted user
        return userId;
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        throw error;
      });
  }
  ///// get all products
  getAllProducts(): Observable<any> {
    return new Observable((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/admin/products/`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  ///delete Products
  deleteProducts(userId: any): Promise<any> {
    return axios
      .delete(
        `https://scrippleback.onrender.com/admin/deleteProducts/${userId}`
      )
      .then(() => {
        console.log("User deleted successfully.");
        // Return the ID of the deleted user
        return userId;
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        throw error;
      });
  }

  ///add products
  async addProduct(productData: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `https://scrippleback.onrender.com/admin/createproduct/`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("ErrorAdding Products:", error);
      throw error;
    }
  }

  ///upload image
  private baseUrl = "https://scrippleback.onrender.com"; // Replace with your backend URL

  getImage(imagePath: string): Promise<string> {
    return axios
      .get(`${this.baseUrl}/uploads/${imagePath}`, { responseType: "blob" })
      .then((response) => {
        return URL.createObjectURL(response.data);
      });
  }

  ///// add User
  async addUser(productData: FormData): Promise<any> {
    try {
      const response = await axios.post(
        `https://scrippleback.onrender.com/admin/createuser/`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("ErrorAdding Products:", error);
      throw error;
    }
  }
  ///update user
  async updateUser(userId: string, userData: any): Promise<any> {
    try {
      const response = await axios.patch(
        `https://scrippleback.onrender.com/admin/updateuser/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  ///// admin get user by id
  getUserById(userId: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/admin/getuserbyid/${userId}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  ////herer edit product and get product by id
  editProduct(id: string, updatedProduct: any): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .patch(
          `https://scrippleback.onrender.com/admin/updataproduct/${id}`,
          updatedProduct
        )
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getProductById(id: string): Observable<any> {
    return new Observable<any>((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/admin/getproductbyid/${id}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  ////filter users by isActive
  filterUsers(sortBy: string): Observable<any> {
    const url = `https://scrippleback.onrender.com/admin/filterUsrs/${sortBy}`;

    return new Observable((observer) => {
      axios
        .get(url)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
