import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = 
[
    //default Route with Component
    {
        path:'',
        component:HomeComponent
    },

    //Login Route with Component
    {
        path:'login',
        component:LoginComponent
    },

    //Register Route with Component
    {
        path:'register',
        component:RegisterComponent
    },

    {
        path:'',
        component:LayoutComponent,

        children: 
        [
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
];
