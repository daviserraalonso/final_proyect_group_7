import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  nodeVersion: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Call to nodejs to get version
    this.apiService.getNodeVersion().subscribe((data) => {
      this.nodeVersion = data.version;
    });
  }
}
