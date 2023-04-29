import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
	selector: 'app-employee-add-edit',
	templateUrl: './employee-add-edit.component.html',
	styleUrls: ['./employee-add-edit.component.scss'],
})
export class EmployeeAddEditComponent {
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
		private _dialogRef: MatDialogRef<EmployeeAddEditComponent>
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

	onFormSubmit(): void {
		if (this.empForm.valid) {
			console.log(this.empForm.value);
			this.addEmployee(this.empForm.value);
		}
	}

	onClose(): void {
		this._dialogRef.close();
	}
}
