/*
  Warnings:

  - You are about to drop the column `productId` on the `Transfer` table. All the data in the column will be lost.
  - Added the required column `priceId` to the `Transfer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_productId_fkey";

-- AlterTable
ALTER TABLE "Transfer" DROP COLUMN "productId",
ADD COLUMN     "priceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
