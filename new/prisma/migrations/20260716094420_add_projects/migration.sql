-- CreateTable
CREATE TABLE "ProjectCaseStudy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "liveUrl" TEXT,
    "year" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "accent" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectCaseStudy_slug_key" ON "ProjectCaseStudy"("slug");
