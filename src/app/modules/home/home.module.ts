import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomePage } from "./home.page";
import { TasklistComponent } from "./components/task-list.component";

@NgModule({
	declarations: [HomePage, TasklistComponent],
	imports: [CommonModule],
	providers: []
})
export class HomeModule {}
