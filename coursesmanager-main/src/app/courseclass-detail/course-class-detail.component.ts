import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {CourseClass, Criterium, Note, Score, Student} from '../models/course';
import { CourseClassService } from '../services/courseClass.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-class-detail.component.html',
  styleUrls: [ './course-class-detail.component.css' ]
})
export class CourseClassDetailComponent implements OnInit {
  courseClass: CourseClass | undefined;
  students: Student[] | undefined;
  criteria: Criterium[] | undefined;
  studentScores: Map<number, Score[]>;
  classNotes: Note[] | undefined;
  loadedAllScores: boolean = false;
  loadedAllCriteria: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseClassService: CourseClassService,
    private location: Location
  ) {
    this.studentScores = new Map<number, Score[]>();
    this.loadedAllScores = false;
    this.loadedAllCriteria = false;
  }

  ngOnInit(): void {
    this.getCourseClass();
    this.getCriteria();
    this.getStudentsAndScores();
    this.getClassNotes();
  }

  getCourseClass(): void { //Get Course Classes
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseClassService.getCourseClass(id)
      .subscribe(courseClass => this.courseClass = courseClass);
  }

  getCriteria(): void { //Get Criterias
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseClassService.getCourseClassCriteria(id)
      .subscribe(criteria => {
        this.criteria = criteria;
        this.loadedAllCriteria = true;
      })
  }

  private getClassNotes() { //Get Class Notes
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseClassService.getCourseClassNotes(id).subscribe(notes => {
      this.classNotes = notes;
    })
  }

  getStudentsAndScores(): void { //Get students and calls private method to get scores
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.courseClassService.getCourseClassStudents(id)
      .subscribe((students) => {
        this.students = students
        if (students) {
          this.getStudentScores(students)
        }
      })

  }

  private getStudentScores(students: Student[]) { //private method to get scores
    this.studentScores = new Map<number, Score[]>();
    for(let student of students) {
      this.courseClassService.getCourseClassStudentScores(student.id)
        .subscribe(scores => this.studentScores.set(student.id, scores))
    }
    this.loadedAllScores = true;

  }

  goBack(): void { // return method
    this.location.back();
  }


  getStudentScoreForCriteria(student: Student, criterium: Criterium): Score | undefined { //Get the score for this student in this class in this criteria
    return this.studentScores.get(student.id)?.find(score => score.studentClassId == student.id && score.criteriumId == criterium.id)
  }

  deleteCriterium(criterium: Criterium): void { //delete criterium, like exame prova oral etc...
    if (this.criteria) {
      this.criteria = this.criteria.filter(h => h !== criterium);
      this.courseClassService.deleteCriterium(criterium.id).subscribe();
    }
  }

  saveNewCriterium(name: string) { //Post new criteria
    name = name.trim();
    if (!name) { return; }
    this.courseClassService.createCourseCriterium({ name: name, courseClassId:this.courseClass?.id } as Criterium)
      .subscribe(criterium => {
        this.criteria?.push(criterium);
      });
  }

  saveNewStudent(name: string) { //Post new student in this class
    name = name.trim();
    if (!name) { return; }
    this.courseClassService.createStudent({ name: name, courseClassId:this.courseClass?.id } as Student)
      .subscribe(student => {
        this.students?.push(student);
      });
  }

  deleteStudent(student: Student) { //Remove student 
    if (this.students) {
      this.students = this.students.filter(h => h !== student);
      this.courseClassService.deleteStudent(student.id).subscribe();
    }
  }


  saveScores() { //Post scores that are on the table
    console.log("saving scores")
    this.studentScores.forEach((scoreList) => {
      for(let score of scoreList) {
        console.log("handling score for student: " + score.studentClassId + " wich criterium: " + score.criteriumId + " Score: " + score.amount)
        if("id" in score) {
          this.courseClassService.updateScore(score).subscribe()
          console.log("I entered in updateScore");
        } else {
          this.courseClassService.createScore(score).subscribe();
          console.log("I entered in createScore");
        }
      }
    })
  }

  createNewStudentScore(student: Student, criterium: Criterium) { //Allows to start a new empty score (new button made)
    if(!this.studentScores.get(student.id)) {
      console.log("create list")
      this.studentScores.set(student.id, []);
    }

    let newScore: Score = {amount: "", studentClassId: student.id, criteriumId: criterium.id } as Score;
    
    console.log( "teste createNewStudenteScore" + this.studentScores.get(student.id))

    this.courseClassService.createScore(newScore).subscribe((newScoreWithId) => {
      this.studentScores.get(student.id)?.push(newScoreWithId);
    });
  }


  deleteNote(classNote: Note) { //Remove class notes
    if (this.classNotes) {
      this.classNotes = this.classNotes.filter(h => h !== classNote);
      this.courseClassService.deleteNote(classNote).subscribe();
    }
  }

  saveNote(value: string) { //Post Notes.. 
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    let newNote: Note = {note: value, courseClassId: id } as Note;
    this.courseClassService.createCourseClassNote(newNote).subscribe(note => {
      this.classNotes?.push(note);
      });
  }
}
