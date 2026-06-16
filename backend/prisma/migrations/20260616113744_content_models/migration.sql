-- CreateEnum
CREATE TYPE "public"."ContentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ContentType" AS ENUM ('MOVIE', 'SERIES', 'TRAILER', 'ANNOUNCEMENT', 'CASTING', 'COMIC', 'GAME', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."SpoilerRisk" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."Source" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContentItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "thumbnailUrl" TEXT,
    "sourceUrl" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "contentType" "public"."ContentType" NOT NULL,
    "status" "public"."ContentStatus" NOT NULL DEFAULT 'PENDING',
    "sourceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AiEnrichment" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "tldr" TEXT NOT NULL,
    "importanceScore" INTEGER NOT NULL,
    "spoilerRisk" "public"."SpoilerRisk" NOT NULL,
    "tags" JSONB NOT NULL,
    "entities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiEnrichment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prerequisite" (
    "id" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prerequisite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WatchlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contentItemId" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WatchlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentItem_slug_key" ON "public"."ContentItem"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ContentItem_sourceUrl_key" ON "public"."ContentItem"("sourceUrl");

-- CreateIndex
CREATE INDEX "ContentItem_publishedAt_idx" ON "public"."ContentItem"("publishedAt");

-- CreateIndex
CREATE INDEX "ContentItem_status_idx" ON "public"."ContentItem"("status");

-- CreateIndex
CREATE INDEX "ContentItem_contentType_idx" ON "public"."ContentItem"("contentType");

-- CreateIndex
CREATE UNIQUE INDEX "AiEnrichment_contentItemId_key" ON "public"."AiEnrichment"("contentItemId");

-- CreateIndex
CREATE UNIQUE INDEX "WatchlistItem_userId_contentItemId_key" ON "public"."WatchlistItem"("userId", "contentItemId");

-- AddForeignKey
ALTER TABLE "public"."ContentItem" ADD CONSTRAINT "ContentItem_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AiEnrichment" ADD CONSTRAINT "AiEnrichment_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "public"."ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prerequisite" ADD CONSTRAINT "Prerequisite_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "public"."ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchlistItem" ADD CONSTRAINT "WatchlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WatchlistItem" ADD CONSTRAINT "WatchlistItem_contentItemId_fkey" FOREIGN KEY ("contentItemId") REFERENCES "public"."ContentItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
