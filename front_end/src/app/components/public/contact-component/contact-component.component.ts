import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../../service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './contact-component.component.html',
  styleUrl: './contact-component.component.css'
})

export class ContactComponentComponent {
  contactForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.successMessage = '';
      this.errorMessage = '';

      this.contactService.sendContactForm(this.contactForm.value).subscribe({
        next: () => {
          this.successMessage = 'El correo se ha enviado exitosamente.';
          Swal.fire({
            text: 'El correo se ha enviado con éxito',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 4000
          });
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Error al enviar el correo:', err);
          this.errorMessage = 'Hubo un error al enviar el correo. Inténtalo nuevamente.';
          Swal.fire({
            text: 'Error al enviar el correo',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 2500
          });
        }
      });
    }
  }
}
