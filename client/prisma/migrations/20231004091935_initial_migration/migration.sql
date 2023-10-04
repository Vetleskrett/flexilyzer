-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "courseId" INTEGER,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "githubLink" TEXT NOT NULL,
    "blackboardLink" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" SERIAL NOT NULL,
    "githubLink" TEXT NOT NULL,
    "groupId" INTEGER,
    "assignmentId" INTEGER,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitAnalysis" (
    "id" SERIAL NOT NULL,
    "repositoryId" INTEGER,
    "numberCommits" INTEGER NOT NULL,
    "commitsPerUser" JSONB NOT NULL,

    CONSTRAINT "GitAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LighthouseAnalysis" (
    "id" SERIAL NOT NULL,
    "fcp" TEXT NOT NULL,
    "hasHttps" BOOLEAN,
    "hasViewport" BOOLEAN NOT NULL,
    "repositoryId" INTEGER,

    CONSTRAINT "LighthouseAnalysis_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GitAnalysis" ADD CONSTRAINT "GitAnalysis_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LighthouseAnalysis" ADD CONSTRAINT "LighthouseAnalysis_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "Repository"("id") ON DELETE SET NULL ON UPDATE CASCADE;
