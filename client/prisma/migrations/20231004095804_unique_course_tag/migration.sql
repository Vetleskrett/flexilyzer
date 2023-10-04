/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_tag_key" ON "Course"("tag");
