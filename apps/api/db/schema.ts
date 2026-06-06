import { pgTable, serial, varchar, timestamp, integer, text, jsonb } from 'drizzle-orm/pg-core';

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

export const sessionsTable = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  problemId: integer('problem_id')
    .references(() => problemsTable.id, { onDelete: 'cascade' })
    .notNull(),
  status: varchar('status', { length: 50 }).default('started').notNull(),
  code: text('code'),
  transcript: jsonb('transcript'),
  feedback: text('feedback'),
  createdAt: timestamp('created_at').defaultNow(),
});

//We pass a function returning the table column () => usersTable.id to Drizzle's references helper to avoid circular dependency errors in large schemas
