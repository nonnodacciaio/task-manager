import { Component } from "@angular/core";
import { Firestore, collection, doc, query, setDoc, where } from "@angular/fire/firestore";
import { DocumentData, QuerySnapshot, getDocs } from "@angular/fire/firestore";
import { Observable, from, map } from "rxjs";
import { Task } from "src/app/models/task.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
	selector: "task-list",
	template: `<mat-list *ngIf="authService.isLoggedIn"
			><mat-list-item *ngFor="let task of tasks$ | async">{{ task.task }}</mat-list-item></mat-list
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
	tasks$: Observable<Task[]>;
	newTask: string = "";

	constructor(public authService: AuthService, private firestore: Firestore) {
		const q = query(collection(firestore, "tasks"), where("uid", "==", authService.userData?.uid));

		const querySnapshot = getDocs(q);

		this.tasks$ = from(querySnapshot).pipe(map((querySnapshot: QuerySnapshot<DocumentData>) => querySnapshot.docs.map(doc => doc.data() as Task)));
	}

	async addTask() {
		const uid = this.authService.userData?.uid; // Replace with your authentication logic
		if (uid) {
			const taskObject = { value: this.newTask, completed: false };

			await setDoc(doc(this.firestore, "tasks", uid), taskObject);
		}
	}
}
