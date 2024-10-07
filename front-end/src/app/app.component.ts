import { Component, OnInit } from '@angular/core';
import { VersionService } from './services/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  angularVersion: string = '';
  title = 'front-end';

  constructor(private versionService: VersionService) {}

  ngOnInit(): void {
    this.versionService.getAngularVersion().subscribe((version) => {
      this.angularVersion = version;
    });
  }
}
