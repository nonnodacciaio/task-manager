import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "user-page",
	template: `<mat-list
			><mat-list-item>Email: {{ user?.email }}</mat-list-item
			><mat-list-item>Display name: {{ user?.displayName }}</mat-list-item> <mat-list-item>Phone number: {{ user?.phoneNumber }}</mat-list-item></mat-list
		><button
			mat-button
			class="w-full m-auto"
			color="warn"
			(click)="deleteAccount()">
			Delete account
		</button>`
})
export class UserPage implements OnDestroy {
	user: User | null = null;
	destroy$ = new Subject();

	constructor(private authService: AuthService) {
		authService.userData$.pipe(takeUntil(this.destroy$)).subscribe(user => (this.user = user));
	}

	ngOnDestroy(): void {
		this.destroy$.next(null);
		this.destroy$.unsubscribe();
	}

	deleteAccount(): void {
		let res = confirm("Do you want to delete your account?");

		if (res) {
			this.authService.deleteAccount();
		}
	}
}
