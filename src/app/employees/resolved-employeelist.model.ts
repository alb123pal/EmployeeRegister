import {Employee} from '../models/employee.modal';

export class ResolvedEmployeelist {
    constructor(public employeeList: Employee[], public error: any = null) {}
}