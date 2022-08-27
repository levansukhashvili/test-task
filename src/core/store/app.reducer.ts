import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromClients from './reducers/clients.reducer';

export interface AppState {
  clients: fromClients.State
}

export const appReducer: ActionReducerMap<AppState, any> = {
  clients: fromClients.clientsReducer,
};


export const getClientsState = createFeatureSelector<fromClients.State>('clients');
export const getClient = createSelector(getClientsState, fromClients.getClient);


