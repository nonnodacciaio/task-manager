import { NgModule } from "@angular/core";
import { ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics } from "@angular/fire/analytics";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { AuthService } from "./shared/services/auth.service";

@NgModule({
	declarations: [AppComponent, NavigationComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAnalytics(() => getAnalytics()),
		provideAuth(() => getAuth()),
		AngularFireAuthModule,
		AngularFireModule.initializeApp(environment.firebase),
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatFormFieldModule,
		MatInputModule,
		MatSnackBarModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [ScreenTrackingService, UserTrackingService, AngularFireAuth, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule {}
