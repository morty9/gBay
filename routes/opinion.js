const router = require('express').Router();

module.exports = (api) => {
  router.get('/',
    api.actions.opinion.findAll);

//  router.get('/:id',
//      api.actions.opinion.findOne);

  router.post('/',
      api.middlewares.bodyParser.json(),
      api.actions.opinion.create);

  router.put('/:id',
      api.middlewares.bodyParser.json(),
      api.actions.opinion.update);

  router.delete('/:id',
      api.actions.opinion.remove);

  return router;
}
