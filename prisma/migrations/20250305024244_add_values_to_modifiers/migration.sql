-- AlterTable
ALTER TABLE "KahonItem" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "KahonItemModifier" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "KahonTotalModifier" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "KahonTransferredItem" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "KahonTransferredItemModifier" ADD COLUMN     "value" DOUBLE PRECISION NOT NULL DEFAULT 0;
