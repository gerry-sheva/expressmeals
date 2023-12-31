-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'RIDER', 'PARTNER', 'CAREGIVER');

-- AlterTable
ALTER TABLE "Caregiver" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CAREGIVER';

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'PARTNER';

-- AlterTable
ALTER TABLE "Rider" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'RIDER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER';
