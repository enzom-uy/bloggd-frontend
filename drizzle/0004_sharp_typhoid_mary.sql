ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "user_sessions" DROP CONSTRAINT "user_sessions_user_id_fkey";
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;