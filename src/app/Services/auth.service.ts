import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  id: any;
  role: any;
  constructor() {}

  login(Email: string, Password: string): Promise<string> {
    return axios
      .post<any>("https://scrippleback.onrender.com/login", { Email, Password })
      .then((response) => {
        const token = response.data.token;
        var user = response.data.user;
        console.log("tooken is", token);
        localStorage.setItem("token", token);
        localStorage.setItem("id", user._id);
        this.id = user._id;
        this.role = user.role;
        console.log(user._id);
        return token;
      });
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
