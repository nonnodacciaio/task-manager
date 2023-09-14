import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "signup",
	template: `<form
		*ngIf="!authService.isLoggedIn"
		class="flex flex-col p-1">
		<mat-form-field appearance="fill"
			><mat-label>Email</mat-label
			><input
				matInput
				type="email"
				name="email"
				[(ngModel)]="email"
				required
		/></mat-form-field>
		<mat-form-field appearance="fill"
			><mat-label>Password</mat-label
			><input
				matInput
				type="password"
				name="password"
				[(ngModel)]="password"
				required /></mat-form-field
		><button
			mat-raised-button
			color="primary"
			type="submit"
			class="my-4"
			(click)="authService.signup(email, password)">
			Signup
		</button>
		<button
			mat-button
			[routerLink]="'/home'">
			Back
		</button>
	</form>`
})
export class SignupComponent {
	email = "";
	password = "";

	constructor(public authService: AuthService) {}
}
