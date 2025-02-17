import { Cashier, CashierPermission } from '@prisma/client';

export interface CashierWithPermissions extends Cashier {
  permissions: CashierPermission[];
}

export interface CashierJwtPayload {
  id: string;
  name: string;
  userId: string;
  permissions: CashierPermission[];
}
