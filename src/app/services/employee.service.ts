import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	private _url = 'http://localhost:3000/employees';
	constructor(private _http: HttpClient) {}

	addEmployee(data: Employee): Observable<Employee> {
		return this._http.post<Employee>(this._url, data);
	}

	updateEmployee(employeeId: number, data: Employee): Observable<Employee> {
		return this._http.put<Employee>(`${this._url}/${employeeId}`, data);
	}

	getEmployeeList(): Observable<Employee[]> {
		return this._http.get<Employee[]>(this._url);
	}

	deleteEmployee(employeeId: number): Observable<Employee | null> {
		return this._http.delete<Employee | null>(`${this._url}/${employeeId}`);
	}
}
