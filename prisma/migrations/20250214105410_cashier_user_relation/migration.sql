/*
  Warnings:

  - Added the required column `userId` to the `Cashier` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Cashier_accessKey_key";

-- DropIndex
DROP INDEX "Cashier_secureCode_key";

-- AlterTable
ALTER TABLE "Cashier" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cashier" ADD CONSTRAINT "Cashier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
