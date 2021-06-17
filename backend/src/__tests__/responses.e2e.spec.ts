import supertest from 'supertest';

import knex from '../db/knex';
import app from '../../server';

const request = supertest(app);

describe('E2E Tests (DnaRecord Module)', () => {
  beforeAll(() => knex.migrate.latest());

  afterAll(() => knex.migrate
    .rollback()
    .then(() => knex.destroy()));

  test('should return invalid if provided data is incorrect', async () => {
    const want = 'BLABLA';
    const res = await request.post('/dna/create').send({
      sequence: want,
    });
    expect(res.status).toBe(400);
  });

  test('should return invalid if provided data is partially incorrect', async () => {
    const want = 'ACTGHHLL';
    const res = await request.post('/dna/create').send({
      sequence: want,
    });
    expect(res.status).toBe(400);
  });

  test('should return created dna record if provided sequence is valid # 1', async () => {
    const want = 'ACTGACTG';
    const res = await request.post('/dna/create').send({
      sequence: want,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('sequence', want);
  });

  test('should return created dna record if provided sequence is valid # 2', async () => {
    const want = 'CCCTGGGAAACCCCCTTTGGAAA';
    const res = await request.post('/dna/create').send({
      sequence: want,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('sequence', want);
  });

  test('should return dna records without filter', async () => {
    const res = await request.get('/dna/search');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('sequence');
  });

  test('should return error if search condition is invalid', async () => {
    const want = 'ACTGACTGHHK';
    const res = await request.get('/dna/search').query({
      sequence: want,
    });
    expect(res.status).toBe(400);
  });

  test('should return error if levenshtein distance is not a number', async () => {
    const want = 'ACTGACTG';
    const res = await request.get('/dna/search').query({
      sequence: want,
      fuzzyness: 'DD',
    });
    expect(res.status).toBe(400);
  });

  test('should return error if levenshtein distance is filtered without dna sequence', async () => {
    const res = await request.get('/dna/search').query({
      fuzzyness: 36,
    });
    expect(res.status).toBe(400);
  });

  test('should return dna records if match search condition', async () => {
    const want = 'ACTGACTG';
    const res = await request.get('/dna/search').query({
      sequence: want,
    });
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('sequence', want);
  });

  test('should return dna records if match search condition with distance', async () => {
    const want = 'ACTG';
    const res = await request.get('/dna/search').query({
      sequence: want,
      fuzzyness: 36,
    });
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });
});
