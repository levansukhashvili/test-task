import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from '../../../core/store/app.reducer';
import * as clientAction from '../../../core/store/actions/clients.actions';
import {filter, map, pairwise, startWith, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formIsDisabled = false;
  clientForm: FormGroup = new FormGroup({
    lastName: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    middleName: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber: new FormControl(null, [Validators.minLength(11), Validators.maxLength(11)]),
    gender: new FormControl(''),
    clientGroup: new FormControl([], Validators.required),
    coordinator: new FormControl(''),
    doNotSendSMS: new FormControl(false),
  });
  genderList = ['Male', 'Female', 'Other'];
  coordinators = ['Jhones', 'Colinwood'];
  clientGroup = ['VIP Clients', 'Loyal Clients', 'New Clients'];

  private unsubscribe$ = new Subject<void>();

  constructor(protected _store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this._store.select(fromApp.getClient).pipe(filter(res => res.client !== null)).subscribe(res => {
      const client = res.client;
      this.clientForm.setValue({
        lastName: client?.lastName,
        name: client?.name,
        middleName: client?.middleName,
        dateOfBirth: client?.dateOfBirth,
        phoneNumber: client?.phoneNumber,
        gender: client?.gender,
        clientGroup: client?.clientGroup,
        coordinator: client?.coordinator,
        doNotSendSMS: client?.doNotSendSMS,
      });
    });
    this.clientForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        startWith(null as unknown as string),
        pairwise(),
      )
      .subscribe(([prev, next]) => {
        if (JSON.stringify(prev) === JSON.stringify(next)) {
          return
        }
        let data;
        if (this.clientForm.valid) {
          data = next;
        }
        else {
          data = null;
        }
        this._store.dispatch(new clientAction.StoreClient(data));
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formIsDisabled) {
      this.clientForm.disable();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
