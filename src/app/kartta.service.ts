import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kartta } from './kartta';
import { catchError } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class KarttaService {
  private apiUrl = 'http://localhost:3000/karttas'; // apin osoite

  constructor(private http: HttpClient) {} // HttpClientin DI

  // Virheenkäsittelymetodi joka palauttaa observablen
  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return error.message || error;
  }
  // Kaikkien opiskelijoiden haku. Palauttaa observablena opiskelijataulukon
  getKarttas(): Observable<Kartta[]> {
    return this.http
      .get<Kartta[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  addKartta(kartta: any): Observable<Kartta> {
    return this.http
      .post<Kartta>(this.apiUrl, kartta, headers)
      .pipe(catchError(this.handleError));
  }
  /** PUT: Päivitetään opiskelija id:n perusteella. */
  updateKartta(kartta: any): Observable<Kartta> {
    const url = `${this.apiUrl}/${kartta._id}`;
    return this.http
      .put<Kartta>(url, kartta, headers)
      .pipe(catchError(this.handleError));
  }

  delKartta(id: string): Observable<Kartta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Kartta>(url).pipe(catchError(this.handleError));
  }
}
