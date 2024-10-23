import { Component, inject, signal } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../../interfaces/iuser.interface';
import { UserServiceService } from '../../../service/user-service.service';

@Component({
  selector: 'app-register-student-component',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule ],
  templateUrl: './register-student-component.component.html',
  styleUrl: './register-student-component.component.css'
})
export class RegisterStudentComponentComponent {

  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  userServices = inject(UserServiceService)
  headerForm: string = 'Registarse como Alumno' // header of form
  textButton: string = 'Enviar' // text of button submit
  registerStudent: FormGroup;

  constructor() {
    this.registerStudent = new FormGroup({
      roleId: new FormControl(2, []), // roleId: 3 = student
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      mail: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
        Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
        Validators.pattern(/^(?=.*\d).+$/), // required one number
        Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
      ]),
      repeatPassword: new FormControl (null, [
        Validators.required
      ])
    }, [this.checkPassword])
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(async (params: any) => {
    if (params.id) {
    this.headerForm = 'Actualizar el usuario'
    this.textButton = 'Actualizar datos'
    const user: Iuser = await this.userServices.getById(params.id)

    this.registerStudent = new FormGroup({
      id: new FormControl(user.id, []),
      name: new FormControl(user.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      mail: new FormControl(user.email, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
        Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
        Validators.pattern(/^(?=.*\d).+$/), // required one number
        Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
      ]),
      repeatPassword: new FormControl(user.password, [
        Validators.required
      ]),
      roleId: new FormControl(user.roleId, [])
    }, [this.checkPassword])    
    }
  })
}

checkPassword(formValue: AbstractControl): any {
  const password = formValue.get('password')?.value;
  const repeatPassword = formValue.get('repeatPassword')?.value;
  if (password !== repeatPassword) {
    return { 'checkpassword': true }
  } else {
    return null
  }
}

inputControl(formControlName: string, validador: string) {
  return this.registerStudent.get(formControlName)?.hasError(validador) && this.registerStudent.get(formControlName)?.touched;
}



  
hide = signal(true);
clickEvent(event: MouseEvent) {
  this.hide.set(!this.hide());
  event.stopPropagation();
}

hide2 = signal(true);
clickEvent2(event: MouseEvent) {
  this.hide2.set(!this.hide2());
  event.stopPropagation();
}

async getdataForm() {
  if (this.registerStudent.value._id) {
    try {
      const user: Iuser = await this.userServices.update(this.registerStudent.value)     
      if (user.id) {
        alert('Usuario actualizado')
      this.router.navigate([''])
    }   
    } catch (error) {
      console.log(error)  
    }
  } else {
    try {
      const user: Iuser = await this.userServices.insert(this.registerStudent.value)
      if(user.id) {
        this.router.navigate([''])
      }
    } catch (error) {   
    }
  }
  }
}
