import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(userName: string, sortBy : string): Observable<any[]> {
    let url = 'http://api.github.com/search/users?q=' + userName + '&page=1&per_page=10'; //&sort=id&order=desc&page=1&per_page=10
    return this.http.get<any[]>(url)
    .pipe(    
      catchError(this.handleError)
    );
  }

  userRepoDetails(userName: string){
    let url = 'http://api.github.com/users/' + userName + '/repos';
    return this.http.get<any[]>(url)
    .pipe(    
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {

    if (error.status === 401) {
        return Observable.throw(error.status);
    } else {
        return Observable.throw(error.status || 'Server error');
    }
  }
}
