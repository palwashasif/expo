const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ignore Node.js core modules for web
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: false,
    stream: false,
    assert: false,
    http: false,
    https: false,
    os: false,
    url: false,
  };

  return config;
}; 