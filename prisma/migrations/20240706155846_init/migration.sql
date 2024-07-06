-- CreateTable
CREATE TABLE "Quizz" (
    "quizz_id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "solved" BOOLEAN NOT NULL,

    CONSTRAINT "Quizz_pkey" PRIMARY KEY ("quizz_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quizz_courseId_key" ON "Quizz"("courseId");

-- AddForeignKey
ALTER TABLE "Quizz" ADD CONSTRAINT "Quizz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
