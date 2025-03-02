/*
  Warnings:

  - You are about to drop the column `total` on the `Kahon` table. All the data in the column will be lost.
  - You are about to drop the `KahonStock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KahonStockModifier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Kahon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('RECEIVED', 'TRANSFERRED');

-- DropForeignKey
ALTER TABLE "KahonStock" DROP CONSTRAINT "KahonStock_productId_fkey";

-- DropForeignKey
ALTER TABLE "KahonStockModifier" DROP CONSTRAINT "KahonStockModifier_kahonStockId_fkey";

-- AlterTable
ALTER TABLE "DeliveryItem" ADD COLUMN     "status" "DeliveryStatus" NOT NULL DEFAULT 'RECEIVED';

-- AlterTable
ALTER TABLE "Kahon" DROP COLUMN "total",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "KahonStock";

-- DropTable
DROP TABLE "KahonStockModifier";

-- CreateTable
CREATE TABLE "KahonTransferredItem" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "priceId" TEXT NOT NULL,
    "kahonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KahonTransferredItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KahonItem" (
    "id" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "kahonId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KahonItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KahonTransferredItemModifier" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "operation" "OperationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kahonTransferredItemId" TEXT NOT NULL,

    CONSTRAINT "KahonTransferredItemModifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KahonItemModifier" (
    "id" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "operation" "OperationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "kahonItemId" TEXT NOT NULL,

    CONSTRAINT "KahonItemModifier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KahonTransferredItem" ADD CONSTRAINT "KahonTransferredItem_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonTransferredItem" ADD CONSTRAINT "KahonTransferredItem_kahonId_fkey" FOREIGN KEY ("kahonId") REFERENCES "Kahon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonItem" ADD CONSTRAINT "KahonItem_kahonId_fkey" FOREIGN KEY ("kahonId") REFERENCES "Kahon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonTransferredItemModifier" ADD CONSTRAINT "KahonTransferredItemModifier_kahonTransferredItemId_fkey" FOREIGN KEY ("kahonTransferredItemId") REFERENCES "KahonTransferredItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KahonItemModifier" ADD CONSTRAINT "KahonItemModifier_kahonItemId_fkey" FOREIGN KEY ("kahonItemId") REFERENCES "KahonItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
