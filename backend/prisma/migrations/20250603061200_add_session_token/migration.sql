/*
  Warnings:

  - Made the column `description` on table `bouquets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image_url` on table `bouquets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_date` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `delivery_address` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comment` on table `reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "bouquets" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "image_url" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "delivery_date" SET NOT NULL,
ALTER COLUMN "delivery_address" SET NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "comment" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "session_token" TEXT;
