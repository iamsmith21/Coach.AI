// post sessions
//get sessions
import { db } from '../db/index.js';
import { sessionsTable, problemsTable } from '../db/schema.js';
import { createLogger } from '../logger.js';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from 'express';
import { z } from 'zod';

const log = createLogger('SESSIONS');

export const CreateSessionSchema = z.object({
  problemId: z.number({ message: 'problemId is required' }),
});

export const createSession: RequestHandler = async (req, res, next) => {
  try {
    const validation = CreateSessionSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ errors: validation.error.flatten().fieldErrors });
      return;
    }

    const { problemId } = validation.data;

    const userId = req.user!.id;

    const problems = await db.select().from(problemsTable).where(eq(problemsTable.id, problemId));
    if (problems.length === 0) {
      res.status(404).json({ error: 'Problem not found' });
      return;
    }

    const [newSession] = await db
      .insert(sessionsTable)
      .values({ userId, problemId, status: 'Started' })
      .returning();

    if (!newSession) {
      throw new Error('Failed to create a new session');
    }

    log(`User ${userId} started session ${newSession.id} for problem ${problemId}`);
    res.status(201).json(newSession);
  } catch (error) {
    next(error);
  }
};

export const getSession: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user!.id;

    const userSessions = await db
      .select({
        id: sessionsTable.id,
        status: sessionsTable.status,
        createdAt: sessionsTable.createdAt,
        problem: {
          id: problemsTable.id,
          title: problemsTable.title,
          difficulty: problemsTable.difficulty,
        },
      })
      .from(sessionsTable)
      .innerJoin(problemsTable, eq(sessionsTable.problemId, problemsTable.id))
      .where(eq(sessionsTable.userId, userId));

    res.status(200).json(userSessions);
  } catch (error) {
    next(error);
  }
};
