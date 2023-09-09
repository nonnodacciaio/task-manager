import { Component } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "task-list",
	template: `<mat-list *ngIf="authService.isLoggedIn"
			><mat-list-item *ngFor="let task of tasks">{{ task.value }}</mat-list-item></mat-list
		>
		<mat-form-field
			><input
				matInput
				[(ngModel)]="newTask"
				type="text" /></mat-form-field
		><button
			mat-button
			color="primary"
			[disabled]="newTask == ''"
			(click)="addTask()">
			Add task
		</button>`
})
export class TasklistComponent {
	tasks: { value: string; complete: boolean }[] = [];
	newTask: string = "";

	constructor(public authService: AuthService, private firestore: Firestore) {}

	addTask() {
		const uid = this.authService.userData?.uid; // Replace with your authentication logic
		if (uid) {
			const taskObject = { value: this.newTask, completed: false };

			// Add the task to Firestore under the "tasks" array for the user
			this.firestore
				.collection("users")
				.doc(uid)
				.update({
					tasks: firebase.firestore.FieldValue.arrayUnion(taskObject)
				})
				.then(() => {
					// Clear the input field after adding the task
					this.newTask = "";
				})
				.catch(error => {
					console.error("Error adding task:", error);
				});
		}
	}
}
