import { Routes } from '@angular/router';


import { IndexComponent } from './pages/public/home/index.component'
import { AcademicOfferingComponent } from './components/public/academic-offering/academic-offering.component'
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
import { StudentCoursesComponent } from './components/dashboard/student/student-courses/student-courses.component';
import { AllUsersComponent } from './components/dashboard/admin/all-users/all-users.component';
//import { AllCourses } from './components/dashboard/admin/course-list/course-list.component';
import { SubjectListComponent } from './components/dashboard/admin/subject-list/subject-list.component';
import { CourseListComponent } from './components/dashboard/admin/course-list/course-list.component';
import { PresentialCoursesComponent } from './components/public/academic-offerings/presential-courses/presential-courses.component';
import { OnlineCoursesComponent } from './components/public/academic-offerings/online-courses/online-courses.component';
import { MapComponentComponent } from './components/public/map-component/map-component.component';
import { ScoreTeachersComponent } from './components/dashboard/student/score-teachers/score-teachers.component';
import { TeacherStudentViewComponent } from './components/dashboard/teacher/teacher-student-view/teacher-student-view.component';
import { TeacherViewComponent } from './components/common/teacher-view/teacher-view.component';
import { CourseViewComponent } from './components/common/course-view/course-view.component';
import { loginGuard } from './guards/login.guard';


export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'academic-offerings', component: AcademicOfferingComponent },
    { path: 'academic-offerings/presential', component: PresentialCoursesComponent },
    { path: 'academic-offerings/online', component: OnlineCoursesComponent },
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
    { path: 'courses', component: StudentCoursesComponent },
    { path: 'all-users', component: AllUsersComponent },
    { path: 'all-courses', component: CourseListComponent },
    { path: 'subjects', component: SubjectListComponent },
    { path: 'courses', component: CourseListComponent },
    {path: 'mis-alumnos', component: TeacherStudentViewComponent,canActivate:[loginGuard]},
    {path: 'teacher/:id', component: TeacherViewComponent, 
        children: [
        {path: 'course/:idcourse', component: CourseViewComponent, runGuardsAndResolvers: 'paramsChange'}
    ]},

    



    { path: '**', redirectTo: '/index' } // route to 404
];
