import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
	selector: 'app-employee-add-edit',
	templateUrl: './employee-add-edit.component.html',
	styleUrls: ['./employee-add-edit.component.scss'],
})
export class EmployeeAddEditComponent implements OnInit {
	empForm: FormGroup;

	designations: string[] = [
		'Associate',
		'Senior Associate',
		'Supervising Associate',
		'Assistant Director',
	];

	constructor(
		private _fb: FormBuilder,
		private _employee: EmployeeService,
		private _dialogRef: MatDialogRef<EmployeeAddEditComponent>,
		@Inject(MAT_DIALOG_DATA) public empData: Employee
	) {
		this.empForm = this._fb.group({
			firstName: '',
			lastName: '',
			email: '',
			dob: '',
			gender: '',
			role: '',
			experience: '',
		});
	}
	ngOnInit(): void {
		this.empForm.patchValue(this.empData);
	}

	private addEmployee(data: Employee): void {
		this._employee.addEmployee(data).subscribe({
			next: (value: any) => {
				alert('Employee added successfully');
				this._dialogRef.close(true);
			},
			error: (err: any) => {
				console.log(err);
			},
		});
	}

	private updateEmployee(employeeId: number, data: Employee): void {
		this._employee.updateEmployee(employeeId, data).subscribe({
			next: (value: any) => {
				console.log('updatd value', value);
				alert('Employee updated successfully');
				this._dialogRef.close(true);
			},
			error: (err: any) => {
				console.log(err);
			},
		});
	}

	onFormSubmit(): void {
		if (this.empForm.valid) {
			const formData = this.empForm.value;
			console.log(formData);
			if (this.empData) {
				const { id } = this.empData;
				this.updateEmployee(id, formData);
			} else {
				this.addEmployee(formData);
			}
		}
	}

	onClose(): void {
		this._dialogRef.close();
	}
}
