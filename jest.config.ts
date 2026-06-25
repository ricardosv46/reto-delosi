import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/modules/**/*.{ts,tsx}',
    '!src/modules/**/*.test.{ts,tsx}',
    '!src/modules/**/*.model.ts',
    '!src/modules/**/*.interface.ts',
  ],
};

export default createJestConfig(config);
