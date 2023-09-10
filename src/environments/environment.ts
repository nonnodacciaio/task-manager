import { initializeApp } from "firebase/app";

export const environment = {
	firebase: {
		projectId: "task-manager-addd4",
		appId: "1:486836021503:web:bbf7d7ed27d801741a04ca",
		databaseURL: "https://task-manager-addd4-default-rtdb.firebaseio.com",
		storageBucket: "task-manager-addd4.appspot.com",
		apiKey: "AIzaSyDrpJO5OiFrtj-vLdwXXJ1H5BUTR5drNpc",
		authDomain: "task-manager-addd4.firebaseapp.com",
		messagingSenderId: "486836021503",
		measurementId: "G-D2YNF6CG2Z"
	}
};

// Initialize Firebase
export const app = initializeApp(environment.firebase);
