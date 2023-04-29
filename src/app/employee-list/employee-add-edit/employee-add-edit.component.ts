import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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

	constructor(private _fb: FormBuilder) {
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

	onFormSubmit(): void {
		if (this.empForm.valid) {
			console.log(this.empForm.value);
		}
	}
}
