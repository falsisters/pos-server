/*
  Warnings:

  - You are about to drop the column `name` on the `Price` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Profit` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceId` to the `Profit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'SPECIAL_PRICE';

-- DropForeignKey
ALTER TABLE "CashBreakdown" DROP CONSTRAINT "CashBreakdown_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "CashBreakdownItem" DROP CONSTRAINT "CashBreakdownItem_cashBreakdownId_fkey";

-- DropForeignKey
ALTER TABLE "Cashier" DROP CONSTRAINT "Cashier_userId_fkey";

-- DropForeignKey
ALTER TABLE "CashierPermission" DROP CONSTRAINT "CashierPermission_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryItem" DROP CONSTRAINT "DeliveryItem_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryItem" DROP CONSTRAINT "DeliveryItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "Kahon" DROP CONSTRAINT "Kahon_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "KahonStock" DROP CONSTRAINT "KahonStock_productId_fkey";

-- DropForeignKey
ALTER TABLE "KahonStockModifier" DROP CONSTRAINT "KahonStockModifier_kahonStockId_fkey";

-- DropForeignKey
ALTER TABLE "KahonTotalModifier" DROP CONSTRAINT "KahonTotalModifier_kahonId_fkey";

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_productId_fkey";

-- DropForeignKey
ALTER TABLE "Profit" DROP CONSTRAINT "Profit_productId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";

-- DropForeignKey
ALTER TABLE "Shift" DROP CONSTRAINT "Shift_cashierId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_productId_fkey";

-- AlterTable
ALTER TABLE "Price" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profit" DROP COLUMN "productId",
ADD COLUMN     "priceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cashier" ADD CONSTRAINT "Cashier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashierPermission" ADD CONSTRAINT "CashierPermission_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shift" ADD CONSTRAINT "Shift_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profit" ADD CONSTRAINT "Profit_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryItem" ADD CONSTRAINT "DeliveryItem_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryItem" ADD CONSTRAINT "DeliveryItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kahon" ADD CONSTRAINT "Kahon_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonStock" ADD CONSTRAINT "KahonStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonStockModifier" ADD CONSTRAINT "KahonStockModifier_kahonStockId_fkey" FOREIGN KEY ("kahonStockId") REFERENCES "KahonStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonTotalModifier" ADD CONSTRAINT "KahonTotalModifier_kahonId_fkey" FOREIGN KEY ("kahonId") REFERENCES "Kahon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashBreakdown" ADD CONSTRAINT "CashBreakdown_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashBreakdownItem" ADD CONSTRAINT "CashBreakdownItem_cashBreakdownId_fkey" FOREIGN KEY ("cashBreakdownId") REFERENCES "CashBreakdown"("id") ON DELETE CASCADE ON UPDATE CASCADE;
