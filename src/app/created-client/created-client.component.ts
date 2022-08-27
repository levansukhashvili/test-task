import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../core/store/app.reducer";
import * as clientAction from "../../core/store/actions/clients.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-created-client',
  templateUrl: './created-client.component.html',
  styleUrls: ['./created-client.component.scss']
})
export class CreatedClientComponent implements OnInit {

  constructor(protected _store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit(): void {
  }

  createNew(): void {
    this._store.dispatch(new clientAction.ClearClientData());
    this.router.navigate(['/']);
  }

}
