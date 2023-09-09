import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { FirebaseError } from "firebase/app";
import { User } from "src/app/models/user.model";
import { MessageService } from "./message.service";
import { Firestore, doc, setDoc } from "@angular/fire/firestore";

@Injectable({ providedIn: "root" })
export class AuthService {
	userData: User | null = null;

	constructor(private afAuth: AngularFireAuth, private messageService: MessageService, private router: Router, private firestore: Firestore) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userData = user as User;

				localStorage.setItem("user", JSON.stringify(this.userData));

				JSON.parse(localStorage.getItem("user")!);
			} else {
				localStorage.setItem("user", "null");

				JSON.parse(localStorage.getItem("user")!);
			}
		});
	}

	get isLoggedIn(): boolean {
		const user = JSON.parse(localStorage.getItem("user")!) as User;

		return user !== null && user.emailVerified !== false ? true : false;
	}

	login(email: string, password: string) {
		this.afAuth
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				this.setUserData(result.user);
				this.router.navigate(["home"]);
			})
			.catch((error: FirebaseError) => this.messageService.error(error.message));
	}

	signup(email: string, password: string) {
		this.afAuth
			.createUserWithEmailAndPassword(email, password)
			.then(result => {
				this.sendVerificationMail();
				this.setUserData(result.user);
			})
			.catch((error: FirebaseError) => this.messageService.error(error.message));
	}

	private async setUserData(user: any) {
		const docRef = doc(this.firestore, "users", user.uid);
		await setDoc(docRef, { email: user.email, uid: user.uid, emailVerified: user.emailVerified, isAnonymous: user.isAnonymous }, { merge: true });
	}

	async logout(): Promise<void> {
		return this.afAuth.signOut().then(() => {
			localStorage.removeItem("user");
		});
	}

	private sendVerificationMail(): Promise<void> {
		return this.afAuth.currentUser
			.then((u: any) => u.sendEmailVerification())
			.then(() => {
				this.router.navigate(["auth/verify"]);
			});
	}
}
