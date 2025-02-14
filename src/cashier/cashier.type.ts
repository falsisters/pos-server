import { Cashier, CashierPermission } from '@prisma/client';

export interface CashierWithPermissions extends Cashier {
  permissions: CashierPermission[];
}
