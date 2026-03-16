import { Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login';
import { RegisterComponent } from '../components/auth/register/register';
import { CreateTourPage } from './create-tour-page/create-tour-page';

export const routes: Routes = [
//  {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'create-tour', component: CreateTourPage },

];
