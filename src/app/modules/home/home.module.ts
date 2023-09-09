import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TasklistComponent } from "./components/task-list.component";
import { HomePage } from "./home.page";
import { Routes, RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

const routes: Routes = [
	{
		path: "",
		component: HomePage
	}
];

@NgModule({
	declarations: [HomePage, TasklistComponent],
	imports: [CommonModule, RouterModule.forChild(routes), MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule],
	providers: [AngularFireAuth]
})
export class HomeModule {}
