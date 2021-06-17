import { } from 'knex';
import { PartialModelObject } from 'objection';

import DnaRecord from './model';
import { DnaPayload } from './types';

export const create = async (data: DnaPayload) => DnaRecord
  .query()
  .insert(data as PartialModelObject<DnaRecord>);

export const getAll = async (sequence?: string, distance?: number) => {
  if (sequence && distance) {
    return DnaRecord
      .query()
      .whereRaw('levenshtein ("sequence", ?) <= ?', [sequence, distance]);
  }

  if (sequence) {
    return DnaRecord
      .query()
      .where('sequence', 'like', sequence);
  }

  return DnaRecord.query().limit(20);
};
