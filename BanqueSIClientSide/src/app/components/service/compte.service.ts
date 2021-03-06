import {Injectable} from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { map, distinctUntilChanged, debounceTime, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class CompteService {
    
    private tokeyKey = "token";
    constructor(private http: HttpClient,private jwtHelper: JwtHelper){
    }

    getCompteByNumber(numberACC) {
        return this.authGet$(`http://localhost:44365/api/GetCompte/`+numberACC)
    }

     //-- GET LIST ACCOUNT BY AGENCY
    GetListAccountByAgency(idAgence) {
        return this.authGet$(`http://localhost:44365/api/GetListAccountByAgency/`+idAgence);
    }
    //-- END GET LIST ACCOUNT BY AGENCY

    //-- SECURING API DATA
    public authGet$(url) {
        let header = this.initAuthHeaders();
        let options = { headers: header };
        return this.http.get<any>(url, options).pipe(
            debounceTime(200),
            distinctUntilChanged(),
            catchError(this.handleError<any>("authGet")));
    }

    private getLocalToken(): string {
        return sessionStorage.getItem(this.tokeyKey);
    }

    private initAuthHeaders(): HttpHeaders {
        let token = this.getLocalToken();
        if (token == null) throw "No token";

        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set("Authorization", "Bearer " + token);
        return headers;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} error: ${error.message}`);
            return of(result as T);
        };
    }
    //-- END SECURING API DATA
}