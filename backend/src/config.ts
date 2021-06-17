import dotenv from 'dotenv';

dotenv.config();

export const env: string = process.env.NODE_ENV;
export const port: number = JSON.parse(process.env.PORT);
export const dbUri: string = process.env.DB_URI;
export const dbDebug: boolean = JSON.parse(process.env.DB_DEBUG);
export const testDbUri: string = process.env.TEST_DB_URI;
export const testDbDebug: boolean = JSON.parse(process.env.TEST_DB_DEBUG);
