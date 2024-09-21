import {createAction, props} from '@ngrx/store'
import { PeriodicElement } from '../Models/PeriodicElement';

export const update = createAction(
  'update',
  props<{ elements: PeriodicElement }>()
);
export const insert = createAction(
  'insert',
  props<{ elements: PeriodicElement[] }>()
);
