import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/index";
import { USER_ROLES } from "../../drizzle/schema";

export const auth = betterAuth({
  user: {
    modelName: "users",
    fields: {
      name: "username",
      emailVerified: "email_verified",
      image: "profile_picture_url",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "user" as (typeof USER_ROLES)[number],
        input: false,
      },
    },
  },
  session: {
    modelName: "user_sessions",
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      userId: "user_id",
    },
  },
  account: {
    modelName: "accounts",
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      scope: "scope",
      idToken: "id_token",
      password: "password",
    },
  },
  verification: {
    modelName: "verifications",
    fields: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      identifier: "identifier",
      value: "value",
      expiresAt: "expires_at",
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
