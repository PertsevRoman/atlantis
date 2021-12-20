import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectRepositories} from "../app.selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public repositories$: Observable<Repository[]>;

  constructor(private store: Store<{atlantis: AtlantisState}>) {
    this.repositories$ = this.store.select(selectRepositories);
  }

  ngOnInit(): void { }
}
