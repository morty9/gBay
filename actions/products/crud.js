module.exports = (api) => {
  const Product = api.models.Product;
  const User = api.models.User;
  //const Category = api.models.Category;

  function create(req, res, next) {
    let products = new Product(req.body);
    //const userId = req.userId;
    //const cat = req.category;

    Product.findOne({
      name: products.name,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (found) {
        return res.status(401).send('name.already.exists');
      }

      Product.count((err, count) => {
        if (err) {
          return res.status(500).send(err);
        }
        return saveProduct();
      });
    });


    function saveProduct() {
      products.save((err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        return res.send(data);
      });
    }
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

  return {
    create,
    findOne,
    findAll,
    update,
    remove
  };
}
