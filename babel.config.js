module.exports = {
  "presets": [
    "@babel/env",
    "@babel/react",
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ],
  "env":{
    "test": {
      "presets": [
        '@babel/env',
        '@babel/react',
      ],
      "plugins": [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-dynamic-import-node',
      ],
    },
  },
};
