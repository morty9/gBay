module.exports = (api) => {
  api.middlewares = {
    ensureUserData: require('./ensureUserData')(api),
    ensureProductData: require('./ensureProductData')(api),
    ensureOrderData: require('./ensureOrderData')(api)
    bodyParser: require('body-parser'),
    logger: require('./logger')
  };
};
