import { Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login';
import { RegisterComponent } from '../components/auth/register/register';
import { CreateTourPage } from './create-tour-page/create-tour-page';
import { HomePage } from './home-page/home-page';
import { TourPage } from './tour-page/tour-page';
import { TourlogPage } from './tourlog-page/tourlog-page';
import { MyTourlogsPage } from './my-tourlogs-page/my-tourlogs-page';

export const routes: Routes = [
    {path: '', component: HomePage },
    {path: 'home', component: HomePage },
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'create-tour', component: CreateTourPage },
    {path: 'tourlogs', component: MyTourlogsPage },
    {path: 'tour-page', component: TourPage },
    {path: 'tours/:tourId/tourlogs', component: TourlogPage }
];