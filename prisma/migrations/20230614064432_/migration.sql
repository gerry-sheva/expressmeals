-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "frozen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL DEFAULT -7.795580,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL DEFAULT 110.369492;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL DEFAULT -7.769540,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL DEFAULT 110.381190;
