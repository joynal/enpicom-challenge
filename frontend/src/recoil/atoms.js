import { atom } from 'recoil';

export const dnaRecord = atom({
  key: 'dnaRecord',
  default: [],
});

export const isCreateVisible = atom({
  key: 'isCreateVisible',
  default: false,
});
