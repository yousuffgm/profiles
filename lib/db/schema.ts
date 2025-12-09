import { pgTable, integer, boolean,  text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const sessions = pgTable("sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id),
  expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable("verificationTokens", {
  identifier: text("identifier").notNull(),
  token: text("token").primaryKey(),
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