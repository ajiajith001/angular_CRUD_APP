import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
	displayedColumns: string[] = [
		'id',
		'firstName',
		'lastName',
		'email',
		'gender',
		'dob',
		'role',
		'experience',
		'actions',
	];
	employeeDataSource!: MatTableDataSource<Employee>;

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private _dialog: MatDialog,
		private _employee: EmployeeService
	) {}

	ngOnInit(): void {
		this.getEmployeeList();
	}

	getEmployeeList(): void {
		this._employee.getEmployeeList().subscribe({
			next: (data: Employee[]) => {
				this.employeeDataSource = new MatTableDataSource(data);
				this.employeeDataSource.paginator = this.paginator;
				this.employeeDataSource.sort = this.sort;
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	deleteEmployee(id: number): void {
		this._employee.deleteEmployee(id).subscribe({
			next: () => {
				alert('Employee deleted successfully');
				this.getEmployeeList();
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	openEditEmpForm(data: Employee) {
		const dialogRef = this._dialog.open(EmployeeAddEditComponent, {
			data,
		});
		dialogRef.afterClosed().subscribe({
			next: (value) => {
				console.log('closed with value ', value);
				value && this.getEmployeeList();
			},
		});
	}

	openAddEditEmpForm() {
		const dialogRef = this._dialog.open(EmployeeAddEditComponent);
		dialogRef.afterClosed().subscribe({
			next: (value) => {
				console.log('closed with value ', value);
				value && this.getEmployeeList();
			},
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.employeeDataSource.filter = filterValue.trim().toLowerCase();

		if (this.employeeDataSource.paginator) {
			this.employeeDataSource.paginator.firstPage();
		}
	}
}
