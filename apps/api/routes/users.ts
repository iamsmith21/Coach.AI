import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';
import { createLogger } from '../logger.js';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { RequestHandler } from 'express';

const log = createLogger('USERS');

export const SignupSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'Invalid email format' })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().trim().optional(),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ message: 'Invalid email format' })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type SignupSchema = z.infer<typeof SignupSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;

//Signup Handler

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const validation = SignupSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ errors: validation.error.flatten().fieldErrors });
      return;
    }

    const { email, password, name } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail));

    if (existingUsers.length > 0) {
      res.status(409).json({ error: 'User with this email already exists' });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const [insertedUser] = await db
      .insert(usersTable)
      .values({
        email: normalizedEmail,
        passwordHash,
        name: name || null,
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        createdAt: usersTable.createdAt,
      });

    if (!insertedUser) {
      throw new Error('Failed to insert user');
    }

    log(`Successfully signed up user ${normalizedEmail}`);

    res.status(201).json(insertedUser);
  } catch (error) {
    next(error);
    //passed the err to express global err handler.
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const validation = LoginSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        errors: validation.error.flatten().fieldErrors,
      });
      return;
    }

    const { email, password } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    const users = await db.select().from(usersTable).where(eq(usersTable.email, normalizedEmail));

    const user = users[0];

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    log(`Successfully logged in user: ${normalizedEmail}`);

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
