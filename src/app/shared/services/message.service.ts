import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
	providedIn: "root"
})
export class MessageService {
	constructor(private snackBar: MatSnackBar) {}

	show(message: string, config: MatSnackBarConfig) {
		this.snackBar.open(message, "Chiudi", config);
	}

	success(message: string) {
		const config: MatSnackBarConfig = {
			panelClass: ["snackbar-success"],
			duration: 5000
		};
		this.show(message, config);
	}

	warn(message: string) {
		const config: MatSnackBarConfig = {
			panelClass: ["snackbar-warn"],
			duration: 5000
		};
		this.show(message, config);
	}

	info(message: string) {
		const config: MatSnackBarConfig = {
			panelClass: ["snackbar-info"],
			duration: 5000
		};
		this.show(message, config);
	}

	error(message: string) {
		const config: MatSnackBarConfig = {
			panelClass: ["snackbar-error"],
			duration: 5000
		};
		this.show(message, config);
	}
}
