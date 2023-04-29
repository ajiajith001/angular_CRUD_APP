import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private _http: HttpClient) {}

	addEmployee(data: Employee): Observable<Employee> {
		return this._http.post<Employee>(
			'http://localhost:3000/employees',
			data
		);
	}

	getEmployeeList(): Observable<Employee[]> {
		return this._http.get<Employee[]>('http://localhost:3000/employees');
	}

	deleteEmployee(id: number): Observable<Employee | null> {
		return this._http.delete<Employee | null>(
			`http://localhost:3000/employees/${id}`
		);
	}
}
