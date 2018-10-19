import {Pipe, PipeTransform} from '@angular/core';
import {Employee} from '../models/employee.modal';

@Pipe({
    name: 'employeeFilter',
    pure: true
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[], searchTerm: string) {
        if (!employees || !searchTerm) {
            return employees;
        }

        return employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
    }
}
