import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {};

    private getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('token');
      return token
        ? new HttpHeaders({ Authorization: `Bearer ${token}` })
        : new HttpHeaders();
      }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }

    post<T>(endpoint: string, body: unknown): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
    }

    postText(endpoint: string, body: unknown): Observable<string> {
      return this.http.post(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
        responseType: 'text'
      });
    }

    put<T>(endpoint: string, body: unknown): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }
}
