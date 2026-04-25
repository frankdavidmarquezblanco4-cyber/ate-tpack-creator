import { int, pgEnum, pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */

// PostgreSQL Enums
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const notificationTypeEnum = pgEnum("notification_type", ["download", "share", "rating", "comment"]);
export const lmsTypeEnum = pgEnum("lms_type", ["moodle", "canvas", "blackboard"]);
export const lmsStatusEnum = pgEnum("lms_status", ["pending", "success", "failed"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ATE (Actividad Tecnológica Escolar) table
export const ates = pgTable("ates", {
  id: serial("id").primaryKey(),
  userId: serial("userId").notNull(),
  accessCode: varchar("accessCode", { length: 50 }).notNull().unique(),
  data: text("data").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ATE = typeof ates.$inferSelect;
export type InsertATE = typeof ates.$inferInsert;

// Ratings table for ATE gallery
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  ateId: serial("ateId").notNull(),
  userId: serial("userId").notNull(),
  score: int("score").notNull(), // 1-5 stars
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Rating = typeof ratings.$inferSelect;
export type InsertRating = typeof ratings.$inferInsert;

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: serial("userId").notNull(),
  type: notificationTypeEnum("type").notNull(),
  ateId: serial("ateId").notNull(),
  fromUserId: serial("fromUserId"),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

// LMS Export table for tracking exports to Moodle/Canvas
export const lmsExports = pgTable("lmsExports", {
  id: serial("id").primaryKey(),
  ateId: serial("ateId").notNull(),
  userId: serial("userId").notNull(),
  lmsType: lmsTypeEnum("lmsType").notNull(),
  lmsUrl: text("lmsUrl").notNull(),
  courseId: varchar("courseId", { length: 255 }).notNull(),
  status: lmsStatusEnum("status").default("pending").notNull(),
  exportedAt: timestamp("exportedAt").defaultNow().notNull(),
});

export type LMSExport = typeof lmsExports.$inferSelect;
export type InsertLMSExport = typeof lmsExports.$inferInsert;