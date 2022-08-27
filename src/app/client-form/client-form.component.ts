import {Component} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import * as fromApp from "../../core/store/app.reducer";
import {Store} from "@ngrx/store";
import {State} from "../../core/store/reducers/clients.reducer";
import {InfoDialogComponent} from "../dialogs/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  public activeStep = 0;
  public steps = [0,1,2];
  currentRoute = "";
  nextUrl = "";
  prevUrl = "";
  isButtonDisabled = true;

  get isLastStep(): boolean {
    return this.steps[this.steps.length - 1] === this.activeStep;
  }

  constructor(private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private _store: Store<fromApp.AppState>) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => route.snapshot),
        map(rt => {
          while (rt.firstChild) {
            rt = rt.firstChild;
          }
          return rt;
        })
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        this.currentRoute = route?.routeConfig?.path || '';
        this.nextUrl = route?.data?.routes?.next;
        this.prevUrl = route?.data?.routes?.prev;
        this.activeStep = route?.data?.activeStep;

        _store.select(fromApp.getClient).subscribe((client: State) => {
          const currentStepData = (client as any)[this.currentRoute];
          this.isButtonDisabled = !currentStepData;
        })
      });
  }

  next(): void {
    if (this.isLastStep) {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '250px',
        data: {message: 'Client added successfully.'},
      });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['/created-client'], { relativeTo: this.route })
      });
      return;
    }
    this.router.navigate([this.nextUrl], { relativeTo: this.route });
  }

  back(): void {
    this.router.navigate([this.prevUrl], { relativeTo: this.route });
  }


}
