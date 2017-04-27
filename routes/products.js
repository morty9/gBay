const router = require('express').Router();

module.exports = (api) => {
  router.get('/',
    api.actions.products.findAll);

  router.get('/:id',
      api.actions.products.findOne);

  router.post('/',
      api.middlewares.bodyParser.json(),
      //api.middlewares.ensureAuthenticated,
      api.actions.products.create);

  router.put('/:id',
      api.middlewares.bodyParser.json(),
      api.actions.products.update);

  router.delete('/:id',
      api.actions.products.remove);

  router.put('/:id/category',
      api.middlewares.bodyParser.json(),
      api.actions.products.addCategory
  )
  /*router.post('/:id/seller',
      api.middlewares.bodyParser.json(),
      //api.middlewares.ensureAuthenticated,
      api.actions.products.assign);*/

  return router;
}
