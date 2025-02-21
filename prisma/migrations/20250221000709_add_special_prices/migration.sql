/*
  Warnings:

  - The values [SPECIAL_PRICE] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `minimumQty` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('FIFTY_KG', 'TWENTY_FIVE_KG', 'FIVE_KG', 'PER_KILO', 'GANTANG');
ALTER TABLE "Price" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TABLE "SaleItem" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TABLE "DeliveryItem" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "ProductType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "driver" TEXT NOT NULL DEFAULT 'None',
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "timeFinished" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "minimumQty",
ADD COLUMN     "picture" TEXT NOT NULL DEFAULT 'https://placehold.co/720?text=Product';

-- AlterTable
ALTER TABLE "SaleItem" ADD COLUMN     "isSpecialPrice" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SpecialPrice" (
    "id" TEXT NOT NULL,
    "specialPrice" DOUBLE PRECISION NOT NULL,
    "minimumQty" INTEGER NOT NULL DEFAULT 1,
    "priceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecialPrice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpecialPrice" ADD CONSTRAINT "SpecialPrice_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;
