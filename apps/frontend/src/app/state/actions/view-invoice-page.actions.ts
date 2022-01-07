import { UpdateInvoiceDto } from '@lbk/dto';
import { createAction, props } from '@ngrx/store';

export const selectInvoice = createAction(
  '[View Invoice Page] Select Invoice',
  props<{ id: string }>()
);

export const deleteInvoice = createAction(
  '[View Invoice Page] Delete Invoice',
  props<{ id: string }>()
);

export const maskAsPaid = createAction(
  '[View Invoice Page] Mask As Paid',
  props<{ id: string }>()
);

export const updateInvoice = createAction(
  '[View Invoice Page] Update Invoice',
  props<{ id: string; updateInvoiceDto: UpdateInvoiceDto }>()
);
