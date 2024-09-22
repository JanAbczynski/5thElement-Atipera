import {createAction, props} from '@ngrx/store'
import { PeriodicElement } from '../Models/PeriodicElement';

export const update = createAction(
  '[Elements] Update Element',
  props<{ element: PeriodicElement }>()
);
export const insert = createAction(
  '[Elements] Insert Element',
  props<{ elements: PeriodicElement[] }>()
);
