import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
@Component({
	selector: "navigation",
	template: `<mat-toolbar
		color="primary"
		class="flex justify-between">
		<div>Task manager app</div>
		<div>
			<button
				mat-button
				*ngIf="authService.isLoggedIn && isHomePage"
				[routerLink]="'user'">
				Profile
			</button>
			<button
				mat-button
				*ngIf="authService.isLoggedIn && isUserPage"
				[routerLink]="'home'">
				Home
			</button>
			<button
				mat-button
				*ngIf="authService.isLoggedIn"
				(click)="authService.logout()">
				Logout
			</button>
		</div>
	</mat-toolbar>`
})
export class NavigationComponent {
	isHomePage: boolean = true;
	isUserPage: boolean = false;

	constructor(public authService: AuthService, private router: Router) {
		// Subscribe to router events to track the current route
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				// Check if the current route is the home page
				this.isHomePage = event.url === "/home";
				// Check if the current route is the user page
				this.isUserPage = event.url === "/user";
			}
		});
	}
}
