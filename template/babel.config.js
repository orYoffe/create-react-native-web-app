module.exports = function(api) {

  api.cache(true);
  return {
  "plugins": [
      ["module-resolver", {
        "alias": {
          "^react-native$": "react-native-web"
        }
      }]
    ],
    presets: [["react-app"], ['babel-preset-expo']],
  };
};
