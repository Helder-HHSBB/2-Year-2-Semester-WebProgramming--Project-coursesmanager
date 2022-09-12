import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {CourseClass, Criterium, Note, Score, Student} from '../models/course';
import { MessageService } from '../message.service';


@Injectable({ providedIn: 'root' })
export class CourseClassService {

  private courseClasses = 'api/courseClasses';  // URL to web api
  private criteria = 'api/criteria';  // URL to web api
  private students = 'api/students';
  private scores = 'api/studentClassScores';
  private classNotes = 'api/classNotes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET courses from the server */
  getCourseClasses(): Observable<CourseClass[]> {
    return this.http.get<CourseClass[]>(this.courseClasses)
      .pipe(
        tap(_ => this.log('fetched courseClasses')),
        catchError(this.handleError<CourseClass[]>('getCourseClasses', []))
      );
  }

  /** GET course by id. Return `undefined` when id not found */
  getCourseClassNo404<Data>(id: number): Observable<CourseClass> {
    const url = `${this.courseClasses}/?id=${id}`;
    return this.http.get<CourseClass[]>(url)
      .pipe(
        map(courseClasses => courseClasses[0]), // returns a {0|1} element array
        tap(c => {
          const outcome = c ? 'fetched' : 'did not find';
          this.log(`${outcome} courseClass id=${id}`);
        }),
        catchError(this.handleError<CourseClass>(`getCourseClass id=${id}`))
      );
  }

  /** GET course by id. Will 404 if id not found */
  getCourseClass(id: number): Observable<CourseClass> {
    const url = `${this.courseClasses}/${id}`;
    return this.http.get<CourseClass>(url).pipe(
      tap(_ => this.log(`fetched courseClass id=${id}`)),
      catchError(this.handleError<CourseClass>(`getCourseClass id=${id}`))
    );
  }

  /* GET courses whose name contains search term */
  searchCourseClasses(courseId: number): Observable<CourseClass[]> {
    if (!courseId) {
      // if not search courseId, return empty course array.
      return of([]);
    }
    return this.http.get<CourseClass[]>(`${this.courseClasses}/?courseId=${courseId}`).pipe(
      tap(x => x.length ?
         this.log(`found courseClasses matching course id "${courseId}"`) :
         this.log(`no coursesClasses matching course id "${courseId}"`)),
      catchError(this.handleError<CourseClass[]>('searchCourses', []))
    );
  }

  searchCourseClassesByName(courseId: number, courseClassName: string): Observable<CourseClass[]> {
    if (!courseId) {
      // if not search courseId, return empty course array.
      return of([]);
    }
    return this.http.get<CourseClass[]>(`${this.courseClasses}/?courseId=${courseId}&name=${courseClassName}`).pipe(
      tap(x => x.length ?
        this.log(`found courseClasses matching course id "${courseId}"`) :
        this.log(`no coursesClasses matching course id "${courseId}"`)),
      catchError(this.handleError<CourseClass[]>('searchCourseClasses', []))
    );
  }

  getCourseClassCriteria(courseClassId: number): Observable<Criterium[]> {
    if (!courseClassId) {
      // if not search courseId, return empty course array.
      return of([]);
    }
    return this.http.get<Criterium[]>(`${this.criteria}/?courseClassId=${courseClassId}`).pipe(
      tap(x => x.length ?
        this.log(`found courseClasses matching criteria for id "${courseClassId}"`) :
        this.log(`no coursesClasses matching criteria for id "${courseClassId}"`)),
      catchError(this.handleError<Criterium[]>('getCourseClassCriteria', []))
    );
  }

  getCourseClassStudents(courseClassId: number): Observable<Student[]> {
    if (!courseClassId) {
      // if not search courseId, return empty course array.
      return of([]);
    }
    return this.http.get<Student[]>(`${this.students}/?courseClassId=${courseClassId}`).pipe(
      tap(x => x.length ?
        this.log(`found courseClasses matching studetns for id "${courseClassId}"`) :
        this.log(`no coursesClasses matching students for id "${courseClassId}"`)),
      catchError(this.handleError<Student[]>('getCourseClassStudents', []))
    );
  }

