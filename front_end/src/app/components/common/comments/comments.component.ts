import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { ScoreService } from '../../../service/score.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  arrComments: any[] = []
  scoreServices = inject(ScoreService)

  score = Array(5)

  async ngOnInit() {
    const userId = 3
    this.arrComments = await this.scoreServices.getComments(userId)
    console.log(this.arrComments)

  }

}
