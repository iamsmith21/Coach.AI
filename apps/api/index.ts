import express, { type Request, type Response, type NextFunction } from 'express';
import { getProblems, createProblem } from './routes/problems.js';
import { signup, login } from './routes/users.js';
import { createLogger } from './logger.js';

const log = createLogger('API');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  log(`${req.method} requested for ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

// 3. Application Routes
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.get('/problems', getProblems);
app.post('/problems', createProblem);
app.post('/signup', signup);
app.post('/login', login);

// 4. Global Error Handler Middleware (Must have all 4 arguments in this exact signature)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  log(`Server Error: ${message}`, 'ERROR');

  res.status(statusCode).json({
    error: message,
  });
});

// 5. Start the Server
app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});
