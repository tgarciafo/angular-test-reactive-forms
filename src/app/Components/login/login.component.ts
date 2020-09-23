import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckWord } from 'src/app/Directives/check-word.validator';
import { checkEquality } from 'src/app/Directives/check-equality.validator';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = new User();

  public name: FormControl;
  public surname: FormControl;
  public birthdate: FormControl;
  public email: FormControl;
  public age: FormControl;
  public telephone: FormControl;
  public description: FormControl;
  public password: FormControl;
  public loginForm: FormGroup;
  private date = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.name = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25), CheckWord.checkInvalidWord(/administrator/)]);
    this.surname = new FormControl('', [Validators.minLength(5), Validators.maxLength(25)]);
    this.birthdate = new FormControl('', Validators.pattern(this.date));
    this.email = new FormControl('', Validators.required);
    this.age = new FormControl('', [Validators.required, Validators.min(18)] );
    this.telephone = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.maxLength(200));
    this.password = new FormControl('', [Validators.required, Validators.minLength(4)]);

    this.loginForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      birthdate: this.birthdate,
      email: this.email,
      age: this.age,
      telephone: this.telephone,
      description: this.description,
      password: this.password
    }, {
      validators: checkEquality
    });

  }

  public checkLogin() {
    this.user.name = this.name.value;
    this.user.surname =  this.surname.value;
    this.user.birthdate =  this.birthdate.value;
    this.user.email =  this.email.value;
    this.user.age =  this.age.value;
    this.user.telephone =  this.telephone.value;
    this.user.description = this.description.value;
    this.user.password = this.password.value;
    console.log('User name --> ' + this.user.name + ' User surname --> ' + this.user.surname + ' User birthdate --> ' + this.user.birthdate + ' User email --> ' + this.user.email + ' User age --> ' + this.user.age + ' User telephone --> ' + this.user.telephone + ' User description --> ' + this.user.description + ' User password --> ' + this.user.password);
  }

  validatorEquality(): boolean{
    return this.loginForm.hasError('equals') && this.loginForm.get('name').dirty && this.loginForm.get('surname').dirty;
  }

}