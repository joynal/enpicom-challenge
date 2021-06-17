export type DnaPayload = {
  sequence: string
};

export type DnaSearch = DnaPayload & {
  fuzzyness: number
};
