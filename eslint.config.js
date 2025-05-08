{
    "parser": "@typescript-eslint/parser",
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "@react-native-community"
    ],
    "plugins": ["@typescript-eslint"],
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      // Define any specific rules you might want to adjust
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
  