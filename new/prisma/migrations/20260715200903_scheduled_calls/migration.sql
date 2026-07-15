-- CreateTable
CREATE TABLE "ScheduledCall" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calendlyInviteeUri" TEXT NOT NULL,
    "calendlyEventUri" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "timezone" TEXT,
    "eventName" TEXT,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME,
    "location" TEXT,
    "cancelUrl" TEXT,
    "rescheduleUrl" TEXT,
    "inviteeAnswers" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "canceledAt" DATETIME,
    "cancelReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledCall_calendlyInviteeUri_key" ON "ScheduledCall"("calendlyInviteeUri");

-- CreateIndex
CREATE INDEX "ScheduledCall_startAt_idx" ON "ScheduledCall"("startAt");

-- CreateIndex
CREATE INDEX "ScheduledCall_status_idx" ON "ScheduledCall"("status");

-- CreateIndex
CREATE INDEX "ScheduledCall_email_idx" ON "ScheduledCall"("email");
