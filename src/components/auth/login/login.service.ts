import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../../../services/api.service";

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private apiService: ApiService) {}

    login(userData: any): Observable<any> {
        return this.apiService.post('/auth', userData);
    }
}