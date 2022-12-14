import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Course } from '../models/course';
import { MessageService } from '../message.service';


@Injectable({ providedIn: 'root' })
export class CourseService {

  private coursesUrl = 'api/courses';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET courses from the server */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => this.log('fetched course')),
        catchError(this.handleError<Course[]>('getCourses', []))
      );
  }

  /** GET course by id. Return `undefined` when id not found */
  getCourseNo404<Data>(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/?id=${id}`;
    return this.http.get<Course[]>(url)
      .pipe(
        map(courses => courses[0]), // returns a {0|1} element array
        tap(c => {
          const outcome = c ? 'fetched' : 'did not find';
          this.log(`${outcome} course id=${id}`);
        }),
        catchError(this.handleError<Course>(`getCourse id=${id}`))
      );
  }

  /** GET course by id. Will 404 if id not found */
  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => this.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }

  /* GET courses whose name contains search term */
  searchCourses(term: string): Observable<Course[]> {
    if (!term.trim()) {
      // if not search term, return empty course array.
      return of([]);
    }
    return this.http.get<Course[]>(`${this.coursesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found courses matching "${term}"`) :
         this.log(`no courses matching "${term}"`)),
      catchError(this.handleError<Course[]>('searchCourses', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new course to the server */
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
      tap((newCourse: Course) => this.log(`added course w/ id=${newCourse.id}`)),
      catchError(this.handleError<Course>('addCourse'))
    );
  }

  /** DELETE: delete the course from the server */
  deleteCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;

    return this.http.delete<Course>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted course id=${id}`)),
      catchError(this.handleError<Course>('deleteCourse'))
    );
  }

  /** PUT: update the course on the server */
  updateCourse(course: Course): Observable<any> {
    return this.http.put(this.coursesUrl, course, this.httpOptions).pipe(
      tap(_ => this.log(`updated couse id=${course.id}`)),
      catchError(this.handleError<any>('updateCourse'))
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

      
      console.error(error); // log to console 

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a CourseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CourseService: ${message}`);
  }
}
