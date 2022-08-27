import {Action} from '@ngrx/store';
import {Client} from "../../models/clients/client.model";
import {Address} from "../../models/clients/address.model";
import {IdentityVerification} from "../../models/clients/identity-verification.model";


export const STORE_CLIENT = '[Clients] Store Client';
export const STORE_ADDRESS = '[Clients] Store Address';
export const STORE_IDENTITY_VERIFICATION = '[Clients] Store Identity Verification';
export const CLEAR_CLIENT_DATA = '[Clients] Clear Client Data';

export class StoreClient implements Action {
  readonly type = STORE_CLIENT;

  constructor(public payload: Client) {
  }
}

export class StoreAddress implements Action {
  readonly type = STORE_ADDRESS;

  constructor(public payload: Address) {
  }
}

export class StoreIdentityVerification implements Action {
  readonly type = STORE_IDENTITY_VERIFICATION;

  constructor(public payload: IdentityVerification) {
  }
}

export class ClearClientData implements Action {
  readonly type = CLEAR_CLIENT_DATA;
}


export type ClientsActions = StoreClient
  | StoreAddress
  | StoreIdentityVerification
  | ClearClientData;
