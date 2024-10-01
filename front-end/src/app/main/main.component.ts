import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';  // Asegúrate de que el servicio API esté importado

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  nodeVersion: string = ''; // Variable para almacenar el mensaje desde Node.js

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Llamada al servicio para obtener el mensaje desde Node.js
    this.apiService.getNodeVersion().subscribe((data) => {
      this.nodeVersion = data.version;  // Asigna el mensaje recibido
    });
  }
}
