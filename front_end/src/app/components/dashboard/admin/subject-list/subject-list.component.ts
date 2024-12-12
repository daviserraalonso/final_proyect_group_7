import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SubjectService } from '../../../../service/subject.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ViewSubjectComponent } from '../view-subject/view-subject.component';
import { EditSubjectComponent } from '../edit-subject/edit-subject.component';
import { CreateSubjectComponent } from '../create-subject/create-subject.component'
import Swal from 'sweetalert2';




@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    CreateSubjectComponent,
    FormsModule
  ],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'course', 'description', 'finalGrade', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  searchText: string = '';
  subjects: any[] = [];
  filteredSubjects: any[] = [];
  

  constructor(private subjectService: SubjectService, private dialog: MatDialog) {}

  viewSubject(subject: any): void {
    this.dialog.open(ViewSubjectComponent, {
      width: '400px',
      data: subject,
    });
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
        this.dataSource.data = this.subjects; // Asigna los datos a la tabla
      },
      (error) => {
        console.error('Error al cargar asignaturas:', error);
      }
    );
  }

  applyFilter(filterValue: string): void {
    const filterText = filterValue.trim().toLowerCase();
    const filteredData = this.subjects.filter((subject) =>
      subject.name.toLowerCase().includes(filterText)
    );
    this.dataSource.data = filteredData; // Actualiza los datos de la tabla
  }
  

  editSubject(subject: any): void {
    const dialogRef = this.dialog.open(EditSubjectComponent, {
      width: '500px',
      data: subject,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        Swal.fire({
          text: `Asignatura ${result.name} actualizada`,
          width: 400,
          showConfirmButton: false,
          imageUrl: 'assets/logo.png',
          imageAlt: 'Icon image',
          imageHeight: 80,
          imageWidth: 60,
          timer: 2500
 
        });
        console.log('Asignatura actualizada:', result);
        // Lógica para actualizar la lista de asignaturas
      }
    });
  }

  deleteSubject(id: number, name: string): void {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Vas a eliminar la asignatura ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) =>
    { if(result.isConfirmed) {
      this.subjectService.deleteSubject(id).subscribe(
        () => {
          Swal.fire({
            text: 'Asignatura eliminada correctamente.',
            width: 400,
            showConfirmButton: false,
            imageUrl: 'assets/logo.png',
            imageAlt: 'Icon image',
            imageHeight: 80,
            imageWidth: 60,
            timer: 2500
          });
          console.log('Asignatura eliminada:', id);
          this.loadSubjects(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar asignatura:', error);
        }
      );


    }})

    


  }

  openCreateSubjectModal(): void {
    const dialogRef = this.dialog.open(CreateSubjectComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Swal.fire({
          text: `Nueva asignatura ${result.name} creada`,
          width: 400,
          showConfirmButton: false,
          imageUrl: 'assets/logo.png',
          imageAlt: 'Icon image',
          imageHeight: 80,
          imageWidth: 60,
          timer: 2500
        });
        console.log('Nueva asignatura creada:', result);
        this.loadSubjects(); // Recarga la lista de asignaturas tras crear una nueva
      }
    });
  }

}
