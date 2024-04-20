import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { HomeComponentsComponent } from "./home-components/home-components.component";
import { AboutComponent } from "./home-components/about/about.component";
import { ContactComponent } from "./home-components/contact/contact.component";
import { RegistorComponent } from "./home-components/registor/registor.component";
import { LoginComponent } from "./home-components/login/login.component";
import { EditProfileComponent } from "./admin-componets/edit-profile/edit-profile.component";
import { UpdateUserProfileComponent } from "./user-components/update-user-profile/update-user-profile.component";
import { UserProileComponent } from "./user-components/user-proile/user-proile.component";
import { AuthGuard } from "./Services/AuthGuard";
import { UserShowProductsComponent } from "./user-components/user-show-products/user-show-products.component";
import { AdminProfileComponent } from "./admin-componets/admin-profile/admin-profile.component";
import { DashBoardComponent } from "./admin-componets/dash-board/dash-board.component";
import { ShowUsersComponent } from "./admin-componets/show-users/show-users.component";
import { AdminShowProductsComponent } from "./admin-componets/admin-show-products/admin-show-products.component";
import { AddProductsComponent } from "./admin-componets/add-products/add-products.component";
import { AddUserComponent } from "./admin-componets/add-user/add-user.component";
import { EditUserAdminComponent } from "./admin-componets/edit-user-admin/edit-user-admin.component";
export const routes: Routes = [
  { path: "", component: AboutComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "register", component: RegistorComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin/editprofile/:id",
    canActivate: [AuthGuard],
    component: EditProfileComponent,
  },
  {
    path: "user/editprofile",
    canActivate: [AuthGuard],
    component: UpdateUserProfileComponent,
  },
  {
    path: "userProfile/:id",
    canActivate: [AuthGuard],
    component: UserProileComponent,
  },
  {
    path: "userProducts",
    canActivate: [AuthGuard],
    component: UserShowProductsComponent,
  },
  {
    path: "adminProfile/:id",
    canActivate: [AuthGuard],
    component: AdminProfileComponent,
  },
  {
    path: "Homedashboard/:id",
    canActivate: [AuthGuard],
    component: DashBoardComponent,
  },
  {
    path: "admin/users",
    canActivate: [AuthGuard],
    component: ShowUsersComponent,
  },
  {
    path: "admin/showproducts",
    canActivate: [AuthGuard],
    component: AdminShowProductsComponent,
  },
  {
    path: "admin/addProduct",
    canActivate: [AuthGuard],
    component: AddProductsComponent,
  },
  {
    path: "admin/adduser",
    canActivate: [AuthGuard],
    component: AddUserComponent,
  },
  {
    path: "admin/editUser/:id",
    canActivate: [AuthGuard],
    component: EditUserAdminComponent,
  },
];
