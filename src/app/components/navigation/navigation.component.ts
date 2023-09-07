import { Component } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
@Component({
	selector: "navigation",
	template: `<mat-toolbar color="primary"
			><button
				mat-icon-button
				[routerLink]="'home'">
				<mat-icon>list</mat-icon></button
			>Task manager app
			<button
				mat-menu-item
				[matMenuTriggerFor]="login"></button></mat-toolbar
		><mat-menu #login="matMenu"
			><mat-menu
				#login="matMenu"
				class="p-5"
				(click)="$event.stopPropagation()">
				<form
					(click)="$event.stopPropagation()"
					(ngSubmit)="authService.login(email, password)"
					class="flex flex-col">
					<mat-form-field
						appearance="fill"
						(click)="$event.stopPropagation()">
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
						(click)="$event.stopPropagation()">
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
			</mat-menu></mat-menu
		>`
})
export class NavigationComponent {
	email: string = "";
	password: string = "";

	constructor(public authService: AuthService) {}
}
