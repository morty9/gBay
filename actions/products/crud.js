module.exports = (api) => {
  const Product = api.models.Product;
  const User = api.models.User;
  const Category = api.models.Category;

  function create(req, res, next) {
    const userId = req.userId;
    const cat = req.category;

    let products = new Product(req.body);
    products.creator = userId;
    products.category = cat;

    products.save((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      User.findById(userId, (err, user) => {
        if (err) {
          return res.status(500).send(err);
        }

        user.products.push(data._id.toString())
        user.save((err) => {
          if (err) {
            return res.status(500).send(err);
          }

          return res.send(data);
        });
      });
    });
  }

  function findOne(req, res, next) {
    Product.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    Product.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function update(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function remove(req, res, next) {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function assign(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {
      assigned: req.body.userId
    },(err, product) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(todo);
    });
  }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    assign
  };
}
