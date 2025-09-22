# CJS/ESM Compatibility Guide

This document explains the improved Jest configuration for better CJS/ESM compatibility.

## Changes Made

### 1. Enhanced Module Name Mapping
```typescript
moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Add CJS compatibility if needed
    '^(\\.{1,2}/.*)\\.cjs$': '$1',
},
```

### 2. Flexible Transform Patterns
```typescript
transformIgnorePatterns: [
    // Transform ESM packages and problematic CJS packages that need it
    // Add package names to the list as needed: uuid|other-esm-package|problematic-cjs-package
    'node_modules/(?!(uuid)/)'
],
```

### 3. Babel Transform Configuration
```typescript
transform: {
    '^.+\\.(ts|tsx)$': ['babel-jest', { 
        presets: [
            ['@babel/preset-env', { modules: false }], // Keep ESM modules
            '@babel/preset-typescript',
            '@babel/preset-react'
        ]
    }]
},
```

## Adding New Dependencies

### For ESM-only packages:
Add the package name to the `transformIgnorePatterns` exception list:
```typescript
'node_modules/(?!(uuid|new-esm-package)/)'
```

### For problematic CJS packages:
Add them to the same list if they need transformation:
```typescript
'node_modules/(?!(uuid|problematic-cjs-package)/)'
```

### For packages with .cjs files:
The moduleNameMapper already handles `.cjs` imports.

## Fallback Strategies

If you encounter issues with a CJS library:

1. **Dynamic imports**: 
   ```typescript
   const cjsLibrary = await import('some-cjs-lib');
   ```

2. **Add to transform patterns**:
   ```typescript
   'node_modules/(?!(uuid|your-problematic-package)/)'
   ```

3. **Use require() in Node.js contexts** (if absolutely necessary):
   ```typescript
   const { something } = require('cjs-only-package');
   ```

## Testing

Run tests to verify compatibility:
```bash
npm test
```

The configuration maintains ESM-first approach while providing flexibility for CJS dependencies.
