import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import { Model } from 'objection';

import { port } from './src/config';
import logger from './src/logger';
import dnaRouter from './src/controller';

import knexConfig from './src/db/knex';

// Give the knex instance to objection.
Model.knex(knexConfig);

const app = express();
const appPort = port || 4000;

// Used to parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info('ACCESS LOG:', req.url);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Ok');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ isAlive: true });
});

app.use('/dna', dnaRouter);

app.use(errors());

if (process.env.NODE_ENV !== 'test') {
  app.listen(appPort, () => {
    logger.info('Server', `Backend server started at http://localhost:${appPort}`);
  });
}

export default app;
