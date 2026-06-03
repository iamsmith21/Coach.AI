import { db } from '../db/index.js';
import { problemsTable } from '../db/schema.js';
import { createLogger } from '../logger.js';
import type { RequestHandler } from 'express';

const log = createLogger('PROBLEMS');

// 1. Get All Problems Handler
export const getProblems: RequestHandler = async (_req, res, next) => {
  try {
    const allProblems = await db.select().from(problemsTable);
    res.status(200).json(allProblems);
  } catch (error) {
    next(error);
  }
};

// 2. Create Problem Handler
export const createProblem: RequestHandler = async (req, res, next) => {
  try {
    const { title, difficulty, pattern } = req.body as {
      title?: string;
      difficulty?: string;
      pattern?: string;
    };

    if (!title || !difficulty || !pattern) {
      res.status(400).json({ error: 'Missing required fields: title, difficulty, pattern' });
      return;
    }

    const [insertedProblem] = await db
      .insert(problemsTable)
      .values({
        title,
        difficulty,
        pattern,
      })
      .returning();

    log(`Added new problem: ${title}`);

    res.status(201).json(insertedProblem);
  } catch (error) {
    next(error);
  }
};
