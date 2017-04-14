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
      })


    })
  }

}
