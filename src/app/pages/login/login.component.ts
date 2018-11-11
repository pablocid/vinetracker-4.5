import { Component, OnInit } from '@angular/core';
import { UserService, UserQuery } from 'src/app/store/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl: FormControl;
  email;
  password;
  constructor(
    public userS: UserService,
    public userQ: UserQuery,
    public router: Router,
    public dialog: MatDialog
  ) { }

  public isLogged$ = this.userQ.isLogged();
  public userEmail$ = this.userQ.userEmail();

  ngOnInit() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  }

  async login() {
    await this.userS.auth({ email: this.email, password: this.password });
    this.router.navigate(['home']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
