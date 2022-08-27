import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatedClientComponent} from "./created-client/created-client.component";
import {CreatedClientGuard} from "../core/guards/created-client.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'client-form',
    pathMatch: 'full'
  },
  {
    path: 'client-form',
    loadChildren: () => import('./client-form/client-form.module').then(m => m.ClientFormModule),
  },
  {
    path: 'created-client',
    component: CreatedClientComponent,
    canActivate: [CreatedClientGuard],
    runGuardsAndResolvers: "always"
  },
  {
    path: '**',
    redirectTo: 'client-form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
