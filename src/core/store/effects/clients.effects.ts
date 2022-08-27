import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Router} from '@angular/router';


@Injectable()
export class ClientsEffects {


  constructor(
    private _router: Router,
    private _actions$: Actions,
  ) {}

}
