import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent {

  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;

  users: User[] = [{name: 'test', email: 'test'}];
  displayedColumns: string[] = ['position', 'name', 'email', 'action'];
  dataSource = this.users;


  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' : '';
  }

  constructor() { }


  addUser(name: string, email: string) {
    this.users.push({name, email});
    this.dataSource = [...this.users];

    this.name.setValue('');
    this.name.markAsUntouched();
    this.name.setErrors(null);

    this.email.setValue('');
    this.email.markAsUntouched();
    this.email.setErrors(null);

    setTimeout(() => {this.nameInput.nativeElement.focus();}, 100);
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
    this.dataSource = [...this.users];
  }

}

export interface User {
  name: string;
  email: string;
}
