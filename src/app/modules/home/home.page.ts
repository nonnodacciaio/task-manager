import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "home",
	template: `<task-list></task-list
		><ng-container *ngIf="!authService.isLoggedIn"
			><form
				(click)="$event.stopPropagation()"
				(keydown)="$event.stopPropagation()"
				class="flex flex-col p-1">
				<mat-form-field
					appearance="fill"
					(click)="$event.stopPropagation()"
					(keydown)="$event.stopPropagation()">
					<mat-label>Email</mat-label>
					<input
						matInput
						type="email"
						[(ngModel)]="email"
						name="email"
						required />
				</mat-form-field>

				<mat-form-field
					appearance="fill"
					(click)="$event.stopPropagation()"
					(keydown)="$event.stopPropagation()">
					<mat-label>Password</mat-label>
					<input
						matInput
						type="password"
						[(ngModel)]="password"
						name="password"
						required />
				</mat-form-field>

				<button
					mat-raised-button
					color="primary"
					type="submit"
					class="mb-4"
					(click)="authService.login(email, password)">
					Login
				</button>
				<button
					mat-raised-button
					color="primary"
					type="submit"
					(click)="authService.signup(email, password)">
					Signup
				</button>
			</form></ng-container
		>`
})
export class HomePage {
	email: string = "";
	password: string = "";

	constructor(public authService: AuthService) {}
}
