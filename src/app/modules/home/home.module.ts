import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { RouterModule, Routes } from "@angular/router";
import { TasklistComponent } from "./components/task-list.component";
import { HomePage } from "./home.page";
import { TasksService } from "./services/tasks.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
	{
		path: "",
		component: HomePage
	}
];

@NgModule({
	declarations: [HomePage, TasklistComponent],
	imports: [CommonModule, RouterModule.forChild(routes), MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatCheckboxModule, MatIconModule],
	providers: [AngularFireAuth, TasksService]
})
export class HomeModule {}
