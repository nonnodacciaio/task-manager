import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "home",
	template: `<task-list></task-list>
		<div
			class="flex flex-col p-1"
			*ngIf="!authService.isLoggedIn">
			<button
				mat-raised-button
				class="m-4"
				color="primary"
				[routerLink]="'/auth/login'">
				Login</button
			><button
				mat-raised-button
				class="mx-4"
				color="primary"
				[routerLink]="'/auth/signup'">
				Signup
			</button>
			<button
				mat-raised-button
				color="accent"
				class="m-4"
				(click)="authService.googleSignIn()">
				Sign in with Google
			</button>
		</div>`
})
export class HomePage {
	email: string = "";
	password: string = "";

	constructor(public authService: AuthService) {}
}
