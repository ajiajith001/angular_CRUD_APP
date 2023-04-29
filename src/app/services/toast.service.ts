import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor(private _snackBar: MatSnackBar) {}

	open(
		message: string,
		action?: string | undefined,
		config: MatSnackBarConfig = {
			duration: 2000,
			verticalPosition: 'top',
		}
	) {
		this._snackBar.open(message, action, config);
	}
}
