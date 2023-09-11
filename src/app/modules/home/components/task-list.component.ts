import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "src/app/models/task.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { TasksService } from "../services/tasks.service";

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
	tasks$: Observable<Task[]> | null = null;
	newTask: string = "";

	constructor(private tasksService: TasksService, public authService: AuthService) {
		this.tasks$ = tasksService.getTasks();
	}

	async addTask() {
		console.log("Add tasks");
	}
}
