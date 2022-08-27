import { NgModule } from '@angular/core';
import {ClientFormRoutingModule} from "./client-form-routing.module";
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {IdentityVerificationComponent} from "./identity-verification/identity-verification.component";
import {SharedModule} from "../shared.module";
import {ClientFormComponent} from "./client-form.component";

@NgModule({
  declarations: [
    ClientFormComponent,
    ClientComponent,
    AddressComponent,
    IdentityVerificationComponent,
  ],
  imports: [
    SharedModule,
    ClientFormRoutingModule,
  ],
  providers: [],
  exports: [
    ClientComponent,
    AddressComponent,
    IdentityVerificationComponent
  ],
  bootstrap: []
})
export class ClientFormModule { }
