module.exports = (api) => {
  const Product = api.models.Product;
  const User = api.models.User;
  const Category = api.models.Category;

  function create(req, res, next) {
    const userId = req.seller;
    const categoryId = req.category;

    let products = new Product(req.body);
    products.seller = userId;

    Product.findOne({
      name: products.name,
    }, (err, found) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (found) {
        return res.status(401).send('product.already.exists');
      }
    });

    products.save((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      Category.findById(categoryId, (err, user) => {
        if (err) {
          return res.status(500).send(err);
        }

        products.category.push(data._id.toString());
        return res.send(data);
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

  function findAllByCategory(req, res, next) {
    Product.findAll({
      category: req.category,
    }, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data || data.length == 0) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findAllBySeller(req, res, next) {
    Product.findAll({
      seller: req.seller,
    }, (err, data) => {
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
              assigned: req.body.category
          },
          (err, products) => {
            console.log(req.params.id);
            console.log(req.body.category);
              if (err) {
                  return res.status(500).send(err);
              }
              res.send(products);
          });
  };

    // function saveProduct() {
    //   products.save((err, data) => {
    //     if (err) {
    //       return res.status(500).send(err);
    //     }
    //
    //     return res.send(data);
    //   });
    // };

  function addCategory(req, res, next) {
      let category = new Category(req.body);

      Category.findById(req.params.id, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (!data) {
          return res.status(204).send(data);
        }
        return updateCategory();
      });

      function updateCategory() {
        Product.findByIdAndUpdate(req.params.id, req.body, {new : true}, (err, data) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (!data) {
            return res.status(204).send(data);
          }
          return res.send(data);
        });
      }
    }

  return {
    create,
    findOne,
    findAll,
    update,
    remove,
    assign,
    addCategory
  };
}
