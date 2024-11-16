import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../../../../service/course.service';
import { ViewCourseComponent } from '../view-course/view-course.component';
import { EditCourseComponent } from '../edit-course/edit-course.component';
import { CreateCourseComponent } from '../create-course/create-course.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private courseService: CourseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    );
  }

  viewCourse(course: any): void {
    this.dialog.open(ViewCourseComponent, {
      width: '400px',
      data: course,
    });
  }

  editCourse(course: any): void {
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '500px',
      data: course,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Curso actualizado:', result);
        this.loadCourses(); // Recargar la lista tras editar
      }
    });
  }

  deleteCourse(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe(
        () => {
          console.log('Curso eliminado:', id);
          this.loadCourses(); // Recargar la lista
        },
        (error) => {
          console.error('Error al eliminar el curso:', error);
        }
      );
    }
  }

  openCreateCourseModal(): void {
    const dialogRef = this.dialog.open(CreateCourseComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Curso creado:', result);
        this.loadCourses(); // Recargar la lista tras la creación
      }
    });
  }
  



}
