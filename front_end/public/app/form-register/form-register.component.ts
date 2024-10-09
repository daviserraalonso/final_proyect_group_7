import { Component } from '@angular/core';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
  private currentStep = 1;

  nextStep() {
    if (this.currentStep < 3) {
      document.getElementById(`step${this.currentStep}`)?.classList.add('d-none');
      this.currentStep++;
      document.getElementById(`step${this.currentStep}`)?.classList.remove('d-none');
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      document.getElementById(`step${this.currentStep}`)?.classList.add('d-none');
      this.currentStep--;
      document.getElementById(`step${this.currentStep}`)?.classList.remove('d-none');
    }
  }
}
