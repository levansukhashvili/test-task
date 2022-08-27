import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../core/store/app.reducer";
import {filter, pairwise, startWith, takeUntil} from "rxjs/operators";
import * as clientAction from "../../../core/store/actions/clients.actions";

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss']
})
export class IdentityVerificationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() formIsDisabled = false;
  identityVerificationForm: FormGroup = new FormGroup({
    documentType: new FormControl('', Validators.required),
    series: new FormControl(''),
    number: new FormControl(null, Validators.required),
    issuedBy: new FormControl(''),
    dateOfIssue: new FormControl('', Validators.required),
    file: new FormControl(''),
  });
  documentTypes = ["Passport", "Birth Certificate", "Driving license"];

  private unsubscribe$ = new Subject<void>();

  constructor(protected _store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this._store.select(fromApp.getClient).pipe(filter(res => res.identity !== null)).subscribe(res => {
      const identity = res.identity;
      this.identityVerificationForm.setValue({
        documentType: identity?.documentType,
        series: identity?.series,
        number: identity?.number,
        issuedBy: identity?.issuedBy,
        dateOfIssue: identity?.dateOfIssue,
        file: identity?.file
      });
    });
    this.identityVerificationForm.valueChanges
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
        if (this.identityVerificationForm.valid) {
          data = next;
        }
        else {
          data = null;
        }
        this._store.dispatch(new clientAction.StoreIdentityVerification(data));
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formIsDisabled) {
      this.identityVerificationForm.disable();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFileChange(event: any) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      this.identityVerificationForm.patchValue({
        file: file?.name
      });
    }
  }

}
