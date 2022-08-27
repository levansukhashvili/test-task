import * as ClientsActions from '../actions/clients.actions';
import {Client} from "../../models/clients/client.model";
import {Address} from "../../models/clients/address.model";
import {IdentityVerification} from "../../models/clients/identity-verification.model";

export interface State {
  client: Client | null;
  address: Address | null;
  identity: IdentityVerification | null;
}
const initialState: State = {
  client: null,
  address: null,
  identity: null,
};

export function clientsReducer(
  state: State = initialState,
  action: ClientsActions.ClientsActions
): State {
  switch (action.type) {
    case ClientsActions.STORE_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case ClientsActions.STORE_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case ClientsActions.STORE_IDENTITY_VERIFICATION:
      return {
        ...state,
        identity: action.payload
      };
    case ClientsActions.CLEAR_CLIENT_DATA:
      return {
        ...state,
        client: null,
        address: null,
        identity: null,
      };
    default:
      return state;
  }
}


export const getClient = (state: State) => state;

