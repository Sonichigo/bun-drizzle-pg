DROP INDEX IF EXISTS "comment_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "post_idx";--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "postId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "authorId" SET NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "comment_idx" ON "comments" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "post_idx" ON "posts" ("id");