import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadRepositories, setRepositories} from "./app.actions";
import {map, mergeMap} from "rxjs";
import {RepositoryService} from "./repository.service";


@Injectable()
export class AppEffects {
  loadRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(loadRepositories.type),
    mergeMap(() => this.repos.getRepositories().pipe(
      map(repos => ({
        type: setRepositories.type,
        repositories: repos,
      }))
    ))
  ))

  constructor(private actions$: Actions, private repos: RepositoryService) {
  }
}
