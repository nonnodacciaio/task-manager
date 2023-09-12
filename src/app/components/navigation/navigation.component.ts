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
				*ngIf="authService.isLoggedIn"
				(click)="authService.logout()">
				Logout
			</button>
		</div>
	</mat-toolbar> `
})
export class NavigationComponent {
	constructor(public authService: AuthService) {}
}
