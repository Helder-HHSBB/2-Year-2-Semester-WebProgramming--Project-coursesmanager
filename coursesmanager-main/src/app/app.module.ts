import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; //Módulo cliente.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'; //Módulo in memory api. 
import { InMemoryDataService } from './in-memory-data.service'; // Módulo simulador de server. 

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { MessagesComponent } from './messages/messages.component';
import {CourseClassDetailComponent} from "./courseclass-detail/course-class-detail.component";
import {UploadCsvComponent} from "./upload-csv/upload-csv.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,    
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    CourseDetailComponent,
    MessagesComponent,
    CourseSearchComponent,
    CourseClassDetailComponent,
    UploadCsvComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
