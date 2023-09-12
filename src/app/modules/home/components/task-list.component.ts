import { MessageService } from "./../../../shared/services/message.service";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "src/app/models/task.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { TasksService } from "../services/tasks.service";
import { FirebaseError } from "firebase/app";

@Component({
	selector: "task-list",
	template: `<mat-list *ngIf="authService.isLoggedIn"
			><mat-list-item
				*ngFor="let task of tasks$ | async"
				[class.line-through]="task.completed"
				>{{ task.task
				}}<mat-checkbox
					[checked]="task.completed"
					(change)="toggleCompletion(task)"></mat-checkbox
				><button
					mat-icon-button
					class="align-middle"
					color="warn"
					(click)="deleteTask(task)">
					<mat-icon>delete</mat-icon>
				</button></mat-list-item
			></mat-list
		>
		<ng-container *ngIf="authService.isLoggedIn">
			<mat-form-field class="w-full"
				><input
					placeholder="Add a new task"
					matInput
					[(ngModel)]="newTask"
					type="text" /></mat-form-field
			><button
				mat-button
				class="w-full m-auto"
				color="primary"
				[disabled]="newTask == ''"
				(click)="addTask(newTask)">
				{{ "Add task" | uppercase }}
			</button>
		</ng-container> `
})
export class TasklistComponent {
	tasks$: Observable<Task[]> | null = null;
	newTask: string = "";

	constructor(private tasksService: TasksService, public authService: AuthService, private messageService: MessageService) {
		this.tasks$ = tasksService.getTasks();
	}

	async addTask(newTask: string) {
		this.tasksService
			.addTask(newTask)
			.then(() => (this.newTask = ""))
			.catch((error: FirebaseError) => this.messageService.error(`Error while adding task: ${error.message}`));
	}

	deleteTask(task: Task) {
		this.tasksService.deleteTask(task);
	}

	toggleCompletion(task: Task) {
		this.tasksService.toggleTaskCompletion(task);
	}
}
