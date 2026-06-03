import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const problemsTable = pgTable('problems', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    difficulty: varchar('difficulty', { length: 50 }).notNull(),
    pattern: varchar('pattern', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// code name      database column name
export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
});
