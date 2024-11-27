import { Component, inject } from '@angular/core';
import { StudentCardComponent } from "../../common/studentCard/studentCard-component";
import { IUser } from '../../../interfaces/iUser';
import { UserServiceService } from '../../../service/user-service.service';
import { IResponse } from '../../../interfaces/iresponse.interface';

@Component({
  selector: 'app-studentList-component',
  standalone: true,
  imports: [StudentCardComponent],
  templateUrl: './studentList-component.html',
  styleUrl: './studentList-component.css'
})
export class StudentListComponent {
  arrUsers: IUser[] = [];
  usersServices = inject(UserServiceService);
  totalPage: number = 0;
  currentPage: number = 1;


  ngOnInit(): void {
    this.getData(this.currentPage)
  }

  pagePrev() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getData(this.currentPage)
    }
  }
  pageNext() {
    if (this.currentPage < this.totalPage) {
      this.currentPage++
      this.getData(this.currentPage)
    }
  }

  async getData(page = 1) {
    try {
      let response: IResponse = await this.usersServices.getAllPages(page)
      this.totalPage = response.total_pages;
      this.currentPage = response.page;
      this.arrUsers = response.results;

    } catch (err) {
      console.log(err)
    }
  }

}
