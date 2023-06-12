-- CreateTable
CREATE TABLE "Care" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'PREPARING',
    "deliveredById" TEXT NOT NULL,
    "deliveredToId" TEXT NOT NULL,

    CONSTRAINT "Care_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Care" ADD CONSTRAINT "Care_deliveredById_fkey" FOREIGN KEY ("deliveredById") REFERENCES "Caregiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Care" ADD CONSTRAINT "Care_deliveredToId_fkey" FOREIGN KEY ("deliveredToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
