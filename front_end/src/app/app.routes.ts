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
import { AdminComponent } from './components/dashboard/admin/admin.component';
import { InboxComponent } from './components/common/inbox/inbox.component';
import { CalendarComponent } from './components/common/calendar/calendar.component';
import { AllUsersComponent } from './components/dashboard/admin/all-users/all-users.component';
import { SubjectListComponent } from './components/dashboard/admin/subject-list/subject-list.component';
import { CourseListComponent } from './components/dashboard/admin/course-list/course-list.component';
import { MapComponentComponent } from './components/public/map-component/map-component.component';
import { ScoreTeachersComponent } from './components/dashboard/student/score-teachers/score-teachers.component';


export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'looking-teachers', component: MapComponentComponent },
    { path: 'how-works', component: HowWorkComponentComponent },
    { path: 'contact', component: ContactComponentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register-student', component: RegisterStudentComponentComponent },
    { path: 'register-teacher', component: RegisterTeacherComponentComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'teacher', component: TeacherProfileComponentComponent },
    { path: 'student', component: StudentProfileComponentComponent },
    { path: 'inbox', component: InboxComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'all-users', component: AllUsersComponent },
    { path: 'subjects', component: SubjectListComponent },
    { path: 'courses', component: CourseListComponent },
    {path: 'prueba', component: ScoreTeachersComponent},



    { path: '**', redirectTo: '/index' } // route to 404
];
