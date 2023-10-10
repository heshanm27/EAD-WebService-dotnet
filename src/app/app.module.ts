import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './Components/test-component/test-component.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { LoginPageComponent } from './Components/login-page/login-page.component'; 
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { AdminPanelComponent } from './Components/admin-panel/admin-panel.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    LoginPageComponent,
    AdminPanelComponent,
    DashboardComponent,
    UserRegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
