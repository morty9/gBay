module.exports = (api) => {
  //api.use(api.middlewares.logger);
  api.use('/auth', require('./auth')(api));
  api.use('/users', require('./users')(api));
  api.use('/products', require('./products')(api));
  api.use('/categories', require('./categories')(api));
<<<<<<< HEAD
  api.use('/opinion', require('./opinion')(api));
=======
  api.use('/orders', require('./orders')(api));
>>>>>>> e0ec67f7d816a32fec3c8a876bc92a4ec45fdef1
};
