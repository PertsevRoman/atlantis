import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadRepositories} from "./app.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ui';

  constructor(private store: Store<{atlantis: AtlantisState}>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadRepositories())
  }
}
