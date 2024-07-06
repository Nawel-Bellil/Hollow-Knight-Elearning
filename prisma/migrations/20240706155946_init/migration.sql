/*
  Warnings:

  - Added the required column `quizz_solved` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "quizz_solved" BOOLEAN NOT NULL;
