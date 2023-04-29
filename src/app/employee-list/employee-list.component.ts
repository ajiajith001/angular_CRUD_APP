import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';

@Component({
	selector: 'app-employee-list',
	templateUrl: './employee-list.component.html',
	styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
	constructor(private _dialog: MatDialog) {}

	openAddEditEmpForm() {
		this._dialog.open(EmployeeAddEditComponent);
	}
}
