import { Injectable } from "@angular/core";
import { User } from "@angular/fire/auth";
import { DocumentData, QuerySnapshot, addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "@angular/fire/firestore";
import { FirebaseError } from "firebase/app";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Task } from "src/app/models/task.model";
import { AuthService } from "src/app/shared/services/auth.service";
import { MessageService } from "./../../../shared/services/message.service";

@Injectable({ providedIn: "root" })
export class TasksService {
	private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
	tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

	firestore = getFirestore();
	userData: User | null = null;

	constructor(private authService: AuthService, private messageService: MessageService) {
		this.authService.userData$.subscribe(userData => {
			if (userData) {
				this.userData = userData as User;
				this.fetchTasks();
			}
		});
	}

	private fetchTasks() {
		const col = collection(this.firestore, "tasks");
		const q = query(col, where("uid", "==", this.userData?.uid));
		getDocs(q)
			.then((querySnapshot: QuerySnapshot<DocumentData>) => {
				const tasks = querySnapshot.docs.map(doc => {
					return this.toTask(doc);
				});
				this.tasksSubject.next(tasks);
			})
			.catch((error: FirebaseError) => {
				this.messageService.error(`Error getting tasks: ${error.message}`);
			});
	}

	getTasks(): Observable<Task[]> {
		return this.tasks$;
	}

	async addTask(task: string) {
		const newTaskData = { completed: false, task: task, uid: this.userData?.uid };
		try {
			await addDoc(collection(this.firestore, "tasks"), newTaskData);
			this.fetchTasks();
		} catch (error) {
			this.messageService.error(`Error adding task: ${error}`);
		}
	}

	async toggleTaskCompletion(task: Task) {
		try {
			const col = collection(this.firestore, "tasks");
			const q = query(col, where("uid", "==", this.userData?.uid), where("task", "==", task.task));
			const querySnapshot = await getDocs(q);

			if (querySnapshot.size > 0) {
				const taskDoc = querySnapshot.docs[0];
				const updatedTaskData = { ...taskDoc.data(), completed: !task.completed };
				await setDoc(taskDoc.ref, updatedTaskData);
				this.fetchTasks();
			} else {
				this.messageService.error("Task not found");
			}
		} catch (error) {
			this.messageService.error(`Error toggling task completion: ${error}`);
		}
	}

	async deleteTask(task: Task) {
		try {
			const taskRef = doc(this.firestore, "tasks", task.id);
			await deleteDoc(taskRef);
			this.fetchTasks();
		} catch (error) {
			this.messageService.error(`Error deleting task: ${error}`);
		}
	}

	private toTask(data: any): Task {
		let task = data.data();
		return { completed: task.completed, id: data.id, task: task.task, uid: task.uid };
	}
}
