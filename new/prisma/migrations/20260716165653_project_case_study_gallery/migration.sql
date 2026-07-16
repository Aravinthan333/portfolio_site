-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectCaseStudy" (
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
    "hasCaseStudy" BOOLEAN NOT NULL DEFAULT true,
    "galleryImages" TEXT NOT NULL DEFAULT '[]',
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProjectCaseStudy" ("accent", "challenge", "createdAt", "description", "highlights", "id", "image", "liveUrl", "outcome", "overview", "published", "role", "slug", "solution", "stack", "subtitle", "tags", "title", "updatedAt", "year") SELECT "accent", "challenge", "createdAt", "description", "highlights", "id", "image", "liveUrl", "outcome", "overview", "published", "role", "slug", "solution", "stack", "subtitle", "tags", "title", "updatedAt", "year" FROM "ProjectCaseStudy";
DROP TABLE "ProjectCaseStudy";
ALTER TABLE "new_ProjectCaseStudy" RENAME TO "ProjectCaseStudy";
CREATE UNIQUE INDEX "ProjectCaseStudy_slug_key" ON "ProjectCaseStudy"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
