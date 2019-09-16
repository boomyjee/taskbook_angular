import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private signInForm: FormGroup;
  private isLoggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private viewRef: ViewContainerRef,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLogged();

    if (this.isLoggedIn) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  createForm() {
    this.signInForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const { login, password } = this.signInForm.value;

    const isLoggedIn = this.authService.authorize(login, password, this.viewRef);

    if (isLoggedIn) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
