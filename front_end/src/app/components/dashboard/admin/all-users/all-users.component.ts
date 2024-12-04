import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserServiceService } from '../../../../service/user-service.service';
import { UserAttributes } from '../../../../interfaces/userAttributes';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    UserDetailModalComponent,
  ],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'isValidated', 'actions'];
  dataSource = new MatTableDataSource<UserAttributes>();

  constructor(
    private dialog: MatDialog,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    this.dataSource.filterPredicate = (data: UserAttributes, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
    
      const name = data.name ? data.name.toLowerCase() : '';
      const email = data.email ? data.email.toLowerCase() : '';
      const roleId = data.roleId !== undefined && data.roleId !== null ? data.roleId.toString() : '';
    
      return (
        name.includes(normalizedFilter) ||
        email.includes(normalizedFilter) ||
        roleId.includes(normalizedFilter)
      );
    };
  }

  getRoleName(roleId: number): string {
    switch (roleId) {
      case 1:
        return 'admin';
      case 2:
        return 'teacher';
      case 3:
        return 'student';
      default:
        return 'Unknown';
    }
  }

  loadUsers(): void {
    this.userService.getAll().then((data) => {
      this.dataSource.data = data;
      console.log(this.dataSource.data)
    }).catch((error) => {
      console.error('Error loading users:', error);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Obtiene el valor del input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Asegúrate de que es un string
  }

  viewUser(userId: number): void {
    this.userService.getUserDetails(userId).then((data) => {
      this.dialog.open(UserDetailModalComponent, {
        width: '400px',
        data,
      });
    }).catch((error) => {
      console.error('Error al obtener detalles del usuario:', error);
    });
  }

  editUser(userId: number): void {
    this.userService.getUserDetails(userId).then((data) => {
      const dialogRef = this.dialog.open(EditUserModalComponent, {
        width: '600px',
        data, // Pasar los datos del usuario al modal
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log('Usuario actualizado');
          this.loadUsers(); // Recargar la lista de usuarios
        }
      });
    }).catch((error) => {
      console.error('Error al obtener detalles del usuario:', error);
    });
  }
  

  deleteUser(userId: number): void {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a eliminar al usuario`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) =>
    { if(result.isConfirmed) {
      this.userService.delete(userId).then(() => {
        console.log(`Usuario con ID ${userId} eliminado`);
        // Eliminar el usuario del dataSource localmente
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }).catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
    }}
  )}


}
