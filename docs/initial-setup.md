# Initial Setup

## Create a React Native App
Create a React Native app from scratch is simple. 

For stability reasons, we want to use React Native versioned at "0.67.2".

This guide uses TypeScript, so we can simply fetch the TypeScript template versioned at "6.9.4" to ensure that our React Native is versioned at "0.67.2". 

```
npx react-native init YourAppName --template react-native-template-typescript@6.9.4
```

## Project Structure
We recommend you move `App.tsx` to a `src` folder for better project management.

## Recommended Styling Configs (optional)

This is an optional step as it is opinionated. To maximize your development experience, we recommend configuring the following: 

### eslint
A couple of eslint plugins are needed:

```
yarn add eslint-config-standard-kit eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-simple-import-sort eslint-plugin-standard
```

In your `eslintrc.json`, replace the content with the following:

```json
{
  "extends": [
    "plugin:react-native/all",
    "standard-kit/prettier",
    "standard-kit/prettier/flow",
    "standard-kit/prettier/jsx",
    "standard-kit/prettier/node",
    "standard-kit/prettier/react",
    "standard-kit/prettier/typescript"
  ],
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "plugins": [
    "simple-import-sort"
  ],
  "rules": {
    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "react-native/no-inline-styles": "off",
    "react-native/no-raw-text": "error",
    "simple-import-sort/imports": "error"
  }
}
```

### TypeScript
In your `tsconfig.json`, replace the content with the following:
```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "moduleResolution": "node",
    "noEmit": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2020"
  }
}
```
### EditorConfig
Create an `.editorconfig` file with the following content:

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
```

### Prettier
Create a `.prettierrc.js` file, and paste the following:

```js
{
  "semi": false,
  "singleQuote": true
}
```