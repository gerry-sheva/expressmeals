/*
  Warnings:

  - A unique constraint covering the columns `[id,providedById]` on the table `Meal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,menuId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,deliveredById]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,deliveredToId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Meal_id_providedById_key" ON "Meal"("id", "providedById");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_menuId_key" ON "Order"("id", "menuId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_deliveredById_key" ON "Order"("id", "deliveredById");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_deliveredToId_key" ON "Order"("id", "deliveredToId");
