import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from "../store/app.reducer";


@Injectable({providedIn: 'root'})
export class AddressGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _store: Store<fromApp.AppState>,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {


    return this._store.select(fromApp.getClient).pipe(
      take(1),
      map(res => {

        if (res.client) {
          return true;
        }

        this._router.navigate(['/']);

        return false;
      })
    );
  }
}
