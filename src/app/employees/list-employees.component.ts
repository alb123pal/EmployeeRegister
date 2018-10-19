import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee.modal';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './list-employees.component.html',
    styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
    employees: Employee[];
    _searchTerm: string;
    private filteredEmployees: Employee[];
    error: string;

    get searchTerm(): string {
        return this._searchTerm;
    }

    set searchTerm(value: string) {
        this._searchTerm = value;
        this.filteredEmployees = this.filtereEmployees(value);
    }

    filtereEmployees(searchString: string) {
        return this.employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
    }

    constructor(private _route: ActivatedRoute) {
        const resolvedData: Employee[] | string = this.employees = this._route.snapshot.data['employeeList'];
        if (Array.isArray(resolvedData)) {
            this.employees = resolvedData;
        } else {
            this.error = resolvedData;
        }
        if (this._route.snapshot.queryParamMap.has('searchTerm')) {
            this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
        } else {
            this.filteredEmployees = this.employees;
        }
    }

    onDeleteNotification(id: number) {
        const i = this.filteredEmployees.findIndex(e => e.id === id);
        if (i !== -1) {
            this.filteredEmployees.splice(i, 1);
        }
    }

    ngOnInit() {

    }
}
