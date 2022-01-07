import { Invoice } from '@lbk/models';
import { createAction, props } from '@ngrx/store';

export const loadInvoice = createAction(
  '[Invoice Exists Guard] Load Invoice',
  props<{ invoice: Invoice }>()
);
