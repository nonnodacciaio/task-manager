import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule, Routes } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { environment } from "src/environments/environment";
import { VerifyComponent } from "./verify.component";

const routes: Routes = [
	{
		path: "verify",
		component: VerifyComponent
	}
];

@NgModule({
	declarations: [VerifyComponent],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, AngularFireModule.initializeApp(environment.firebase)],
	providers: [AngularFireAuth, AuthService]
})
export class AuthenticationModule {}
