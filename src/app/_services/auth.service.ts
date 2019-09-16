import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private TOKEN: string = 'isLoggedIn_taskbook';

  constructor(
    private toastr: ToastsManager,
    private router: Router
  ) { }

  isLogged() {
    return !!localStorage.getItem(this.TOKEN);
  }

  authorize(login, password, ref) {
    this.toastr.setRootViewContainerRef(ref);

    if (login === 'admin' && password === '123') {
      localStorage.setItem(this.TOKEN, '1');
      this.toastr.success('You are logged in', 'Yo!');
    } else {
      localStorage.setItem(this.TOKEN, '');
      this.toastr.error('Wrong login or password', 'Oops!');
    }

    return !!localStorage.getItem(this.TOKEN);
  }

  signOut() {
    localStorage.setItem(this.TOKEN, '');

    this.router.navigateByUrl('/dashboard');
  }

}
