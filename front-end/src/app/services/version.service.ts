import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PackageJson {
  version: string;
  dependencies: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  constructor(private http: HttpClient) {}

  getAngularVersion(): Observable<string> {
    return this.http.get<PackageJson>('/assets/package.json').pipe(
      // Extraer la versión de Angular de las dependencias
      map(pkg => pkg.dependencies['@angular/core'])
    );
  }
}
