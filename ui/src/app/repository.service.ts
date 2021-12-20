import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(private http: HttpClient) { }

  public getRepositories(): Observable<Repository[]> {
    return this.http.get<Repository[]>("/repositories")
  }
}
