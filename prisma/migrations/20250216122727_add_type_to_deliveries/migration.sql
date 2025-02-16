/*
  Warnings:

  - Added the required column `type` to the `DeliveryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryItem" ADD COLUMN     "type" "ProductType" NOT NULL;
