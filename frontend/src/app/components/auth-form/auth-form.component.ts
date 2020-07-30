import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { SubSink } from 'subsink';

import { ToastrService } from 'ngx-toastr';

class User {
  company: string;
  email: string;
  password: string;
  employees?: [];
}
@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})


export class AuthFormComponent implements OnInit, OnDestroy {
  registerUrl: boolean;

  private subs: SubSink = new SubSink(); 

  user: User = new User();

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.registerOrLogin();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  registerOrLogin(): void {
    const url = this.router.url;

    url.includes('register')
      ? this.registerUrl = true
      : this.registerUrl = false;
  }

  createAccount(): void {
    const createAccService = this.authService.createAccount(this.user);
    this.subs.add(createAccService.subscribe(
      () => true,
      (err: Error) => this.toastr.error('Try later, now we cant create your account', 'Error'),
      () => this.registerUrl = false
    ));
  }

  loginAccount(): void {
    const loginAccService = this.authService.loginAccount(this.user);

    this.subs.add(loginAccService.subscribe(
      () => true,
      (err: Error) => this.toastr.error('Try later, now we cant log in your account', 'Error'),
      () => this.router.navigate(['/dashboard'])
    ));
  }

}
