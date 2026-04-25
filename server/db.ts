import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { InsertUser, users, ates, InsertATE, ATE } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;
let _client: postgres.Sql | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL);
      _db = drizzle(_client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
      _client = null;
    }
  }
  return _db;
}

// Close database connection
export async function closeDb() {
  if (_client) {
    await _client.end();
    _client = null;
    _db = null;
  }
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ATE queries
export async function saveATE(userId: number, accessCode: string, data: Record<string, unknown>): Promise<ATE> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.insert(ates).values({
      userId,
      accessCode,
      data: JSON.stringify(data),
    }).onConflictDoUpdate({
      target: ates.accessCode,
      set: {
        data: JSON.stringify(data),
        updatedAt: new Date(),
      },
    });

    // Get the inserted/updated record
    const ate = await db.select().from(ates).where(eq(ates.accessCode, accessCode)).limit(1);
    return ate[0];
  } catch (error) {
    console.error("[Database] Failed to save ATE:", error);
    throw error;
  }
}

export async function getATEByAccessCode(accessCode: string): Promise<ATE | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get ATE: database not available");
    return undefined;
  }

  try {
    const result = await db.select().from(ates).where(eq(ates.accessCode, accessCode)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get ATE:", error);
    throw error;
  }
}

export async function getUserATEs(userId: number): Promise<ATE[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user ATEs: database not available");
    return [];
  }

  try {
    const result = await db.select().from(ates).where(eq(ates.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user ATEs:", error);
    throw error;
  }
}

// Import new types
import { ratings, notifications, lmsExports } from "../drizzle/schema";

// Rating queries
export async function addRating(userId: number, ateId: number, score: number, comment?: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.insert(ratings).values({
      userId,
      ateId,
      score,
      comment,
    }).onConflictDoUpdate({
      target: [ratings.userId, ratings.ateId],
      set: {
        score,
        comment,
        updatedAt: new Date(),
      },
    });

    const rating = await db.select().from(ratings).where(eq(ratings.ateId, ateId)).limit(1);
    return rating[0];
  } catch (error) {
    console.error("[Database] Failed to add rating:", error);
    throw error;
  }
}

export async function getATERatings(ateId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    return await db.select().from(ratings).where(eq(ratings.ateId, ateId));
  } catch (error) {
    console.error("[Database] Failed to get ATE ratings:", error);
    return [];
  }
}

// Notification queries
export async function createNotification(userId: number, type: string, ateId: number, message: string, fromUserId?: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.insert(notifications).values({
      userId,
      type: type as any,
      ateId,
      fromUserId,
      message,
    });

    const notification = await db.select().from(notifications).orderBy(notifications.createdAt).limit(1);
    return notification[0];
  } catch (error) {
    console.error("[Database] Failed to create notification:", error);
    throw error;
  }
}

export async function getUserNotifications(userId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    return await db.select().from(notifications).where(eq(notifications.userId, userId));
  } catch (error) {
    console.error("[Database] Failed to get notifications:", error);
    return [];
  }
}

// LMS Export queries
export async function createLMSExport(userId: number, ateId: number, lmsType: string, lmsUrl: string, courseId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.insert(lmsExports).values({
      userId,
      ateId,
      lmsType: lmsType as any,
      lmsUrl,
      courseId,
    });

    const lmsExport = await db.select().from(lmsExports).orderBy(lmsExports.exportedAt).limit(1);
    return lmsExport[0];
  } catch (error) {
    console.error("[Database] Failed to create LMS export:", error);
    throw error;
  }
}