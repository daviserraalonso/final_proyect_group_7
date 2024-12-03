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
import Swal from 'sweetalert2'



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
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      phone: new FormControl(null, [
        Validators.required
      ]),
      address: new FormControl(null, [
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
    try {
      const user: UserAttributes = await this.userServices.insert(this.registerTeacher.value)
      if(user.id) {
        Swal.fire({
          text: `Enhorabuena ${user.name}, te has registrado con exito`,
          footer: 'Tu usuario queda pendiente de validación por el administrador',
          width: 400,
          showConfirmButton: false,
          imageUrl: 'assets/logo.png',
          imageAlt: 'Icon image',
          imageHeight: 80,
          imageWidth: 60,
          timer: 4000
 
        });
        this.router.navigate([''])
        this.registerTeacher.reset()
      }
    } catch (error) {   
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
        address: this.selectedPlace.name
      }) 
    });

  }
}



