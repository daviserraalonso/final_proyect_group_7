import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ScoreService } from '../../../service/score.service';
import {MatIconModule} from '@angular/material/icon';

export type Comments = {
  comments: string,
  rating_teacher: number
}

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  scoreServices = inject(ScoreService)

  score = Array(5)
  arrComments: Comments[] = []


  async ngOnInit() {
    const userId = 3
    this.arrComments = await this.scoreServices.getComments(userId)
    console.log(this.arrComments)

  }

}
