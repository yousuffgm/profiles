import { pgTable, boolean,  text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),       // NextAuth provider user id
  name: text("name"),
  email: text("email").notNull().unique(),
  image: text("image"),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  scope: text("scope"),
  tokenType: text("token_type"),
  expiresAt: timestamp("expires_at"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull(),
  expires: timestamp("expires"),
});

export const verificationTokens = pgTable("verification_tokens", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires").notNull(),
});

export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey(),

  about: text("about"),
  jobTitle: text("job_title"),
  skills: text("skills"), // CSV or JSON string list
  profileImage: text("profile_image"),
  isPublic: boolean("is_public").notNull().default(true),
});

export const friendRequests = pgTable("friend_requests", {
  id: text("id").primaryKey(),
  fromUserId: text("from_user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  toUserId: text("to_user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status") // "pending" | "accepted" | "rejected"
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertProfiles = typeof profiles.$inferInsert;
export type SelectProfiles = typeof profiles.$inferSelect;