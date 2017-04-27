module.exports = (api) => {
  api.actions = {
    auth: require('./auth')(api),
    users: require('./users/crud')(api),
    products: require('./products/crud')(api),
    categories: require('./categories/crud')(api),
<<<<<<< HEAD
    opinion: require('./opinion/crud')(api)
=======
    orders: require('./orders/crud')(api)
>>>>>>> e0ec67f7d816a32fec3c8a876bc92a4ec45fdef1
  };
};
