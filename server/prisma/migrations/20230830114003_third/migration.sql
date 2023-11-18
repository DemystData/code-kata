/*
  Warnings:

  - Added the required column `key` to the `balance_sheet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "balance_sheet" ADD COLUMN     "key" TEXT NOT NULL;