  getCourseClassNotes(courseClassId: number): Observable<Note[]> {
    if (!courseClassId) {
      // if not search courseId, return empty course array.
      return of([]);
    }
    return this.http.get<Note[]>(`${this.classNotes}/?courseClassId=${courseClassId}`).pipe(
      tap(x => x.length ?
        this.log(`found courseClasses matching Note for id "${courseClassId}"`) :
        this.log(`no coursesClasses matching Note for id "${courseClassId}"`)),
      catchError(this.handleError<Note[]>('getCourseClassNotes', []))
    );
  }


  getCourseClassStudentScores(studentClassId: number): Observable<Score[]> {
    if (!studentClassId) {
      // if not search courseId, return empty course array.
      console.log("I entered in getCourseClassStudentScores but found no studentClassId");
      return of([]);
    }
    console.log("I entered in getCourseClassStudentScores and have a valid studentClassId");
    return this.http.get<Score[]>(`${this.scores}/?studentClassId=${studentClassId}`).pipe(
      tap(x => x.length ?
        this.log(`found courseClasses matching studetns scores for id "${studentClassId}"`) :
        this.log(`no coursesClasses matching student scrores for id "${studentClassId}"`)),
      catchError(this.handleError<Score[]>('getCourseClassStudentScores', []))
    );
  }



  //////// Save methods //////////

  /** POST: add a new courseClass to the server */
  createCourseClass(courseClass: CourseClass): Observable<CourseClass> {
    return this.http.post<CourseClass>(this.courseClasses, courseClass, this.httpOptions).pipe(
      tap((newCourseClass: CourseClass) => this.log(`added courseClass w/ id=${newCourseClass.id}`)),
      catchError(this.handleError<CourseClass>('addCourseClass'))
    );
  }

  createCourseCriterium(param: Criterium) {
    return this.http.post<Criterium>(this.criteria, param, this.httpOptions).pipe(
      tap((newCriterium: Criterium) => this.log(`added courseClass w/ id=${newCriterium.id}`)),
      catchError(this.handleError<Criterium>('addCourseCriterium'))
    );
  }

  createStudent(param: Student) {
    return this.http.post<Student>(this.students, param, this.httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student w/ id=${newStudent.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  createScore(score: Score) {
    console.log("Criado score: " + score.amount);
    return this.http.post<Score>(this.scores, score, this.httpOptions).pipe(
      tap((newScore: Score) => this.log(`added new score w/ id=${newScore.id}`)),
      catchError(this.handleError<Score>('createScore'))
    );
  }

  //updateScore(score: Score): Observable<any> {
   // return this.http.put(this.scores, score, this.httpOptions).pipe(
   //tap(_ => this.log(`updated score id=${score.id}`)),
//      catchError(this.handleError<any>('updateScore'))
  //  );
  //}

  createCourseClassNote(newNote: Note) {
    return this.http.post<Note>(this.classNotes, newNote, this.httpOptions).pipe(
      tap((newNote: Note) => this.log(`added newNote w/ id=${newNote.id}`)),
      catchError(this.handleError<Note>('createCourseClassNote'))
    );
  }

  /** DELETE: delete the course from the server */
  deleteCourseClass(id: number): Observable<CourseClass> {
    const url = `${this.courseClasses}/${id}`;

    return this.http.delete<CourseClass>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted courseClass id=${id}`)),
      catchError(this.handleError<CourseClass>('deleteCourseClass'))
    );
  }
  deleteNote(classNote: Note) {
    const url = `${this.classNotes}/${classNote.id}`;

    return this.http.delete<Note>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted courseClass id=${classNote.id}`)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }


  deleteCriterium(id: number): Observable<Criterium> {
    const url = `${this.criteria}/${id}`;

    return this.http.delete<Criterium>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted criterium id=${id}`)),
      catchError(this.handleError<Criterium>('deleteCriterium'))
    );
  }

  deleteStudent(id: number): Observable<Student> {
    const url = `${this.students}/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the courseClass on the server */
  updateCourseClass(courseClass: CourseClass): Observable<any> {
    return this.http.put(this.courseClasses, courseClass, this.httpOptions).pipe(
      tap(_ => this.log(`updated courseClass id=${courseClass.id}`)),
      catchError(this.handleError<any>('updateCourseClass'))
    );
  }

  updateScore(score: Score): Observable<any> {
    return this.http.put(this.scores, score, this.httpOptions).pipe(
      tap(_ => this.log(`updated score id=${score.id}`)),
      catchError(this.handleError<any>('updateScore'))
    );
  }

  

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO enviar log do erro para sitio adequado
      console.error(error); // log na consola para ja

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a CourseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CourseService: ${message}`);
  }



}
