import { Injectable } from "@angular/core";
import { DocumentData, QuerySnapshot, collection, getDocs, getFirestore, provideFirestore, query, where } from "@angular/fire/firestore";
import { Observable, Subject, from, map } from "rxjs";
import { Task } from "src/app/models/task.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Injectable({ providedIn: "root" })
export class TasksService {
	private tasksSubject: Subject<Task[]> = new Subject<Task[]>();
	tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

	constructor(private authService: AuthService) {
		this.authService.userData$.subscribe(userData => {
			if (userData) {
				const col = collection(getFirestore(), "tasks");
				const q = query(col, where("uid", "==", userData.uid));
				getDocs(q)
					.then((querySnapshot: QuerySnapshot<DocumentData>) => {
						const tasks = querySnapshot.docs.map(doc => doc.data() as Task);
						this.tasksSubject.next(tasks);
					})
					.catch(error => {
						console.error("Error getting tasks:", error);
					});
			}
		});
	}

	getTasks(): Observable<Task[]> {
		return this.tasks$;
	}
}
