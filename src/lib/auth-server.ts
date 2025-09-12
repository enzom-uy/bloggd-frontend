import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { username } from "better-auth/plugins"
import { db } from "@/db/index"
import { USER_ROLES } from "../../drizzle/schema"
import {
  users,
  userSessions,
  accounts,
  verifications,
} from "../../drizzle/schema"

export const auth = betterAuth({
  baseURL: "http://localhost:4321",
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users: users,
      sessions: userSessions,
      accounts: accounts,
      verifications: verifications,
    },
  }),

  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    fields: {
      name: "username",
      emailVerified: "email_verified",
      image: "profile_picture_url",
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
})
