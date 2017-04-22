

module.exports = (api) => {
  api.middlewares = {
    ensureUserData: require('./ensureUserData')(api),
    ensureProductData: require('./ensureProductData')(api),
    ensureOrderData: require('./ensureOrderData')(api),
    ensureCategoryData: require('./ensureCategoryData')(api),
    ensureOpinionData: require('./ensureOpinionData')(api),
    bodyParser: require('body-parser'),
    logger: require('./logger')
  }
};
