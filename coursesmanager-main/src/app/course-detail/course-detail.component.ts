import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course, CourseClass } from '../models/course';
import { CourseService } from '../services/course.service';
import { CourseClassService } from '../services/courseClass.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: [ './course-detail.component.css' ]
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  courseClasses: CourseClass[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private courseClassService: CourseClassService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCourse();
    this.getCourseClasses();
  }

  getCourse(): void { //Get the course
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);
  }

  getCourseClasses(): void { //Get the classes for one course
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseClassService.searchCourseClasses(id)
      .subscribe(courseClasses => this.courseClasses = courseClasses);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.course) { //Update course, name
      this.courseService.updateCourse(this.course)
        .subscribe(() => this.goBack());
    }
  }

  delete(courseClass: CourseClass): void { //Delete a Course
    if(this.courseClasses) {
      this.courseClasses = this.courseClasses.filter(h => h !== courseClass);
      this.courseClassService.deleteCourseClass(courseClass.id).subscribe();
    }
  }

  saveNewCourseClass(name: string) { //Post a Course
    name = name.trim();
    if (!name) { return; }
    this.courseClassService.createCourseClass({ name: name, courseId:this.course?.id } as CourseClass)
      .subscribe(courseClass => {
        this.courseClasses?.push(courseClass);
      });
  }
}
