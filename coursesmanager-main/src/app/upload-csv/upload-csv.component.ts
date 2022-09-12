import { Component, OnInit } from '@angular/core';
import {Course, CourseClass, Student} from '../models/course';
import { CourseService } from '../services/course.service';
import {CourseClassService} from "../services/courseClass.service";

@Component({
  selector: 'app-courses',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {

  fileToUpload: File | undefined;

  constructor(private courseService: CourseService, private courseClassService: CourseClassService) { }

  ngOnInit(): void {
  }

  parseCSV() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    this.fileToUpload?.text().then((text) => {
      let lines: string[] = text.split('\n');

      for(let line of lines) {
        let elements = line.split(',');
        let courseName = elements[0].trim();
        let className = elements[1].trim();
        let studentName = elements[2].trim();

        this.courseService.searchCourses(courseName).subscribe(courses => {
            if(courses && courses[0]) {
              let course: Course = courses[0];

              this.courseClassService.searchCourseClassesByName(course.id, className).subscribe(classes => {
                if(classes && classes[0]) {
                  let courseClass: CourseClass = classes[0];

                  this.courseClassService.createStudent({name: studentName, courseClassId: courseClass.id} as Student).subscribe()

                }
              })
            }
          })
      }
    })

  }

  handleFileInput(e: Event) {
    let fileList: FileList | null = (<HTMLInputElement>e.target).files
    if(fileList) {
      this.fileToUpload = fileList[0];
    }
  }
}
