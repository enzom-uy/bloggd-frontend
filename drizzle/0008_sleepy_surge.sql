ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_game_id_fkey";
--> statement-breakpoint
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_platform_id_fkey";
--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE cascade ON UPDATE no action;