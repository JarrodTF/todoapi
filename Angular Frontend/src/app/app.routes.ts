import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = 
[
    //Defaulted page to load
    // {
    //    path:'',
    //    redirectTo: 'login',
    //    pathMatch:'full' 
    // },

    {
        path:'',
        component:HomeComponent
    },

    //Login Route with Component
    {
        path:'login',
        component:LoginComponent
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
