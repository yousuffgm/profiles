import { pgTable, boolean,  text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),       // NextAuth provider user id
  name: text("name"),
  email: text("email").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
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