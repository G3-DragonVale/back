/*
  Warnings:

  - You are about to drop the column `nom` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nom",
DROP COLUMN "prenom",
ADD COLUMN     "nickname" TEXT NOT NULL DEFAULT 'feur';
