import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { AuthService } from '../_services/auth.service';

import { SignInComponent } from './sign-in.component';

class MockRouter { public navigate() {}; }

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, ToastModule.forRoot() ],
      declarations: [ SignInComponent, NgModel ],
      providers: [
        AuthService,
        {provide: Router,  useClass: MockRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
