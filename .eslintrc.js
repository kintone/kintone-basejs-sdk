module.exports = {
  "extends": "@cybozu",
  "env": {
    "node": true
  },
  "rules": {
    "valid-jsdoc": [
      "error",
      {
        "requireParamDescription": false,
        "requireReturnDescription": false
      }
    ]
  }
};
