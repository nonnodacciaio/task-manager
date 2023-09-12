import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { UserPage } from "./user.page";
import { MatListModule } from "@angular/material/list";

const routes: Routes = [
	{
		path: "",
		component: UserPage
	}
];

@NgModule({
	declarations: [UserPage],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule],
	providers: [AngularFireAuth, AuthService]
})
export class UserModule {}
