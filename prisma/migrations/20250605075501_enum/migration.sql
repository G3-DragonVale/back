/*
  Warnings:

  - The `rarete` column on the `Dragon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Rarete" AS ENUM ('COMMUN', 'RARE', 'EPIQUE', 'LEGENDAIRE', 'MYTHIQUE');

-- AlterTable
ALTER TABLE "Dragon" DROP COLUMN "rarete",
ADD COLUMN     "rarete" "Rarete" NOT NULL DEFAULT 'COMMUN';
