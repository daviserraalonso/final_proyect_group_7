import { Routes } from '@angular/router';


import { IndexComponent } from './pages/public/home/index.component'
import { SearchTeachersComponent } from './components/public/search-teachers/search-teachers.component'
import { HowWorkComponentComponent } from './components/public/how-work-component/how-work-component.component'
import { ContactComponentComponent } from './components/public/contact-component/contact-component.component'
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterStudentComponentComponent } from './components/public/register-student-component/register-student-component.component';
import { RegisterTeacherComponentComponent } from './components/public/register-teacher-component/register-teacher-component.component';
import { StudentProfileComponentComponent } from './components/dashboard/student/student-profile-component/student-profile-component.component';
import { TeacherProfileComponentComponent } from './components/dashboard/teacher/teacher-profile-component/teacher-profile-component.component';
import { InboxComponent } from './components/common/inbox/inbox.component';
import { CalendarComponent } from './components/common/calendar/calendar.component';


export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'looking-teachers', component: SearchTeachersComponent },
    { path: 'how-works', component: HowWorkComponentComponent },
    { path: 'contact', component: ContactComponentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register-student', component: RegisterStudentComponentComponent },
    { path: 'register-teacher', component: RegisterTeacherComponentComponent },
    { path: 'admin', component: TeacherProfileComponentComponent },
    { path: 'teacher', component: TeacherProfileComponentComponent },
    { path: 'student', component: TeacherProfileComponentComponent },
    { path: 'inbox', component: InboxComponent },
    { path: 'calendar', component: CalendarComponent },

    { path: '**', redirectTo: '/index' } // route to 404
];
