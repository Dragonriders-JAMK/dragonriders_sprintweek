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
  // Opiskelijan haku id:n perusteella. Palauttaa observablena opiskelijan.
  /*
  getStudent(id: number): Observable<Student> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Student>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  */

  /** POST: lisätään opiskelija palvelimelle.
   * Studentin tyyppi on any, koska _id puuttuu eikä noudateta student.ts:n mallia.
   * _id jätetään pois opiskelijaa lisättaessä, koska Mongo lisää sen automaattisesti
   */
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

  /** DELETE: Poistetaan opiskelija id:n perusteella.
   *  Token laitettu menemään headerin mukana
   */
  delKartta(id: string): Observable<Kartta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Kartta>(url).pipe(catchError(this.handleError));
  }
}

