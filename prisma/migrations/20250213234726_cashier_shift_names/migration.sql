/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cashier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee` to the `Shift` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shift" ADD COLUMN     "employee" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cashier_name_key" ON "Cashier"("name");
