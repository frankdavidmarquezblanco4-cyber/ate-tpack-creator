import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ATE (Actividad Tecnológica Escolar) table
export const ates = mysqlTable("ates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  accessCode: varchar("accessCode", { length: 50 }).notNull().unique(),
  data: text("data").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ATE = typeof ates.$inferSelect;
export type InsertATE = typeof ates.$inferInsert;

// Ratings table for ATE gallery
export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  ateId: int("ateId").notNull(),
  userId: int("userId").notNull(),
  score: int("score").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;

// Notifications table
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["download", "share", "rating", "comment"]).notNull(),
  ateId: int("ateId").notNull(),
  fromUserId: int("fromUserId"),
  message: text("message").notNull(),
  read: int("read").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// LMS Export table for tracking exports to Moodle/Canvas
export const lmsExports = mysqlTable("lmsExports", {
  id: int("id").autoincrement().primaryKey(),
  ateId: int("ateId").notNull(),
  userId: int("userId").notNull(),
  lmsType: mysqlEnum("lmsType", ["moodle", "canvas", "blackboard"]).notNull(),
  lmsUrl: text("lmsUrl").notNull(),
  courseId: varchar("courseId", { length: 255 }).notNull(),
  status: mysqlEnum("status", ["pending", "success", "failed"]).default("pending").notNull(),
  exportedAt: timestamp("exportedAt").defaultNow().notNull(),
});

export type LMSExport = typeof lmsExports.$inferSelect;
export type InsertLMSExport = typeof lmsExports.$inferInsert;