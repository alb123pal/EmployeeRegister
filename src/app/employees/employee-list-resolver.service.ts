import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Employee} from '../models/employee.modal';
import {Observable} from 'rxjs';
import {EmployeeService} from './employee.service';
import {Injectable} from '@angular/core';
import {map, catchError} from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
    constructor(private _employeService: EmployeeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
        return this._employeService.getEmployees()
            .pipe(
                catchError((err: string) => Observable.of(err))
            );
    }
}
