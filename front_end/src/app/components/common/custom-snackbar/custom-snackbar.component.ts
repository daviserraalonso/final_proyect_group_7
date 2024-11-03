import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  template: ` <span class="custom-snackbar">
  👍 {{ data }}
</span>`,
  styles: [`
    .custom-snackbar {
      background-color: #4caf50 !important; /* Fondo verde */
      color: #ffffff !important; /* Texto blanco */
      font-weight: bold;
      padding: 16px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
      text-transform: uppercase;
      font-size: 1rem;
      letter-spacing: 0.5px;
      animation: fadeInOut 3s ease-in-out, slideIn 0.5s ease-out;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes slideIn {
      0% { transform: translateY(100%); }
      100% { transform: translateY(0); }
    }
  `]
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}