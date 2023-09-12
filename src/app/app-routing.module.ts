import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule) },
	{ path: "auth", loadChildren: () => import("./modules/authentication/authentication.module").then(m => m.AuthenticationModule) },
	{ path: "user", loadChildren: () => import("./modules/user/user.module").then(m => m.UserModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
