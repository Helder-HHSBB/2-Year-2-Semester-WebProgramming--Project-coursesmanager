import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseClassDetailComponent } from "./courseclass-detail/course-class-detail.component";
import {UploadCsvComponent} from "./upload-csv/upload-csv.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'coursedetail/:id', component: CourseDetailComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'class/:id', component: CourseClassDetailComponent},
  { path: 'uploadcsv', component: UploadCsvComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
