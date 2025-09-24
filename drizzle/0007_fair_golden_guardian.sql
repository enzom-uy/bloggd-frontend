CREATE TABLE "platforms" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"abbreviation" varchar(20) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "platforms_name_slug_unique" UNIQUE("name","slug"),
	CONSTRAINT "platforms_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
ALTER TABLE "game_platforms" RENAME COLUMN "platform_name" TO "platform_id";--> statement-breakpoint
ALTER TABLE "game_platforms" DROP CONSTRAINT "game_platforms_platform_name_key";--> statement-breakpoint
ALTER TABLE "collection_games" DROP CONSTRAINT "collection_games_collection_id_fkey";
--> statement-breakpoint
ALTER TABLE "collection_games" DROP CONSTRAINT "collection_games_game_id_fkey";
--> statement-breakpoint
ALTER TABLE "game_stats" DROP CONSTRAINT "game_stats_game_id_fkey";
--> statement-breakpoint
ALTER TABLE "howlongtobeat_data" DROP CONSTRAINT "howlongtobeat_data_game_id_fkey";
--> statement-breakpoint
ALTER TABLE "user_games" DROP CONSTRAINT "user_games_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "user_games" DROP CONSTRAINT "user_games_game_id_fkey";
--> statement-breakpoint
DROP INDEX "idx_game_platforms_platform_name";--> statement-breakpoint
CREATE INDEX "idx_platforms_slug" ON "platforms" USING btree ("slug" text_ops);--> statement-breakpoint
ALTER TABLE "collection_games" ADD CONSTRAINT "collection_games_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_games" ADD CONSTRAINT "collection_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_platform_id_fkey" FOREIGN KEY ("platform_id") REFERENCES "public"."platforms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_stats" ADD CONSTRAINT "game_stats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "howlongtobeat_data" ADD CONSTRAINT "howlongtobeat_data_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;