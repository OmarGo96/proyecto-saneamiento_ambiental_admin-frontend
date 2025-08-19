import { Routes } from '@angular/router';
import {UsersComponent} from '../users/pages/users/users.component';
import {LoginComponent} from './pages/login/login.component';

export default [
    {
        path: 'login',
        component: LoginComponent
    },
] as Routes;
