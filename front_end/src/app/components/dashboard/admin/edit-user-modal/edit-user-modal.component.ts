import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserServiceService } from '../../../../service/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent {
  editUserForm: FormGroup;
  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Teacher' },
    { id: 3, name: 'Student' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditUserModalComponent>,
    private fb: FormBuilder,
    private userService: UserServiceService
  ) {
    this.editUserForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      password: [''], // Opcional
      roleId: [data.roleId],
      phone: [data.details?.phone || ''],
      address: [data.details?.address || ''],
      description: [data.details?.description || ''],
      img_url: [data.details?.img_url || ''],
      lat: [data.details?.lat || ''],
      lng: [data.details?.lng || ''],
    });
  }

  save(): void {
    const updatedUser = this.editUserForm.value;
    this.userService.updateUser(this.data.id, updatedUser).then(() => {
      console.log('Usuario actualizado');
      this.dialogRef.close(true);
    }).catch((error) => {
      console.error('Error al actualizar el usuario:', error);
    });
  }
}
