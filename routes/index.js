module.exports = (api) => {
  api.use(api.middlewares.logger);
  api.use('/auth', require('./auth')(api));
  api.use('./users', require('./auth')(api));
  api.use('./products', require('./products')(api));
};
