import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../service/user-service.service';
import { IUser } from '../../../interfaces/iUser';
import { UserAttributes } from '../../../interfaces/userAttributes';
@Component({
  selector: 'app-studentView',
  standalone: true,
  imports: [],
  templateUrl: './studentView.html',
  styleUrl: './studentView.css'
})
export class StudentViewComponent {
  activateRoute = inject(ActivatedRoute);
  usersService = inject(UserServiceService);
  user!: UserAttributes;

  ngOnInit(): void {
    this.activateRoute.params.subscribe(async (params: any) => {
      try {
        let id: string = params.id
        this.user = await this.usersService.getById(id)
      } catch (err) {
        console.log(err)
      }

    })
  }

}
