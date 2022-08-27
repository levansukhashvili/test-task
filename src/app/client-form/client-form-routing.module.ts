import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from "./client/client.component";
import {AddressComponent} from "./address/address.component";
import {IdentityVerificationComponent} from "./identity-verification/identity-verification.component";
import {ClientFormComponent} from "./client-form.component";
import {AddressGuard} from "../../core/guards/address.guard";
import {IdentityGuard} from "../../core/guards/identity.guard";

const routes: Routes = [
  {
    path: '',
    component: ClientFormComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'client'
      },
      {
        path: 'client',
        component: ClientComponent,
        data: {
          activeStep: 0,
          routes: {
            next: './address',
            prev: ''
          }
        }
      },
      {
        path: 'address',
        component: AddressComponent,
        canActivate: [AddressGuard],
        runGuardsAndResolvers: 'always',
        data: {
          activeStep: 1,
          routes: {
            next: './identity',
            prev: './client'
          }
        }
      },
      {
        path: 'identity',
        component: IdentityVerificationComponent,
        canActivate: [IdentityGuard],
        runGuardsAndResolvers: 'always',
        data: {
          activeStep: 2,
          routes: {
            next: '',
            prev: './address'
          }
        }
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientFormRoutingModule { }
