import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
@Component({
	selector: "navigation",
	template: `<mat-toolbar
			color="primary"
			class="flex justify-between items-center">
			<div>Task manager app</div>
			<div class="flex space-x-2">
				<button
					mat-button
					[matMenuTriggerFor]="signup"
					*ngIf="!authService.isLoggedIn">
					Signup
				</button>
				<button
					*ngIf="!authService.isLoggedIn"
					mat-button
					[matMenuTriggerFor]="login">
					Login</button
				><button
					mat-button
					*ngIf="authService.isLoggedIn"
					(click)="authService.logout()">
					Logout
				</button>
			</div>
		</mat-toolbar>
		<mat-menu
			#login="matMenu"
			(click)="$event.stopPropagation()"
			(keydown)="$event.stopPropagation()">
			<form
				(click)="$event.stopPropagation()"
				(keydown)="$event.stopPropagation()"
				(ngSubmit)="authService.login(email, password)"
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
					type="submit">
					Login
				</button>
			</form>
		</mat-menu>

		<mat-menu
			#signup="matMenu"
			(click)="$event.stopPropagation()"
			(keydown)="$event.stopPropagation()">
			<form
				(click)="$event.stopPropagation()"
				(keydown)="$event.stopPropagation()"
				(ngSubmit)="authService.signup(email, password)"
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
					type="submit">
					Signup
				</button>
			</form>
		</mat-menu> `
})
export class NavigationComponent {
	email: string = "";
	password: string = "";

	constructor(public authService: AuthService) {}
}
