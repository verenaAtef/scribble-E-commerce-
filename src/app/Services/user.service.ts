import { Injectable } from "@angular/core";
import axios from "axios";
import { response } from "express";
import { Observable, observeOn } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  getUserProfile(userId: string): Observable<any> {
    return new Observable((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/user/profile/${userId}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  //// get data from backend api to show all products to user products
  // getAllProducts(): Observable<any> {
  //   return new Observable((observe) => {
  //     axios
  //       .get(`http://localhost:5000/user/products/`)
  //       .then((response) => {
  //         observe.next(response.data);
  //         observe.complete();
  //       })
  //       .catch((error) => {
  //         observe.error;
  //       });
  //   });
  // }
  getAllProducts(): Observable<any> {
    return new Observable((observer) => {
      axios
        .get(`https://scrippleback.onrender.com/user/products/`)
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
