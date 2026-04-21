import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, ates, InsertATE, ATE } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
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

    await db.insert(users).values(values).onDuplicateKeyUpdate({
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
    const result = await db.insert(ates).values({
      userId,
      accessCode,
      data: JSON.stringify(data),
    }).onDuplicateKeyUpdate({
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
