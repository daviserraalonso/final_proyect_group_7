// import { Component, inject } from '@angular/core';
// import { AlertsComponent } from "../../components/alerts/alerts.component";
// import { ButtonsComponent } from "../../components/buttons/buttons.component";
// import { ActivatedRoute } from '@angular/router';
// import { UsersService } from '../../services/users.service';
// import { IUser } from '../../interfaces/iuser.interfaces';

// @Component({
//   selector: 'app-user-view',
//   standalone: true,
//   imports: [AlertsComponent, ButtonsComponent],
//   templateUrl: './user-view.component.html',
//   styleUrl: './user-view.component.css'
// })
// export class UserViewComponent {
//   activateRoute = inject(ActivatedRoute);
//   usersService = inject(UsersService);
//   user!: IUser;

//   ngOnInit(): void {
//     this.activateRoute.params.subscribe(async (params: any) => {
//       try {
//         let id: string = params.userId
//         this.user = await this.usersService.getById(id)
//       } catch (err) {
//         console.log(err)
//       }

//     })
//   }

// }
