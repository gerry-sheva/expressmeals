/*
  Warnings:

  - A unique constraint covering the columns `[id,deliveredById]` on the table `Care` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,deliveredToId]` on the table `Care` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Care_id_deliveredById_key" ON "Care"("id", "deliveredById");

-- CreateIndex
CREATE UNIQUE INDEX "Care_id_deliveredToId_key" ON "Care"("id", "deliveredToId");
