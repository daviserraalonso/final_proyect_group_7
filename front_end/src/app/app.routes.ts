import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { StudentProfileComponentComponent } from './components/dashboard/student/student-profile-component/student-profile-component.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'student', component: StudentProfileComponentComponent },
];
