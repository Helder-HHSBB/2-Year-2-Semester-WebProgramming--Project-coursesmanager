import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void { //Read courses
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  add(name: string): void { //Create a course
    name = name.trim();
    if (!name) { return; }
    this.courseService.addCourse({ name } as Course)
      .subscribe(course => {
        this.courses.push(course);
      });
  }

  delete(course: Course): void { //Remove a course
    this.courses = this.courses.filter(c => c !== course);
    this.courseService.deleteCourse(course.id).subscribe();
  }

}
