-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."activity_type" AS ENUM('add_review', 'start_game', 'finish_game', 'drop_game');--> statement-breakpoint
CREATE TYPE "public"."user_game_status" AS ENUM('backlog', 'playing', 'played', 'dropped');--> statement-breakpoint
CREATE TABLE "howlongtobeat_data" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"hltb_id" bigint NOT NULL,
	"main_story_hours" numeric(6, 2),
	"main_story_sides_hours" numeric(6, 2),
	"completionist_hours" numeric(6, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "game_genres" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"genre_id" varchar(36) NOT NULL,
	CONSTRAINT "game_genres_game_genre_unique" UNIQUE("game_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "review_likes" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"review_id" varchar(36) NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "review_likes_user_review_unique" UNIQUE("review_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "collections" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"title" varchar(255) DEFAULT 'Untitled collection' NOT NULL,
	"description" varchar(255),
	"is_public" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "game_platforms" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"platform_name" varchar(50) NOT NULL,
	CONSTRAINT "game_platforms_platform_name_key" UNIQUE("platform_name")
);
--> statement-breakpoint
CREATE TABLE "game_stats" (
	"game_id" varchar(36) PRIMARY KEY NOT NULL,
	"avg_rating" numeric(3, 2),
	"reviews_count" integer,
	"backlog_count" integer,
	"playing_count" integer,
	"played_count" integer,
	"dropped_count" integer
);
--> statement-breakpoint
CREATE TABLE "games" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"release_date" date,
	"cover_url" text,
	"developer" varchar(255),
	"publisher" varchar(255),
	"igdb_id" bigint NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"slug" text NOT NULL,
	CONSTRAINT "games_igdb_id_unique" UNIQUE("igdb_id"),
	CONSTRAINT "games_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_activity" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"review_id" varchar(36),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"body" text,
	"rating" numeric(2, 1) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "reviews_user_game_unique" UNIQUE("user_id","game_id")
);
--> statement-breakpoint
CREATE TABLE "users_social_links" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"platform" varchar(50) NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "collection_games" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"collection_id" varchar(36) NOT NULL,
	"game_id" varchar(36) NOT NULL,
	CONSTRAINT "collection_games_collection_game_unique" UNIQUE("collection_id","game_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255),
	"steam_id" varchar(50),
	"profile_picture_url" text,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_username_key" UNIQUE("username"),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"slug" varchar(100) NOT NULL,
	CONSTRAINT "genres_name_slug_unique" UNIQUE("name","slug")
);
--> statement-breakpoint
CREATE TABLE "user_games" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(36) NOT NULL,
	"game_id" varchar(36) NOT NULL,
	"status" "user_game_status" NOT NULL,
	"rating" numeric(2, 1),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "user_games_user_game_unique" UNIQUE("user_id","game_id")
);
--> statement-breakpoint
ALTER TABLE "howlongtobeat_data" ADD CONSTRAINT "howlongtobeat_data_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_genres" ADD CONSTRAINT "game_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_likes" ADD CONSTRAINT "review_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collections" ADD CONSTRAINT "fk_collections_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "game_platforms" ADD CONSTRAINT "game_platforms_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "game_stats" ADD CONSTRAINT "game_stats_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "fk_user_activity_game_id" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "fk_user_activity_review_id" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "fk_user_activity_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_activity" ADD CONSTRAINT "user_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_social_links" ADD CONSTRAINT "fk_users_social_links_user_id" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "collection_games" ADD CONSTRAINT "collection_games_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "collection_games" ADD CONSTRAINT "collection_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_games" ADD CONSTRAINT "user_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_howlongtobeat_data_completionist_hours" ON "howlongtobeat_data" USING btree ("completionist_hours" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_howlongtobeat_data_hltb_id" ON "howlongtobeat_data" USING btree ("hltb_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_howlongtobeat_data_main_story_hours" ON "howlongtobeat_data" USING btree ("main_story_hours" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_howlongtobeat_data_main_story_sides_hours" ON "howlongtobeat_data" USING btree ("main_story_sides_hours" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_game_platforms_platform_name" ON "game_platforms" USING btree ("platform_name" text_ops);--> statement-breakpoint
CREATE INDEX "idx_games_igdb_id" ON "games" USING btree ("igdb_id" int8_ops);--> statement-breakpoint
CREATE INDEX "idx_games_title" ON "games" USING btree ("title" text_ops);--> statement-breakpoint
CREATE INDEX "idx_reviews_game_created" ON "reviews" USING btree ("game_id" text_ops,"created_at" text_ops);--> statement-breakpoint
CREATE INDEX "idx_reviews_user_rating" ON "reviews" USING btree ("user_id" text_ops,"rating" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_users_email" ON "users" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "idx_users_username" ON "users" USING btree ("username" text_ops);--> statement-breakpoint
CREATE INDEX "idx_genres_slug" ON "genres" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE INDEX "idx_user_games_rating" ON "user_games" USING btree ("rating" numeric_ops);--> statement-breakpoint
CREATE INDEX "idx_user_games_status" ON "user_games" USING btree ("status" enum_ops);
*/