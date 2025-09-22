import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    preset: undefined, // Disable preset to use pure ESM
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
        // Add CJS compatibility if needed
        '^(\\.{1,2}/.*)\\.cjs$': '$1',
    },
    // More flexible transform patterns - add packages that need transformation
    transformIgnorePatterns: [
        // Transform ESM packages and problematic CJS packages that need it
        // Add package names to the list as needed: uuid|other-esm-package|problematic-cjs-package
        'node_modules/(?!(uuid)/)'
    ],
    // Allow both ESM and CJS transformations with Babel
    transform: {
        '^.+\\.(ts|tsx)$': ['babel-jest', { 
            presets: [
                ['@babel/preset-env', { modules: false }], // Keep ESM modules
                '@babel/preset-typescript',
                '@babel/preset-react'
            ]
        }]
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
