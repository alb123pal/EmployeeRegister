import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.modal';
import {Observable, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) {}
    baseUrl = 'http://localhost:3000/employees';

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handlerError));
    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handlerError));
    }

    private handlerError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponse.error.message);
        } else {
            console.error('Server Error: ', errorResponse);
        }

        return throwError( 'There is a problem with  the service.');
    }

    addEmployee(employee: Employee) {
        return this.httpClient.post(this.baseUrl,
            employee, {
                headers: new HttpHeaders({
                    'content-type': 'application/json'
                })
            })
            .pipe(catchError(this.handlerError));
    }

    updateEmployee(employee: Employee) {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`,
            employee, {
                headers: new HttpHeaders({
                    'content-type': 'application/json'
                })
            })
            .pipe(catchError(this.handlerError));
    }

    deleteEmployee(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handlerError));
    }
}
