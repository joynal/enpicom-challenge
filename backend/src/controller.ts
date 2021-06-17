import express, { Router, Request, Response } from 'express';

import logger from './logger';
import * as query from './query';
import * as validation from './validation';

const routes: Router = express.Router();

routes.post('/create', validation.create,
  async (req: Request, res: Response) => {
    try {
      const result = await query.create(req.body);
      return res.json(result);
    } catch (err) {
      logger.error('create:', err);
      return res.sendStatus(500);
    }
  });

routes.get('/search', validation.search,
  async (req: Request, res: Response) => {
    try {
      const data = req.query;

      // if we got fuzzyness then look for levenshtein distance
      if (data.sequence && data.fuzzyness) {
        const result = await query.getAll(
          data.sequence as string,
          parseInt(data.fuzzyness as string, 10),
        );
        return res.json(result);
      }

      // look for exact match
      if (data.sequence) {
        const result = await query.getAll(data.sequence as string);
        return res.json(result);
      }

      // if nothing passed return some default data
      const result = await query.getAll();
      return res.json(result);
    } catch (err) {
      logger.error('search:', err);
      return res.sendStatus(500);
    }
  });

export default routes;
