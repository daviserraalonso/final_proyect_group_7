import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';
import { UserAttributes } from '../../../interfaces/userAttributes';
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-register-teacher-component',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, ReactiveFormsModule, GoogleMapsModule],
  templateUrl: './register-teacher-component.component.html',
  styleUrl: './register-teacher-component.component.css'
})
export class RegisterTeacherComponentComponent {

  @ViewChild('cityInput') cityInput!: ElementRef

  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  userServices = inject(UserServiceService)
  headerForm: string = 'Registrarse como profesor' // header of form
  textButton: string = 'Enviar' // text of button submit
  registerTeacher: FormGroup;
  selectedPlace: any;


  // initialize form
  constructor() {
    this.registerTeacher = new FormGroup({
      roleId: new FormControl(2, []), //roldeId: 2 = teacher
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      mail: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      phone: new FormControl(null, [
        Validators.required
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      lat: new FormControl(null, [
        Validators.required
      ]),
      lng: new FormControl(null, [
        Validators.required
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

  ngAfterViewInit() {
    this.autocomplet()
  
  }
  

  // recovery user data to update
ngOnInit() {
  this.activateRoute.params.subscribe(async (params: any) => {
  if (params.id) {
    //if user exists change text of header and button
  this.headerForm = 'Actualizar el usuario'
  this.textButton = 'Actualizar datos'
  const user: UserAttributes = await this.userServices.getById(params.id)

  this.registerTeacher = new FormGroup({
    id: new FormControl(user.id, []),
    name: new FormControl(user.name, [
      Validators.required,
      Validators.minLength(3)
    ]),
    mail: new FormControl(user.email, [
      Validators.required,
      Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    ]),
    phone: new FormControl(user.phone, [
      Validators.required
    ]),
    city: new FormControl(null, [ // city ​​field missing in interface
      Validators.required,
      Validators.minLength(3)
    ]),
    lat: new FormControl(user.lat, [
      Validators.required
    ]),
    lng: new FormControl(user.lng, [
      Validators.required
    ]),
    password: new FormControl(user.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z]).+$/), // required one letter
      Validators.pattern(/^(?=.*[A-Z]).+$/), //required one capital letter
      Validators.pattern(/^(?=.*\d).+$/), // required one number
      Validators.pattern(/^(?=.*[@$!%*?&]).+$/), // requider special caracter
    ]),
    repeatPassword: new FormControl(user.password, []),
    roleId: new FormControl(user.roleId, [
      Validators.required
    ])
  }, [this.checkPassword])    
  }
})}


// verify that the two passwords are the same
checkPassword(formValue: AbstractControl): any {
  const password = formValue.get('password')?.value;
  const repeatPassword = formValue.get('repeatPassword')?.value;
  if (password !== repeatPassword) {
    return { 'checkpassword': true }
  } else {
    return null
  }
}

// error control in form fields
inputControl(formControlName: string, validador: string) {
  return this.registerTeacher.get(formControlName)?.hasError(validador) && this.registerTeacher.get(formControlName)?.touched;
}



// button to see the password
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


// sending form data to the service
async getdataForm() {
  console.log(this.registerTeacher.value)
  if (this.registerTeacher.value._id) {
    try {
      const user: UserAttributes = await this.userServices.update(this.registerTeacher.value)     
      if (user.id) {
        alert('Usuario actualizado')
      this.router.navigate([''])
    }    
    } catch (error) {
      console.log(error) 
    }
  } else {
    try {
      const user: UserAttributes = await this.userServices.insert(this.registerTeacher.value)
      if(user.id) {
        this.router.navigate([''])
      }
    } catch (error) {   
    }
  }
  }


    // Create a autocomplet in a Input City
  autocomplet() {
    const autocomplete = new google.maps.places.Autocomplete(this.cityInput.nativeElement);
    autocomplete.setTypes(['(cities)']); // to show only cities
    autocomplete.addListener('place_changed', () => {
      this.selectedPlace = autocomplete.getPlace();
      //add data to the form
      this.registerTeacher.patchValue({
        lat: this.selectedPlace.geometry.location.lat(),
        lng: this.selectedPlace.geometry.location.lng(),
        city: this.selectedPlace.name
      }) 
    });

  }
}



